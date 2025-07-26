import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventById,
  fetchEventUsers,
  markEventAsHosted,
} from "../../redux/features/eventsSlice";
import { getUser } from "../../redux/features/profileSlice";
import Loading from "../../utils/Loading/Loading";
import { FiArrowLeft } from "react-icons/fi";
import Modal from "./Modal";

const EventDetailAdmin = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEventHosted, setIsEventHosted] = useState(false);

  const { eventId } = useParams();
  const { event, loading, error, participants, hostEvent } = useSelector(
    (state) => state.events
  );
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
      dispatch(fetchEventUsers(eventId));
    }
  }, [dispatch, eventId]);

  const handleProfileView = (userId) => {
    dispatch(getUser(userId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHostEventClick = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmHostEvent = () => {
    dispatch(markEventAsHosted(eventId));
    setIsEventHosted(true);
    setIsConfirmModalOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log("error is", error);
  }

  if (!event) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link to="/dashboard" className="text-[#69363f] mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e2a36] to-[#2a3d54] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Button */}
        <div className="text-left mb-8">
          <Link
            to="/dashboard"
            className="flex items-center text-[#f1b500] transition-all duration-300 ease-in-out"
          >
            <FiArrowLeft className="mr-2 text-2xl" /> Back to Events
          </Link>
        </div>

        {/* Event Details */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          <div className="lg:w-2/3 space-y-6">
            <h2 className="text-4xl font-bold text-[#f1b500]">
              Tournament: {event?.title}
            </h2>
            <p className="text-xl text-[#f0f0f0]">Game : {event?.game}</p>
            <p className="text-lg text-[#f0f0f0] mt-4">
              Description : {event?.description}
            </p>
            <p className="text-2xl text-[#f1b500] font-semibold mt-6">
              Prize Pool: {event?.prizePool}
            </p>
            <p className="text-lg text-[#f0f0f0] mt-2">
              Date & Time: {event?.date} • {event?.time}
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-[#f1b500]">Rules</h3>
              <p className="text-lg text-[#e0e0e0] mt-2">{event?.rules}</p>
            </div>
          </div>
          <div className="lg:w-1/3">
            <img
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              src={`${process.env.REACT_APP_BACKEND}/${event?.image}`}
              alt={event?.title}
            />
          </div>
        </div>

        {/* Host Event Button or Message */}

        <div className="text-center mt-8">
          {event?.hosted || isEventHosted ? (
            <p className="text-2xl text-[#f1b500] font-bold">
              This event has been hosted
            </p>
          ) : (
            <>
              <button
                onClick={handleHostEventClick}
                className="bg-[#f1b500] text-[#232122] font-bold py-2 px-6 rounded-lg transition-all duration-300"
              >
                Host Event
              </button>
              <p className="text-[#f0f0f0] mt-2">
                Click to mark this event as hosted.
              </p>
            </>
          )}
        </div>

        {/* Participants */}
        <div>
          <h2 className="text-4xl font-bold text-[#f1b500] mb-6">
            Participants
          </h2>
          <div className="bg-[#36474f] p-8 rounded-lg shadow-lg">
            <p className="text-[#a1a1a1] font-semibold mb-4">
              Total Participants: {participants.length}
            </p>
            <ul className="space-y-4">
              {participants.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-[#e0e0e0] text-lg"
                >
                  <span className="font-semibold text-[#f1b500]">
                    {index + 1}. {user.name}
                  </span>
                  <div className="flex items-center">
                    <Link
                      onClick={() => handleProfileView(user?.userId)}
                      className="bg-[#f1b500] text-[#232122] py-1 px-4 rounded-lg transition-all duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} profile={profile} />

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-[#2a3d54] text-white p-8 rounded-xl shadow-2xl text-center w-[90%] max-w-md transform scale-95 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-[#f1b500]">
              Confirm Action
            </h2>
            <p className="text-lg text-[#e0e0e0] mt-4">
              Are you sure you want to host this event?
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={confirmHostEvent}
                className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
              >
                Yes, Host Event
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-500 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailAdmin;
