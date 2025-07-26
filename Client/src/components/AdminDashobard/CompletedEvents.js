import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostedTournaments } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const CompletedEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { hostedEvents, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchHostedTournaments());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const TournamentCard = ({
      _id,
      title,
      game,
      date,
      time,
      description,
      image,
      prizePool,
    }) => {
    
      const imageUrl = `${process.env.REACT_APP_BACKEND}/${image}`;
      return (
        <div className="bg-[#000000] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-x border-slate-300 border-[0.2px] ">
          <Link to={`/eventadmin/${_id}`} className="relative block w-full">
            <img className="w-full h-60 object-cover" src={imageUrl} alt={title} />
            <h3 className="drop-shadow-2xl absolute bottom-0 left-0 w-[55%] text-2xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] px-4 py-2">
              {title}
            </h3>
          </Link>
    
          <div className="p-4">
            <Link to={`/eventadmin/${_id}`}>
            <p className="text-[#C9B796] text-lg font-bold mt-1">{game}</p>
             <p className="text-[#C9B796] mt-2  line-clamp-3">{description}</p>
             <p className="text-lg text-[#C9B796] lg:w-[100%] mt-2">
             <span className=" bg-[#302A27] px-5">{date}</span> • <span className=" bg-[#302A27] px-5">{time}</span>
            </p>
            <div>
              <span className="text-xl font-bold text-[#D4AD66] mt-2">PKR: {prizePool}</span>
            </div>
            </Link> 
            <div className="flex justify-center">
            {/* User Ranking Button */}
              <Link
              to={`/dashboard/tournamentrankings/${_id}`}
              className={`mt-4 inline-block px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out transform hover:bg-[#69363F] hover:scale-105 ${
                dark
                  ? "bg-[#8f404f] text-white hover:text-black hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d]":"bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:bg-[#69363f] text-white hover:text-black"}`}
            >
              Users Ranking
            </Link>
            </div>
          </div>
        </div>
      );
    };

  return (
    <div className={`mx-auto py-10 px-4 rounded-lg shadow-2xl shadow-gray-950 backdrop-blur-sm ${dark ? "" : "bg-[#232122]"}`}>
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">Completed Events</h2>
      </div>

      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hostedEvents.map((tournament) => (
          <TournamentCard key={tournament._id} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default CompletedEvents;
