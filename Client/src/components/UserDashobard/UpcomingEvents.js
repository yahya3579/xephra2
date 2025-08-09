import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, joinEvent, saveTeamData, getEventsByUserId, clearError } from "../../redux/features/eventsSlice";
import { getSubscriptionStatus } from "../../redux/features/paymentSlice";
import Loading from "../../utils/Loading/Loading";
import toast from 'react-hot-toast';

const TournamentCard = ({
  _id,
  title,
  game,
  gameMode,
  date,
  time,
  description,
  image,
  prizePool,
  dark,
  isUserRegistered
}) => {
  const { loading, error, message } = useSelector((state) => state.events);
  const { subscriptionStatus } = useSelector((state) => state.payment);
  const [showPopup, setShowPopup] = useState(false);
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [teamType, setTeamType] = useState('solo');
  const [teamName, setTeamName] = useState('');
  const [leaderInfo, setLeaderInfo] = useState({
    xephraId: '',
    gamerId: '',
    gamerTag: '',
    phoneNumber: ''
  });
  const [teamMembers, setTeamMembers] = useState([
    { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' },
    { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' },
    { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' }
  ]);
  const [validationLoading, setValidationLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  
  // Safely get user data from localStorage
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };
  
  const user = getUserData();
  const userId = user?.UserId;
  const userXephraId = userId; // Since userId is the XephraId in our system
  
  // Check subscription status when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(getSubscriptionStatus(userId));
    }
  }, [dispatch, userId]);

  const handleJoin = async (_id) => {
    const eventId = _id;
    if (!userId) {
      toast.error("User is not logged in");
      return;
    }

    // Check if user is already registered for this event
    if (isUserRegistered) {
      toast.error("You have already joined this event!");
      return;
    }

    // First check if user has active subscription before showing team popup
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/payments/validate-team-subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          xephraIds: [userXephraId]
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        toast.error('Failed to validate subscription status. Please try again.');
        return;
      }
      
      // Check if user has inactive subscription
      if (result.inactiveMembers && result.inactiveMembers.length > 0) {
        const isUserInactive = result.inactiveMembers.includes(userXephraId);
        if (isUserInactive) {
          toast.error(`Your subscription is not active (Xephra ID: ${userXephraId}). Please activate your subscription to join events.`);
          return;
        }
      }
    } catch (error) {
      console.error('Subscription validation error:', error);
      toast.error('Failed to validate subscription. Please try again.');
      return;
    }

    // Set default team type based on game mode when opening popup
    const defaultTeamType = gameMode?.toLowerCase() || 'solo';
    setTeamType(defaultTeamType);

    // Show team selection popup after subscription validation passes
    setShowTeamPopup(true);
  };

  const handleTeamJoin = async () => {
    const eventId = _id;
    setValidationError('');
    
    // Prepare team data based on team type
    let teamData = {
      teamType: teamType,
      teamName: teamName,
      leaderInfo: {
        ...leaderInfo,
        xephraId: userXephraId // Always include the user's Xephra ID
      },
      teamMembers: []
    };
    
    // Additional validation for team members BEFORE preparing team data
    if (teamType === 'duo' || teamType === 'squad') {
      // Check if team name is provided
      if (!teamName.trim()) {
        setValidationError('Team name is required for duo and squad teams.');
        return;
      }
      
      // For duo - exactly 1 additional member required (total 2 including leader)
      if (teamType === 'duo') {
        const member = teamMembers[0];
        if (!member.xephraId.trim() || !member.gamerId.trim() || !member.gamerTag.trim()) {
          setValidationError('Duo team requires exactly 2 members. All fields (Xephra ID, Gamer ID, Gamer Tag) are mandatory for team member.');
          return;
        }
      }
      
      // For squad - exactly 3 additional members required (total 4 including leader)
      if (teamType === 'squad') {
        const requiredMembers = [teamMembers[0], teamMembers[1], teamMembers[2]];
        const emptyMembers = [];
        const incompleteMembers = [];
        
        requiredMembers.forEach((member, index) => {
          if (!member.xephraId.trim() && !member.gamerId.trim() && !member.gamerTag.trim()) {
            emptyMembers.push(`Member ${index + 2}`);
          } else if (!member.xephraId.trim() || !member.gamerId.trim() || !member.gamerTag.trim()) {
            incompleteMembers.push(`Member ${index + 2}`);
          }
        });
        
        if (emptyMembers.length > 0) {
          setValidationError(`Squad team requires exactly 4 members. Missing members: ${emptyMembers.join(', ')}. All team member details are mandatory.`);
          return;
        }
        
        if (incompleteMembers.length > 0) {
          setValidationError(`Incomplete member details for: ${incompleteMembers.join(', ')}. All fields (Xephra ID, Gamer ID, Gamer Tag) are mandatory for all squad members.`);
          return;
        }
      }
    }
    
    // Now prepare team data - all members are validated above
    if (teamType === 'duo') {
      teamData.teamMembers = [teamMembers[0]]; // Include the validated member
    } else if (teamType === 'squad') {
      teamData.teamMembers = [
        teamMembers[0],
        teamMembers[1],
        teamMembers[2]
      ]; // Include all 3 validated members
    }

    // Validate leader information - all fields including phone number are required
    if (!leaderInfo.gamerId.trim() || !leaderInfo.gamerTag.trim() || !leaderInfo.phoneNumber.trim()) {
      setValidationError('Your Gamer ID, Gamer Tag, and Phone Number are all required.');
      return;
    }

    // Validate all team members' subscriptions using Xephra IDs (including leader)
    setValidationLoading(true);
    
    try {
      // Always include team leader's Xephra ID for subscription validation
      let allXephraIds = [userXephraId]; // Start with team leader
      
      // Add team members' Xephra IDs if they exist
      if (teamData.teamMembers.length > 0) {
        const memberXephraIds = teamData.teamMembers
          .filter(member => member.xephraId.trim() !== '') // Only members with Xephra IDs
          .map(member => member.xephraId.trim());
        
        allXephraIds = [...allXephraIds, ...memberXephraIds];
      }
      
      if (allXephraIds.length > 0) {
        // Check all users' subscription status using Xephra IDs
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/payments/validate-team-subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            xephraIds: allXephraIds
          }),
        });
        
        const result = await response.json();
        
        if (!response.ok || !result.success) {
          setValidationError(result.message || 'Failed to validate subscriptions');
          setValidationLoading(false);
          return;
        }
        
        // Check if any users have inactive subscriptions
        if (result.inactiveMembers && result.inactiveMembers.length > 0) {
          const inactiveMembersList = result.inactiveMembers.join(', ');
          
          // Check if team leader is in inactive list
          const isLeaderInactive = result.inactiveMembers.includes(userXephraId);
          const inactiveTeamMembers = result.inactiveMembers.filter(id => id !== userXephraId);
          
          let errorMessage = "";
          
          // Team type specific error messages
          if (teamType === 'duo') {
            if (isLeaderInactive && inactiveTeamMembers.length > 0) {
              errorMessage = "Both you and your team member don't have active subscriptions. Please activate your subscriptions to join events.";
            } else if (isLeaderInactive) {
              errorMessage = "Your subscription is not active. Please activate your subscription to join events.";
            } else {
              errorMessage = "Your team member doesn't have an active subscription. They need to activate their subscription first.";
            }
          } else if (teamType === 'squad') {
            if (isLeaderInactive) {
              if (inactiveTeamMembers.length > 0) {
                errorMessage = `You and ${inactiveTeamMembers.length} team member${inactiveTeamMembers.length > 1 ? 's' : ''} don't have active subscriptions. `;
                errorMessage += `Inactive members: ${inactiveTeamMembers.join(', ')}. All members need to activate their subscriptions.`;
              } else {
                errorMessage = "Your subscription is not active. Please activate your subscription to join events.";
              }
            } else {
              errorMessage = `${inactiveTeamMembers.length} team member${inactiveTeamMembers.length > 1 ? 's' : ''} ${inactiveTeamMembers.length > 1 ? "don't" : "doesn't"} have active subscriptions. `;
              errorMessage += `Inactive members: ${inactiveTeamMembers.join(', ')}. These members need to activate their subscriptions.`;
            }
          } else { // solo
            errorMessage = "Your subscription is not active. Please activate your subscription to join events.";
          }
          
          setValidationError(errorMessage);
          setValidationLoading(false);
          return;
        }
      }
      
    } catch (error) {
      console.error('Subscription validation error:', error);
      setValidationError('Failed to validate subscriptions. Please try again.');
      setValidationLoading(false);
      return;
    }
    
    setValidationLoading(false);
    
    // If all validations pass, proceed with joining
    
    // First, join the event with just userId and eventId
    const joinResult = await dispatch(joinEvent({ 
      userId, 
      eventId
    }));
    
    // If join was successful, save the team data
    if (joinEvent.fulfilled.match(joinResult)) {
      const teamDataResult = await dispatch(saveTeamData({
        userId,
        eventId,
        teamData: teamData
      }));
      
      if (saveTeamData.fulfilled.match(teamDataResult)) {
        toast.success("Team registration successful!");
        // Refresh registered events to update UI
        dispatch(getEventsByUserId(userId));
      } else {
        // Check if it's a subscription error
        if (teamDataResult.payload?.error === "SUBSCRIPTION_REQUIRED") {
          // Use the detailed message from backend
          const errorMsg = teamDataResult.payload.message || teamDataResult.payload.details || "Some team members don't have active subscriptions.";
          setValidationError(errorMsg);
          toast.error(errorMsg);
        } else {
          const errorMsg = teamDataResult.payload?.message || 'Failed to save team data';
          setValidationError(errorMsg);
          toast.error(errorMsg);
        }
        setValidationLoading(false);
        return;
      }
    } else {
      // Check if it's a subscription error
      if (joinResult.payload?.error === "SUBSCRIPTION_REQUIRED") {
        const errorMsg = joinResult.payload.message || "You must have an active subscription to join events.";
        setValidationError(errorMsg);
        toast.error(errorMsg);
      } else if (joinResult.payload?.error === "ALREADY_REGISTERED") {
        const errorMsg = joinResult.payload.message || "You have already joined this event!";
        setValidationError(errorMsg);
        toast.error(errorMsg);
        // Refresh registered events to update UI
        dispatch(getEventsByUserId(userId));
      } else {
        const errorMsg = joinResult.payload?.message || 'Failed to join event';
        setValidationError(errorMsg);
        toast.error(errorMsg);
      }
      setValidationLoading(false);
      return; // Don't proceed if join failed
    }
    setShowTeamPopup(false);
    // Reset form to default based on game mode
    const defaultTeamType = gameMode?.toLowerCase() || 'solo';
    setTeamType(defaultTeamType);
    setTeamName('');
    setLeaderInfo({
      xephraId: '',
      gamerId: '',
      gamerTag: '',
      phoneNumber: ''
    });
    setTeamMembers([
      { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' },
      { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' },
      { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' }
    ]);
    setValidationError('');
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newMembers = [...teamMembers];
    newMembers[index] = {
      ...newMembers[index],
      [field]: value
    };
    setTeamMembers(newMembers);
  };

  const handleLeaderInfoChange = (field, value) => {
    setLeaderInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeTeamPopup = () => {
    setShowTeamPopup(false);
    // Reset form to default based on game mode
    const defaultTeamType = gameMode?.toLowerCase() || 'solo';
    setTeamType(defaultTeamType);
    setTeamName('');
    setLeaderInfo({
      xephraId: '',
      gamerId: '',
      gamerTag: '',
      phoneNumber: ''
    });
    setTeamMembers([
      { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' },
      { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' },
      { xephraId: '', gamerId: '', gamerTag: '', phoneNumber: '' }
    ]);
    setValidationError('');
  };

  const imageUrl = `${process.env.REACT_APP_BACKEND}/${image}`;
  
  return (
    <>
      <div className="bg-[#000000] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-x border-slate-300 border-[0.2px] ">
        <Link to={`/eventuser/${_id}`} className="relative block w-full">
          <img className="w-full h-60 object-cover" src={imageUrl} alt={title} />
          <h3 className="drop-shadow-2xl absolute bottom-0 left-0 w-[55%] text-2xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] px-4 py-2">
            {title}
          </h3>
        </Link>

        <div className="p-4">
          <Link to={`/eventuser/${_id}`}>
            <p className="text-[#C9B796] text-lg font-bold mt-1">{game}</p>
            <p className="text-[#D4AD66] text-sm font-semibold mb-1">Mode: {gameMode?.charAt(0).toUpperCase() + gameMode?.slice(1)}</p>
            <p className="text-[#C9B796] mt-2  line-clamp-3">{description}</p>
            <p className="text-lg text-[#C9B796] lg:w-[100%]">
              <span className=" bg-[#302A27] px-5">{date}</span> • <span className=" bg-[#302A27] px-5">{time}</span>
            </p>
            <div>
              <span className="text-xl font-bold text-[#D4AD66]">Prize Pool: PKR {prizePool}</span>
            </div>
          </Link> 
          <div className="flex justify-center">
            {isUserRegistered ? (
              <button
                disabled={true}
                className="bottom-0 mt-5 px-24 py-3 rounded-md transition bg-gray-600 text-gray-400 cursor-not-allowed"
              >
                Already Joined
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={() => handleJoin(_id)}
                className={`bottom-0 mt-5 px-24 py-3 rounded-md transition bg-[#69363f] hover:text-black hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-[#C9B796] ${dark ? "" : ""}`}
              >
                {loading ? "Joining..." : "Join Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#000000] border border-[#D19F43] rounded-lg p-6 max-w-md mx-4 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-[#C9B796] hover:text-[#D19F43] text-xl font-bold"
            >
              ×
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#D19F43] mb-4">
                Subscription Required
              </h3>
              <p className="text-[#C9B796] mb-6">
                You need to activate your subscription to join events.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <Link to="/paymentportal">
                  <button
                    onClick={closePopup}
                    className="px-6 py-2 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-black rounded-md hover:opacity-90 transition"
                  >
                    Activate Subscription
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Selection Popup */}
      {showTeamPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#000000] border border-[#D19F43] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeTeamPopup}
              className="absolute top-2 right-2 text-[#C9B796] hover:text-[#D19F43] text-xl font-bold z-10"
            >
              ×
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#D19F43] mb-2">
                Select Team Type
              </h3>
              <p className="text-[#C9B796] mb-4 text-lg">
                Game: <span className="font-semibold text-[#D19F43]">{game}</span>
              </p>
              
              {/* Radio Buttons */}
              <div className="mb-4 flex justify-center gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="solo"
                    name="teamType"
                    value="solo"
                    checked={teamType === 'solo'}
                    onChange={(e) => setTeamType(e.target.value)}
                    disabled={gameMode?.toLowerCase() !== 'solo'}
                    className={`mr-2 ${gameMode?.toLowerCase() !== 'solo' ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <label htmlFor="solo" className={`${gameMode?.toLowerCase() !== 'solo' ? 'text-[#666] cursor-not-allowed' : 'text-[#C9B796]'}`}>Solo</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duo"
                    name="teamType"
                    value="duo"
                    checked={teamType === 'duo'}
                    onChange={(e) => setTeamType(e.target.value)}
                    disabled={gameMode?.toLowerCase() !== 'duo'}
                    className={`mr-2 ${gameMode?.toLowerCase() !== 'duo' ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <label htmlFor="duo" className={`${gameMode?.toLowerCase() !== 'duo' ? 'text-[#666] cursor-not-allowed' : 'text-[#C9B796]'}`}>Duo</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="squad"
                    name="teamType"
                    value="squad"
                    checked={teamType === 'squad'}
                    onChange={(e) => setTeamType(e.target.value)}
                    disabled={gameMode?.toLowerCase() !== 'squad'}
                    className={`mr-2 ${gameMode?.toLowerCase() !== 'squad' ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <label htmlFor="squad" className={`${gameMode?.toLowerCase() !== 'squad' ? 'text-[#666] cursor-not-allowed' : 'text-[#C9B796]'}`}>Squad</label>
                </div>
              </div>

              {/* Team Name Input - Show for Duo and Squad */}
              {(teamType === 'duo' || teamType === 'squad') && (
                <div className="mb-4">
                  <h4 className="text-[#C9B796] font-semibold mb-2 text-left">Team Name:</h4>
                  <input
                    type="text"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#302A27] border border-[#C9B796] rounded-md text-[#C9B796] focus:outline-none focus:border-[#D19F43]"
                  />
                </div>
              )}

              {/* Team Member Inputs */}
              {teamType === 'solo' && (
                <div className="mb-4">
                  <h4 className="text-[#C9B796] font-semibold mb-3 text-left">Your Information:</h4>
                  
                  {/* Solo Player Info */}
                  <div className="p-4 bg-[#302A27] border border-[#C9B796] rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={`Your Xephra ID: ${userXephraId}`}
                        value={userXephraId}
                        disabled={true}
                        className="px-3 py-2 bg-[#1a1a1a] border border-[#666] rounded-md text-[#888] cursor-not-allowed text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Gamer ID"
                        value={leaderInfo.gamerId}
                        onChange={(e) => handleLeaderInfoChange('gamerId', e.target.value)}
                        className="px-3 py-2 bg-[#1a1a1a] border border-[#666] rounded-md text-[#C9B796] focus:outline-none focus:border-[#D19F43]"
                      />
                      <input
                        type="text"
                        placeholder="Gamer Tag"
                        value={leaderInfo.gamerTag}
                        onChange={(e) => handleLeaderInfoChange('gamerTag', e.target.value)}
                        className="px-3 py-2 bg-[#1a1a1a] border border-[#666] rounded-md text-[#C9B796] focus:outline-none focus:border-[#D19F43]"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={leaderInfo.phoneNumber}
                        onChange={(e) => handleLeaderInfoChange('phoneNumber', e.target.value)}
                        className="px-3 py-2 bg-[#1a1a1a] border border-[#666] rounded-md text-[#C9B796] focus:outline-none focus:border-[#D19F43]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {teamType === 'duo' && (
                <div className="mb-4">
                  <h4 className="text-[#C9B796] font-semibold mb-3 text-left">Team Member Details:</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Team Leader Info - Current User */}
                    <div className="p-3 bg-[#302A27] border border-[#C9B796] rounded-md">
                      <p className="text-[#C9B796] text-sm mb-2 font-semibold">Team Leader (You)</p>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder={`Xephra ID: ${userXephraId}`}
                          value={userXephraId}
                          disabled={true}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#888] cursor-not-allowed text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Gamer ID"
                          value={leaderInfo.gamerId}
                          onChange={(e) => handleLeaderInfoChange('gamerId', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Gamer Tag"
                          value={leaderInfo.gamerTag}
                          onChange={(e) => handleLeaderInfoChange('gamerTag', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={leaderInfo.phoneNumber}
                          onChange={(e) => handleLeaderInfoChange('phoneNumber', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                      </div>
                    </div>

                    {/* Team Member 2 */}
                    <div className="p-3 bg-[#302A27] border border-[#C9B796] rounded-md">
                      <p className="text-[#C9B796] text-sm mb-2 font-semibold">Team Member 2</p>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Xephra ID"
                          value={teamMembers[0]?.xephraId || ''}
                          onChange={(e) => handleTeamMemberChange(0, 'xephraId', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Gamer ID"
                          value={teamMembers[0]?.gamerId || ''}
                          onChange={(e) => handleTeamMemberChange(0, 'gamerId', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Gamer Tag"
                          value={teamMembers[0]?.gamerTag || ''}
                          onChange={(e) => handleTeamMemberChange(0, 'gamerTag', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teamType === 'squad' && (
                <div className="mb-4">
                  <h4 className="text-[#C9B796] font-semibold mb-3 text-left">Squad Member Details:</h4>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Squad Leader Info - Current User */}
                    <div className="p-3 bg-[#302A27] border border-[#C9B796] rounded-md">
                      <p className="text-[#C9B796] text-sm mb-2 font-semibold">Squad Leader (You)</p>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder={`Xephra ID: ${userXephraId}`}
                          value={userXephraId}
                          disabled={true}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#888] cursor-not-allowed text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Gamer ID"
                          value={leaderInfo.gamerId}
                          onChange={(e) => handleLeaderInfoChange('gamerId', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Gamer Tag"
                          value={leaderInfo.gamerTag}
                          onChange={(e) => handleLeaderInfoChange('gamerTag', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={leaderInfo.phoneNumber}
                          onChange={(e) => handleLeaderInfoChange('phoneNumber', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                        />
                      </div>
                    </div>

                    {/* Squad Members 2, 3, 4 */}
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="p-3 bg-[#302A27] border border-[#C9B796] rounded-md">
                        <p className="text-[#C9B796] text-sm mb-2 font-semibold">Squad Member {index + 2}</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Xephra ID"
                            value={teamMembers[index]?.xephraId || ''}
                            onChange={(e) => handleTeamMemberChange(index, 'xephraId', e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Gamer ID"
                            value={teamMembers[index]?.gamerId || ''}
                            onChange={(e) => handleTeamMemberChange(index, 'gamerId', e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Gamer Tag"
                            value={teamMembers[index]?.gamerTag || ''}
                            onChange={(e) => handleTeamMemberChange(index, 'gamerTag', e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#666] rounded text-[#C9B796] focus:outline-none focus:border-[#D19F43] text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation Error Message */}
              {validationError && (
                <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-md">
                  <p className="text-red-300 text-sm">{validationError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeTeamPopup}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTeamJoin}
                  disabled={validationLoading || loading}
                  className="px-6 py-2 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-black rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {validationLoading ? "Validating Subscriptions..." : loading ? "Joining..." : "Join Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UpcomingEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { loading, error, events, message, event, participants, registeredEvents } = useSelector(
    (state) => state.events
  );

  // Function to check if user is already registered for an event
  const isUserRegisteredForEvent = (eventId) => {
    if (!registeredEvents || registeredEvents.length === 0) return false;
    return registeredEvents.some(regEvent => 
      regEvent.eventId && regEvent.eventId._id === eventId
    );
  };

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    dispatch(getEvents());
    // Fetch user's registered events to check registration status
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        const userId = user?.UserId;
        if (userId) {
          dispatch(getEventsByUserId(userId));
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  // Check if events array exists and has data
  if (!events || events.length === 0) {
    return (
      <div
        className={`mx-auto py-10 px-4 rounded-lg min-h-full shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm bg-[#492f3418] bg-opacity-[.03] ${
          dark ? "" : ""
        } `}
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)]">
          UPCOMING EVENTS
        </h2>
        <div className="text-center text-[#C9B796] text-lg">
          No events posted yet
        </div>
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div
      className={`mx-auto py-10 px-4 rounded-lg min-h-full shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm bg-[#492f3418] bg-opacity-[.03] ${
        dark ? "" : ""
      } `}
    >
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)]">
        UPCOMING EVENTS
      </h2>
      <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents?.map((tournament, index) => (
          <TournamentCard 
            key={tournament._id || index} 
            {...tournament} 
            dark={dark} 
            isUserRegistered={isUserRegisteredForEvent(tournament._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;