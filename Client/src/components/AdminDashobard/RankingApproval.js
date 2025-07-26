import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostedTournaments } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const RankingApproval = ({dark}) => {
  const dispatch = useDispatch();
    const { hostedEvents, loading, error } = useSelector((state) => state.events);
  
    useEffect(() => {
      dispatch(fetchHostedTournaments());
    }, [dispatch]);
  
    if (loading) {
      return <Loading />;
    }

  return (
    <div 
      className={`p-6 bg-cover bg-center min-h-screen rounded-xl shadow-2xl shadow-gray-950 backdrop-blur-sm  ${
        dark
          ? "bg-[#492f3418] bg-opacity-[.06]":"bg-[#232122]"}`}
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center font-['Press_Start_2P'] drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">Admin Approval Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {hostedEvents.map((event) => (
          <Link to={`/dashboard/tournamentrankingapproval/${event._id}`}>
          <div
            key={event.id}
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
          >
            <img
              src={`${process.env.REACT_APP_BACKEND}/${event.image}`}
              alt={event.title}
              className="w-full h-32 object-cover transform group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-semibold truncate w-6/7 text-center">{event.title}</h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RankingApproval;