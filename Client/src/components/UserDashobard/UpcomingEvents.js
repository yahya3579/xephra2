import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, joinEvent } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

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
  const dispatch = useDispatch();
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

  const imageUrl = `${process.env.REACT_APP_BACKEND}/${image}`;
  return (
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
          <span className="text-xl font-bold text-[#D4AD66]">PKR: {prizePool}</span>
        </div>
        </Link> 
        <div className="flex justify-center">
        <button
            disabled={loading}
            onClick={() => handleJoin(_id)}
            className={`bottom-0 mt-5 px-24 py-3 rounded-md transition bg-[#69363f] hover:text-black hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-[#C9B796] ${dark ? "" : ""}`}
          >
            {loading ? "Joining..." : "Join Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

const UpcomingEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { loading, error, events, message, event, participants } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch, event]);

  if (loading) {
    return <Loading />;
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div
      className={`mx-auto py-10 px-4 rounded-lg min-h-full shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm bg-[#492f3418] bg-opacity-[.03] ${
        dark
          ? "":""} `}
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
