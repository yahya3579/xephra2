import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchHostedTournaments } from "../../redux/features/eventsSlice";
import {
  postRankingApproval,
  fetchUserSubmissions,
  deleteUserSubmission,
} from "../../redux/features/rankingSlice";
import { getSubscriptionStatus } from "../../redux/features/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading/Loading";

const RankingApproval = ({ dark }) => {
  const dispatch = useDispatch();
  const { loading, hostedEvents } = useSelector((state) => state.events);
  const { data, error, submissions } = useSelector((state) => state.ranking);
  const { subscriptionStatus } = useSelector((state) => state.payment);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.UserId;

  // Check subscription status when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(getSubscriptionStatus(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchHostedTournaments());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserSubmissions(userId));
    }
  }, [dispatch, userId, data]);

  const [game, setGame] = useState({
    userId: userId,
    eventId: "",
    gameName: "",
    rank: "",
    score: "",
    status: "-",
    screenshot: null,
  });

  const handleInputChange = (field, value) => {
    setGame((prevGame) => ({
      ...prevGame,
      [field]: value,
    }));
  };

  // Handle file upload
  const handleScreenshotUpload = (file) => {
    setGame((prevGame) => ({
      ...prevGame,
      screenshot: file,
    }));
  };

  // Handle submission
  const handleSubmit = () => {
    // Check subscription before allowing submission
    if (!subscriptionStatus?.isActive) {
      alert("You need an active subscription to submit game entries.");
      return;
    }

    setGame((prevGame) => ({
      ...prevGame,
      status: "Pending",
    }));

    dispatch(postRankingApproval(game));
    setGame({
      userId: userId,
      eventId: "",
      gameName: "",
      rank: "",
      score: "",
      status: "-",
      screenshot: null,
    });
  };

  const handleDelete = (userId, eventId) => {
    dispatch(deleteUserSubmission({ userId, eventId }));
  };

  if (loading || subscriptionStatus?.loading) {
    return <Loading />;
  }

  // Show subscription restriction message if not subscribed
  if (!subscriptionStatus?.isActive) {
    return (
      <div className={`rounded-lg p-6 mx-auto text-center min-h-full shadow-2xl shadow-gray-950 backdrop-blur-sm ${
          dark
            ? "bg-[#492f3418] bg-opacity-[.06]":"bg-[#492f3418] bg-opacity-[.06]"}`}>
        <h1
          className={`text-[2.5rem] sm:text-2xl md:text-[2.5rem] lg:text-5xl font-semibold mb-6 font-[Montserrat] drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent ${
            dark ? "" : "text-[#232122]"
          }`}
        >
          User Game Entry
        </h1>
        
        <div className={`${
                    dark ? "bg-[#0000007D]" : "bg-[#69363F66]"
                  } rounded-lg p-8 z-50 backdrop-blur-lg mx-auto max-w-md`}>
          <div className="text-center">
            <div className="mb-6">
              <svg 
                className="mx-auto h-16 w-16 text-[#D19F43] mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-[#D19F43] mb-4">
              Subscription Required
            </h3>
            
            <p className="text-[#C9B796] mb-6 text-lg leading-relaxed">
              You need an active subscription to submit game entries and participate in tournaments.
            </p>
            
            <div className="space-y-4">
              <p className="text-[#C9B796] text-sm">
                Unlock access to:
              </p>
              <ul className="text-[#C9B796] text-sm space-y-2 mb-6">
                <li>• Submit game rankings</li>
                <li>• Join tournaments</li>
                <li>• View detailed statistics</li>
                <li>• Access premium features</li>
              </ul>
              
              <Link to="/paymentportal">
                <button className="w-full px-8 py-3 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-black font-semibold rounded-md hover:opacity-90 transition duration-300 transform hover:scale-105">
                  Activate Subscription
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log("game", game);
  return (
    <div className={`rounded-lg p-6 mx-auto text-center min-h-full shadow-2xl shadow-gray-950 backdrop-blur-sm  ${
        dark
          ? "bg-[#492f3418] bg-opacity-[.06]":"bg-[#492f3418] bg-opacity-[.06]"}`}>
      <h1
        className={`text-[2.5rem] sm:text-2xl md:text-[2.5rem] lg:text-5xl font-semibold mb-6 font-[Montserrat] drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent ${
          dark ? "" : "text-[#232122]"
        }`}
      >
        User Game Entry
      </h1>
      <div className={` ${
                  dark ? "bg-[#0000007D]" : "bg-[#69363F66]"
                } rounded-lg p-5 z-50 backdrop-blur-lg`}
                >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className={`text-[#C9B796] py-3 px-4 border border-[#C9B796] ${
                  dark ? "bg-[#69363F]" : "bg-[#232122]"
                }`}
              >
                Game Name
              </th>
              <th
                className={`text-[#C9B796] py-3 px-4 border border-[#C9B796] ${
                  dark ? "bg-[#69363F]" : "bg-[#232122]"
                }`}
              >
                Rank
              </th>
              <th
                className={`text-[#C9B796] py-3 px-4 border border-[#C9B796] ${
                  dark ? "bg-[#69363F]" : "bg-[#232122]"
                }`}
              >
                Score
              </th>
              <th
                className={`text-[#C9B796] py-3 px-4 border border-[#C9B796] ${
                  dark ? "bg-[#69363F]" : "bg-[#232122]"
                }`}
              >
                Screenshot
              </th>
              <th
                className={`text-[#C9B796] py-3 px-4 border border-[#C9B796] ${
                  dark ? "bg-[#69363F]" : "bg-[#232122]"
                }`}
              >
                Status
              </th>
              <th
                className={`text-[#C9B796] py-3 px-4 border border-[#C9B796] ${
                  dark ? "bg-[#69363F]" : "bg-[#232122]"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={game.id}
              className="bg-[#C9B796] hover:bg-[#b1a185] transition"
            >
              <td className="py-3 px-4 border border-[#69363F]">
                <select
                  id="hostedEvents"
                  onChange={(e) => {
                    const selectedEvent = hostedEvents.find(
                      (event) => event._id === e.target.value
                    );
                    if (selectedEvent) {
                      setGame((prevGame) => ({
                        ...prevGame,
                        eventId: selectedEvent._id,
                        gameName: selectedEvent.title,
                      }));
                    }
                  }}
                  value={game.eventId}
                  defaultValue=""
                  className="py-2 px-4 bg-[#303030] text-[#C9B796]"
                >
                  <option value="" disabled>
                    Select an event
                  </option>
                  {hostedEvents &&
                    hostedEvents.map((event) => (
                      <option key={event._id} value={event._id}>
                        {event.title}
                      </option>
                    ))}
                </select>
              </td>
              <td className="py-3 px-4 border border-[#69363F]">
                <input
                  type="number"
                  value={game.rank}
                  onChange={(e) => handleInputChange("rank", e.target.value)}
                  className="w-full border border-[#69363F] rounded px-2 py-1 placeholder-[#C9B796] bg-[#303030]"
                  placeholder="Enter rank"
                  disabled={game.status !== "-"}
                />
              </td>
              <td className="py-3 px-4 border border-[#69363F]">
                <input
                  type="number"
                  value={game.score}
                  onChange={(e) => handleInputChange("score", e.target.value)}
                  className="w-full border border-[#69363F] rounded px-2 py-1 placeholder-[#C9B796] bg-[#303030]"
                  placeholder="Enter score"
                  disabled={game.status !== "-"}
                />
              </td>
              <td className="py-3 px-4 border border-[#69363F]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleScreenshotUpload(e.target.files[0])}
                  className="text-[#C9B796] w-full border border-[#69363F] rounded px-2 py-1 placeholder-[#C9B796] bg-[#303030]"
                  disabled={game.status !== "-"}
                />
                {game.screenshot && (
                  <img
                    src={URL.createObjectURL(game.screenshot)}
                    alt="Screenshot Preview"
                    className="mt-2 w-20 h-20 object-cover border border-[#69363F] rounded"
                  />
                )}
              </td>
              <td className="py-3 px-4 border border-[#69363F] text-center">
                <span
                  className={`${
                    game.status === "Pending"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  } font-bold`}
                >
                  {game.status}
                </span>
              </td>
              <td className="py-3 px-4 border-b border-r border-[#69363F] text-center flex justify-center gap-2 items-center">
                {game.status === "-" ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-[#5C2D33] text-white px-4 py-2 rounded-md hover:bg-[#854951] hover:text-black hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] transition"
                  >
                    Submit
                  </button>
                ) : (
                  <span className="text-green-600 font-bold">Submitted</span>
                )}
                {error && <p className="text-red-300">{error?.message}</p>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 ">
        {submissions.length === 0 && !loading && <p className="text-[#C9B796]">No submissions found.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out overflow-hidden"
            >
              {/* Screenshot on Top */}
              {submission.screenshot && (
                <img
                  src={`${process.env.REACT_APP_BACKEND}/${submission.screenshot}`}
                  alt="Submission Screenshot"
                  className="w-full h-36 object-cover rounded-t-2xl"
                />
              )}

              {/* Details Section */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  {submission.gameName}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-gray-600 text-xs">
                  <p>
                    <span className="font-medium text-gray-700">Rank:</span>{" "}
                    {submission.rank}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Score:</span>{" "}
                    {submission.score}
                  </p>
                </div>

                <div className="mt-2 flex flex-row justify-around items-center">
                  <div className="flex flex-row items-center">
                    <p className="font-medium text-gray-700 text-xs">Status:</p>
                    <span
                      className={`px-2 ms-2 py-1 inline-block rounded-full text-xs font-semibold ${
                        submission.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : submission.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>

                  <div>
                    <button
                    className="bg-red-300 px-3 py-1 rounded text-white"
                      onClick={() =>
                        handleDelete(submission.userId, submission.eventId)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default RankingApproval;