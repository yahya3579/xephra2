import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventById, joinEvent } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const RegisterEventDetailUser = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { event, loading, error, message } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, [dispatch, eventId]);

  const userId = JSON.parse(localStorage.getItem("user")).UserId;
  const handleJoin = (_id) => {
    const eventId = _id;
    if (!userId) {
      alert("User is not logged in");
      return;
    }
    dispatch(joinEvent({ userId, eventId }));
    alert("joined Successfully");
  };

  if (!event) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link to="/userdashboard" className="text-[#69363f] mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log("error is", error);
  }

  return (
    <div className="min-h-screen bg-[#232122] text-[#b6a99a] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#202938] rounded-lg overflow-hidden shadow-lg">
        <img
          className="w-full h-64 object-cover"
          src={`${process.env.REACT_APP_BACKEND}/${event?.image}`}
          alt={event?.title}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#b8a896]">
            Tournament Title : {event?.title}
          </h1>
          <p className="text-[#69363f] font-bold mt-2">Game : {event?.game}</p>
          <p className="text-sm text-gray-400 mt-1">
            Date & Time : {event?.date} • {event?.time}
          </p>
          <p className="text-gray-300 mt-4">
            Description : {event?.description}
          </p>
          <p className="mt-6 text-lg text-white font-bold">
            Prize Pool: {event?.prizePool}
          </p>
          <div className="mt-6">
            <h2 className="text-xl text-[#b8a896] font-bold">Rules</h2>
            <p className="text-gray-300 mt-2">{event?.rules}</p>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/userdashboard"
              className="bg-[#69363f] text-white px-6 py-3 rounded-md hover:bg-[#8f404f] transition"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEventDetailUser;
