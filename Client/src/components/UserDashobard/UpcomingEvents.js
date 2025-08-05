import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, joinEvent } from "../../redux/features/eventsSlice";
import { getSubscriptionStatus } from "../../redux/features/paymentSlice";
import Loading from "../../utils/Loading/Loading";
import toast from "react-hot-toast";

const TournamentCard = ({
  _id,
  title,
  game,
  date,
  time,
  description,
  image,
  prizePool,
  dark
}) => {
  const { loading, error, message } = useSelector((state) => state.events);
  const { subscriptionStatus } = useSelector((state) => state.payment);
  const [showPopup, setShowPopup] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    mode: 'solo',
    uniqueIds: [''],
    eventId: _id
  });
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user")).UserId;
  
  // Check subscription status when component mounts
  useEffect(() => {
    if (userId) {
      const loadingToast = toast.loading("Checking subscription status...");
      dispatch(getSubscriptionStatus(userId)).then((result) => {
        toast.dismiss(loadingToast);
        // Error will be handled by the subscription error useEffect
      });
    }
  }, [dispatch, userId]);

  // Handle join event success and error
  useEffect(() => {
    if (message && !loading) {
      toast.success(message);
    }
    if (error && !loading) {
      toast.error(error);
    }
  }, [message, error, loading]);

  // Handle subscription status errors
  useEffect(() => {
    if (subscriptionStatus?.error && !subscriptionStatus?.loading) {
      toast.error(subscriptionStatus.error);
    }
  }, [subscriptionStatus?.error, subscriptionStatus?.loading]);

  // Handle events loading errors
  useEffect(() => {
    if (error && !loading) {
      toast.error(error);
    }
  }, [error, loading]);



  const handleJoin = (_id) => {
    const eventId = _id;
    if (!userId) {
      toast.error("User is not logged in");
      return;
    }

    // Check if subscription is active
    if (!subscriptionStatus?.isActive) {
      setShowPopup(true);
      return;
    }

    // Show join form
    setJoinFormData({
      mode: 'solo',
      uniqueIds: [''],
      eventId: _id
    });
    setShowJoinForm(true);
  };

  const handleModeChange = (mode) => {
    let uniqueIdsCount = 1;
    if (mode === 'duos') uniqueIdsCount = 2;
    if (mode === 'squads') uniqueIdsCount = 4;

    setJoinFormData({
      ...joinFormData,
      mode,
      uniqueIds: Array(uniqueIdsCount).fill('')
    });
  };

  const handleUniqueIdChange = (index, value) => {
    const newUniqueIds = [...joinFormData.uniqueIds];
    newUniqueIds[index] = value;
    setJoinFormData({
      ...joinFormData,
      uniqueIds: newUniqueIds
    });
  };

  const handleSubmitJoin = () => {
    // Validate form
    if (joinFormData.uniqueIds.some(id => !id.trim())) {
      toast.error("Please fill in all unique IDs");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Joining event...");
    
    dispatch(joinEvent({ 
      userId, 
      eventId: joinFormData.eventId,
      mode: joinFormData.mode,
      uniqueIds: joinFormData.uniqueIds
    })).then((result) => {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.meta.requestStatus === 'fulfilled') {
        setShowJoinForm(false);
        setJoinFormData({
          mode: 'solo',
          uniqueIds: [''],
          eventId: ''
        });
      }
      // Success/error will be handled by the useEffect above
    });
  };

  const closeJoinForm = () => {
    setShowJoinForm(false);
    setJoinFormData({
      mode: 'solo',
      uniqueIds: [''],
      eventId: ''
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleActivateSubscription = () => {
    setShowPopup(false);
    toast.success("Redirecting to payment portal...");
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
            <p className="text-[#C9B796] mt-2  line-clamp-3">{description}</p>
            <p className="text-lg text-[#C9B796] lg:w-[100%]">
              <span className=" bg-[#302A27] px-5">{date}</span> • <span className=" bg-[#302A27] px-5">{time}</span>
            </p>
            <div>
              <span className="text-xl font-bold text-[#D4AD66]">Prize Pool: PKR {prizePool}</span>
            </div>
          </Link> 
          <div className="flex justify-center">
            <button
              disabled={loading || subscriptionStatus?.loading}
              onClick={() => handleJoin(_id)}
              className={`bottom-0 mt-5 px-24 py-3 rounded-md transition bg-[#69363f] hover:text-black hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-[#C9B796] ${dark ? "" : ""}`}
            >
              {loading ? "Joining..." : subscriptionStatus?.loading ? "Checking..." : "Join Now"}
            </button>
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
                    onClick={handleActivateSubscription}
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

      {/* Join Event Form Popup */}
      {showJoinForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#000000] border border-[#D19F43] rounded-lg p-6 max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeJoinForm}
              className="absolute top-2 right-2 text-[#C9B796] hover:text-[#D19F43] text-xl font-bold"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#D19F43] mb-2">
                Join Event
              </h3>
              <p className="text-[#C9B796] text-sm">
                {title}
              </p>
            </div>

            {/* Game Mode Selection */}
            <div className="mb-6">
              <label className="block text-[#C9B796] font-semibold mb-3">
                Select Game Mode:
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="solo"
                    checked={joinFormData.mode === 'solo'}
                    onChange={(e) => handleModeChange(e.target.value)}
                    className="mr-3 text-[#D19F43] focus:ring-[#D19F43]"
                  />
                  <span className="text-[#C9B796]">Solo (1 Player)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="duos"
                    checked={joinFormData.mode === 'duos'}
                    onChange={(e) => handleModeChange(e.target.value)}
                    className="mr-3 text-[#D19F43] focus:ring-[#D19F43]"
                  />
                  <span className="text-[#C9B796]">Duos (2 Players)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="squads"
                    checked={joinFormData.mode === 'squads'}
                    onChange={(e) => handleModeChange(e.target.value)}
                    className="mr-3 text-[#D19F43] focus:ring-[#D19F43]"
                  />
                  <span className="text-[#C9B796]">Squads (4 Players)</span>
                </label>
              </div>
            </div>

            {/* Unique IDs Fields */}
            <div className="mb-6">
              <label className="block text-[#C9B796] font-semibold mb-3">
                Unique IDs:
              </label>
              <div className="space-y-3">
                {joinFormData.uniqueIds.map((id, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder={`Player ${index + 1} Unique ID`}
                      value={id}
                      onChange={(e) => handleUniqueIdChange(index, e.target.value)}
                      className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#D19F43] rounded-md text-[#C9B796] placeholder-[#666] focus:outline-none focus:border-[#eb9a0d] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={closeJoinForm}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitJoin}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-black rounded-md hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UpcomingEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { loading, error, events, message, event, participants } = useSelector(
    (state) => state.events
  );
  const [eventsLoaded, setEventsLoaded] = useState(false);

  useEffect(() => {
    const loadingToast = toast.loading("Loading events...");
    dispatch(getEvents()).then((result) => {
      toast.dismiss(loadingToast);
      if (result.meta.requestStatus === 'fulfilled') {
        setEventsLoaded(true);
      }
      // Error will be handled by the events error useEffect
    });
  }, [dispatch, event]);

  // Show success when events are loaded
  useEffect(() => {
    if (eventsLoaded && !loading) {
      if (events.length > 0) {
        toast.success(`Loaded ${events.length} events successfully!`);
      } else {
        toast.info("No events available at the moment.");
      }
      setEventsLoaded(false); // Reset to prevent showing again
    }
  }, [eventsLoaded, events.length, loading]);

  if (loading) {
    return <Loading />;
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
        {sortedEvents.length === 0
          ? "No events posted yet"
          : sortedEvents?.map((tournament, index) => (
              <TournamentCard key={index} {...tournament} dark={dark} />
            ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;