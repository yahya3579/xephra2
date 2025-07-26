import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEventsByUserId } from "../../redux/features/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading/Loading";

const TournamentCard = (tournament) => {
  const event = tournament?.tournament?.eventId;
  return (
    <div className="bg-[#000000] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border-[0.2px] border-slate-300">
      <Link to={`/registereventuser/${event?._id}`} className="relative block w-full">
        <img
          className="w-full h-60 object-cover"
          src={`${process.env.REACT_APP_BACKEND}/${event?.image}`}
          alt={event?.title}
        />
        <h3 className="drop-shadow-2xl absolute bottom-0 left-0 w-[55%] text-2xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] px-4 py-2">{event?.title}</h3>
      </Link>
      <div className="p-4">
      <Link to={`/registereventuser/${event?._id}`}>
        <p className="text-[#C9B796] text-lg font-bold mt-1">{event?.game}</p>
        <p className="text-[#C9B796] mt-2  line-clamp-3">{event?.description}</p>
        <p className="bg-[#302A27] text-[#C9B796] font-bold px-2 w-1/2">{event?.date}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-[#D4AD66]">
            PKR: {event?.prizePool}
          </span>
        </div>
        </Link>  
      </div>
    </div>
  );
};

const RegisteredEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector((state) => state.events);
  const userId = JSON.parse(localStorage.getItem("user"))?.UserId;

  useEffect(() => {
    if (userId) {
      dispatch(getEventsByUserId(userId)); // Fetch events on component mount
    }
  }, [dispatch, userId]);

  // Render the UI
  if (loading) {
    return <Loading />;
  }

  

  return (
    <div
      className={`mx-auto py-10 px-4 rounded-lg min-h-full shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm ${
        dark
          ? "bg-[#492f3418] bg-opacity-[.06]":"bg-[#492f3418] bg-opacity-[.06]"}`}
    >
      <h2 className="text-[2.5rem] font-semibold font-montserrat text-center mb-8 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] ">
        Registered Events
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {participants.length ===0 ? <p className="text-red-500 text-xl lg:text-2xl">No Registered Events! </p> : 
        participants.map((tournament, index) => (
          <TournamentCard key={index} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
