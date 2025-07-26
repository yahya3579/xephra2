import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, getEventsByUserId } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";
import { getTopRanking } from "../../redux/features/rankingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserProfile } from "../../redux/features/userSlice";

const DashboardUser = ({ dark }) => {
  const dispatch = useDispatch();
  const { loading, events, event, participants } = useSelector(
    (state) => state.events
  );
  const { profileExists } = useSelector((state) => state.user);

  const { topranks } = useSelector((state) => state.ranking);

  const userId = JSON.parse(localStorage.getItem("user"))?.UserId;

  useEffect(() => {
    dispatch(getEvents());
    if (userId) {
      dispatch(getEventsByUserId(userId));
    }
  }, [dispatch, event]);

  useEffect(() => {
    if (userId) {
      dispatch(checkUserProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profileExists === false) {
      toast.warn(
        "Your profile is not set up yet. Please complete your profile.",
        {
          position: "top-right",
          className:
            "bg-yellow-500 text-white font-medium p-4 rounded-lg shadow-lg",
          progressClassName: "bg-yellow-300",
          autoClose: false,
        }
      );
    }
  }, [profileExists]);

  useEffect(() => {
    dispatch(getTopRanking());
  }, []);

  const sortedUpcomingEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const sortedRegisteredEvents = [...participants].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const settings1 = {
    dots: false,
    infinite: sortedRegisteredEvents.length >= 3, // Jab 3 ya zyada events hon to infinite true hoga
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: sortedRegisteredEvents.length >= 3, // Jab 3 ya zyada events hon to autoplay on hoga
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(2, sortedRegisteredEvents.length), // Jab 2 events ho to max 2 dikhayega
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1, // Mobile screens pe ek ek slide dikhayega
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: sortedRegisteredEvents.length >= 3, // Jab 3 ya zyada events hon to infinite true hoga
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: sortedRegisteredEvents.length >= 3, // Jab 3 ya zyada events hon to autoplay on hoga
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(2, sortedRegisteredEvents.length), // Jab 2 events ho to max 2 dikhayega
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1, // Mobile screens pe ek ek slide dikhayega
          slidesToScroll: 1,
        },
      },
    ],
  };

  const maxWightedScore = Math.max(
    ...topranks.map((user) => user.weightedScore)
  );

  return (
    <div className="container mx-auto p-1 ">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-64">
        <div className=" w-full absolute inset-0  bg-opacity-50 text-left text-white lg:mt-1">
          <h1
            className="bg-gradient-to-r from-[#D19f43] via-[#B2945C] via-[#C9B796] via-[#B39867] to-[#D4AD66] text-transparent bg-clip-text sm:w-full font-bold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]
          font-montserrat font-bold text-[30px] text-center md:text-start md:text-[45px] sm:leading-[50.9px] sm:tracking-[-5%]
          "
          >
            Welcome to the<br></br> Gaming <br />
            Dashboard
          </h1>
          <h2
            className={`bg-clip-text text-transparent mt-2  md:text-wrap sm:text-xl drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] font-montserrat font-bold text-[10px] text-center sm:text-start sm:text-[15px] leading-[34.9px] ${
              dark ? "bg-[#D4AD66]" : "text-white"
            }`}
          >
            Stay updated with upcoming events and your ranking progress.
          </h2>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Events Section */}
        <div className={`col-span-12 lg:col-span-9 }`}>
          <div
            className={`p-4 rounded shadow-2xl shadow-gray-950 pb-10 backdrop-blur-sm ${
              dark ? "bg-[#69363f18] bg-opacity-[.06]" : "bg-[#2321225d]"
            }`}
          >
            <h2
              className={`font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] lg:text-3xl md:text-xl sm:text-lg font-bold mb-4 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-center`}
            >
              Upcoming Events
            </h2>
            <Slider {...settings1}>
              {sortedUpcomingEvents.length === 0 ? (
                <p className="text-red-500 text-xl lg:text-2xl">
                  No Registered Events!{" "}
                </p>
              ) : (
                sortedUpcomingEvents?.map((event) => (
                  <Link
                    to={`/eventuser/${event?._id}`}
                    key={event._id}
                    className="flex-none p-1 flex flex-col h-full  min-h-[200px]"
                  >
                    <div className="relative rounded-lg shadow-lg overflow-hidden h-full min-h-[200px]  hover:scale-105 transition duration-200">
                      {/* Image as background */}
                      <img
                        src={`${process.env.REACT_APP_BACKEND}/${event.image}`}
                        alt={event.title}
                        className="h-48 w-full object-cover"
                      />

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t  from-black/100 to-[#00000020] p-3">
                        <h3 className="text-white text-lg font-bold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
                          {event?.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </Slider>
          </div>

          <div
            className={`p-4 rounded shadow-2xl shadow-gray-950 pb-10 mt-5 backdrop-blur-sm ${
              dark ? "bg-[#69363f18] bg-opacity-[.06]" : "bg-[#2321225d]"
            }`}
          >
            <h2
              className={` font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-center lg:text-3xl md:text-xl sm:text-lg font-bold mb-8 mt-2`}
            >
              Registered Events
            </h2>
            <Slider {...settings2}>
              {sortedRegisteredEvents.length === 0 ? (
                <p className="text-red-500 text-center text-lg lg:text-xl">
                  No Registered Events!{" "}
                </p>
              ) : (
                sortedRegisteredEvents.map((event) => (
                  <Link
                    to={`/eventuser/${event?.eventId?._id}`}
                    key={event?.eventId?._id}
                    className="flex-none p-1 flex flex-col h-full  min-h-[200px]"
                  >
                    <div
                      key={event?.eventId?.id}
                      className="relative rounded-lg shadow flex flex-col h-full min-h-[200px]  hover:scale-105 transition duration-200"
                    >
                      {/* Image as background */}
                      <img
                        src={`${process.env.REACT_APP_BACKEND}/${event?.eventId?.image}`}
                        alt={event.title}
                        className="h-48 w-full object-cover rounded"
                      />

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t  from-black/100 to-[#00000020] p-3">
                        <h3 className="text-white text-lg font-bold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
                          {event?.eventId?.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </Slider>
          </div>
        </div>
        {/* Rankings Section */}
        <div
          className={`col-span-12 lg:col-span-3 p-4 rounded shadow text-white ${
            dark ? "bg-[#292622c4] " : "bg-[#292622c4]"
          }`}
        >
          <h2
            className={`font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent`}
          >
            User Rankings
          </h2>
          <ul>
            {topranks && topranks.length > 0
              ? topranks.map((user, index) => {
                  const progress =
                    (user?.weightedScore / maxWightedScore) * 100;
                  return (
                    <li key={user.id} className="flex items-center mb-4">
                      {/* Ensure the image does not shrink */}
                      <div className="flex-shrink-0">
                        <img
                          src={`${process.env.REACT_APP_BACKEND}/${user?.userProfile?.profileImage}`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0 ml-4">
                        {/* Name and Rank in One Line */}
                        <div className="flex items-center justify-between text-xs whitespace-nowrap overflow-hidden">
                          {/* Allow Name to Shrink but Not Rank */}
                          <p
                            className={`font-bold truncate flex-1 ${
                              dark ? "text-[#C9B796]" : "text-[#C9B796]"
                            }`}
                          >
                            {user?.userProfile?.fullName}
                          </p>

                          {/* Ensure Rank is Fully Visible at the End */}
                          <p
                            className={`ml-2 flex-shrink-0 ${
                              dark
                                ? "bg-gradient-to-r text-[#C9B796]"
                                : "text-[#C9B796]"
                            }`}
                          >
                            Rank {index + 1}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-full bg-[#69363F] h-2 rounded">
                            <div
                              className={`h-2 rounded ${
                                dark ? "bg-gradient-to-r from-[#AE8D52] via-[#BCA477] via-[#C6b492] via-[#B69A66] to-[#CBA766] " : "bg-gradient-to-r from-[#AE8D52] via-[#BCA477] via-[#C6b492] via-[#B69A66] to-[#CBA766] "
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              : "Currently we don't have top 5 players"}
          </ul>
          <Link
            to="/userdashboard/allranking"
            className={`text-white font-semibold py-2 px-4 rounded mt-4 block text-center ${
              dark
                ? "bg-[#854951] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-white hover:text-black"
                : "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:bg-[#854951]"
            }`}
          >
            See All
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardUser;
