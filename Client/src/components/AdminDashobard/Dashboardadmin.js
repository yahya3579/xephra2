import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ArcElement,
  BarElement,
} from "chart.js";
import { Link } from "react-router-dom";
import { getEvents,fetchHostedTournaments } from "../../redux/features/eventsSlice";
import {
  getAllUsers,
  deleteUser,
  suspendUser,
  getUser,
} from "../../redux/features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { getTopRanking } from "../../redux/features/rankingSlice";
import { gettotaluserandevents } from "../../redux/features/profileSlice";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const DashboardAdmin = ({ setActiveMenu, dark }) => {
  const dispatch = useDispatch();
  const { events,hostedEvents } = useSelector((state) => state.events);
  const { users, profile } = useSelector((state) => state.profile);
  const { topranks } = useSelector((state) => state.ranking);
  const { userCount, eventCount } = useSelector((state) => state.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getAllUsers());
    dispatch(getTopRanking());
    dispatch(gettotaluserandevents());
    dispatch(fetchHostedTournaments());
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sortedPostedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const sortedCompletedEvents = [...hostedEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );


  const settings1 = {
    dots: false,
    infinite: sortedPostedEvents.length >= 3, // Jab 3 ya zyada events hon to infinite true hoga
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: sortedPostedEvents.length >= 3, // Jab 3 ya zyada events hon to autoplay on hoga
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(2, sortedPostedEvents.length), // Jab 2 events ho to max 2 dikhayega
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
    infinite: sortedCompletedEvents.length >= 3, // Jab 3 ya zyada events hon to infinite true hoga
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: sortedCompletedEvents.length >= 3, // Jab 3 ya zyada events hon to autoplay on hoga
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(2, sortedCompletedEvents.length), // Jab 2 events ho to max 2 dikhayega
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


  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  const handleSuspend = (userId) => {
    dispatch(suspendUser(userId));
  };
  const handleProfileView = (userId) => {
    dispatch(getUser(userId));
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Chart data for Analytics & Stats
  const analyticsData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Total Events",
        data:
          eventCount.length > 0 ? eventCount.slice(0, 6) : [0, 0, 0, 0, 0, 0],
        borderColor: "#DDA853",
        backgroundColor: "black",
        fill: true,
      },
      {
        label: "Active Users",
        data: userCount.length > 0 ? userCount.slice(0, 6) : [0, 0, 0, 0, 0, 0],
        borderColor: "#C84C05",
        backgroundColor: "black",
        fill: true,
      },
    ],
  };

  const maxWightedScore = Math.max(
    ...topranks.map((user) => user.weightedScore)
  );

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section for Admin */}
      <div className="relative bg-cover bg-center h-56">
        <div className=" w-full absolute inset-0  bg-opacity-50 text-left text-white mt-20 ">
        <h1 className="drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#e5b967] via-[#d1a759] to-[#f9f9f9] bg-clip-text text-transparent  w-1/2 text-5xl lg:text-[3.6rem] md:text-6xl sm:text-6xl sm:w-full font-bold">
            Welcome Admin!
          </h1>
          <h2 className={`drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-clip-text text-transparent mt-7 lg:text-2xl md:text-2xl md:text-wrap sm:text-xl ${dark ? "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d]" : "text-white"}`}>
            Manage and Monitor all the Gaming Events and Rankings Efficiently.
          </h2>
        </div>
      </div>

      {/* Analytics & Stats Dashboard Section */}
      <div
        className={`p-4 rounded shadow-2xl shadow-gray-950  mt-8  backdrop-blur-sm ${dark ? "bg-[#69363f18] bg-opacity-[.06]" : "bg-[#2321223d]"}`}
      >
        <h2
          className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${
            dark
              ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          Analytics & Stats
        </h2>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-1 gap-6 h-[300px]">
            <div className="bg-[#232122] p-4 rounded shadow w-full h-[100%]">
              <h3 className="text-lg text-white font-bold">
                Total Events & Active Users
              </h3>
              <div className="w-full h-[250px]">
                <Line
                  data={analyticsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false, // Ensures it stretches to fit container
                    plugins: {
                      legend: {
                        labels: { color: "white" },
                      },
                    },
                    scales: {
                      x: { ticks: { color: "white" } },
                      y: { ticks: { color: "white" } },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-12 gap-6 mt-8">
          {/* Events Section */}
          <div
            className={`col-span-12 lg:col-span-9 backdrop-blur-sm p-4 rounded shadow-2xl shadow-gray-950 ${dark ? "bg-[#69363f18] bg-opacity-[.06]" : "bg-[#232122]"}`}
          >
            <h2
            className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${
              dark
                ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
                : "text-white"
            } `}
          >
              Posted Events
            </h2>
            <Slider {...settings1}>
              {events.map((event) => (
                <Link
                  to={`/eventadmin/${event?._id}`}
                  key={event._id}
                  className="flex-none p-1 flex flex-col h-full  min-h-[200px] hover:scale-105 transition duration-200"
                >
                  <div className="relative rounded-lg shadow flex flex-col h-full min-h-full">
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/${event.image}`}
                      alt={event.title}
                      className="h-60 w-full object-cover rounded"
                    />
                    <div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/100 to-[#00000020] p-3">
                        <h3 className="text-white text-lg font-bold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
            <h2
            className={`lg:text-2xl md:text-xl sm:text-lg font-bold mt-2 mb-4 ${
              dark
                ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
                : "text-white"
            } `}
            >
              Completed Events
            </h2>
            <Slider {...settings2}>
              {hostedEvents.map((event) => (
                <Link
                  to={`/eventadmin/${event?._id}`}
                  key={event._id}
                  className="flex-none p-1 flex flex-col h-full  min-h-[200px]"
                >
                  <div className="relative rounded-lg shadow flex flex-col h-full min-h-full hover:scale-105 transition duration-200 ">
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/${event.image}`}
                      alt={event.title}
                      className="h-60 w-full object-cover rounded "
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/100 to-[#00000020] p-3">
                      <h3 className="text-white text-lg font-bold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)]">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>

          {/* Rankings Section */}
          {/* <div
            className={`col-span-12 lg:col-span-3 p-4 rounded shadow  ${
              dark ? "bg-[#292622e3]" : "bg-[#232122]"
            } `}
          >
            <h2
              className={`lg:text-2xl md:text-xl sm:text-lg font-bold mb-4 ${
                dark
                  ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
                  : "text-white"
              } `}
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
                        <img
                          src={`${process.env.REACT_APP_BACKEND}/${user?.userProfile?.profileImage}`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div className="flex-1">
                          <p
                            className={`font-bold lg:text-lg sm:text-base ${
                              dark
                                ? "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
                                : "text-[#D3D3D3]"
                            } `}
                          >
                            {user?.userProfile?.fullName}
                          </p>
                          <div className="flex items-center space-x-2">
                            <p
                              className={`text-sm ${
                                dark
                                  ? "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
                                  : "text-[#D3D3D3]"
                              } `}
                            >
                              Rank: {index + 1}
                            </p>
                            <div className="w-full bg-gray-200 h-2 rounded">
                              <div
                                className={`h-2 rounded ${
                                  dark ? "bg-[#A15D66]" : "bg-[#A15D66]"
                                } `}
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
            to="/dashboard/allranking"
            className={`text-white font-semibold py-2 px-4 rounded mt-4 block text-center ${
              dark
                ? "bg-[#854951] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-white hover:text-black"
                : "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:bg-[#854951]"
            }  `}
          >
            See All
          </Link>
          </div> */}
           <div
          className={`col-span-12 lg:col-span-3 p-4 rounded shadow ${
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
            to="/dashboard/allranking"
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

        {/* User Management Section */}
        <div
          className={`mt-8 backdrop-blur-sm p-4 rounded shadow-2xl shadow-gray-950 ${dark ? "bg-[#69363f18] bg-opacity-[.06]" : "bg-[#232122]"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`lg:text-2xl md:text-xl sm:text-lg font-bold ${
                dark
                  ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              Manage Users
            </h2>
            <Link
              to="/dashboard/users"
              className={`text-sm ${
                dark
                  ? "drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-[19px]"
                  : "text-white"
              }`}
            >
              See All
            </Link>
          </div>
          <div className="overflow-x-auto sm:overflow-x-hidden">
            <table className="min-w-full bg-[#232122] rounded shadow text-white">
              <thead>
                <tr className="bg-[#2c2c2c] ">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Role</th>
                  <th className="p-2 text-left">Created At</th>
                  <th className="p-2 text-left">Profile</th>
                  <th className="p-2 text-left">Suspension Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="border-[#393939] hover:bg-[#3a3a3a] transition duration-300">
                {users.slice(0, 3).map((user) => (
                  <tr key={user?._id}>
                    <td className="p-2">{user?.name}</td>
                    <td className="p-2">{user?.email}</td>
                    <td className="p-2">{user?.role}</td>
                    <td className="p-2">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleProfileView(user?.userId)}
                        className="bg-[#be9929] hover:bg-[#838025] text-white py-1 px-4 rounded mr-2"
                      >
                        View Profile
                      </button>
                    </td>
                    <td className="p-2">
                      <button
                        className="bg-[#854951] hover:bg-[#A15D66] text-white py-1 px-4 rounded mr-2"
                        onClick={() => handleSuspend(user?.userId)}
                      >
                        {user.isSuspended ? "Unsuspend" : "Suspend"}
                      </button>
                    </td>
                    <td className="p-2">
                      <button
                        className="bg-[#cf2c2c] hover:bg-[#aa2a2a] text-white py-1 px-4 rounded"
                        onClick={() => handleDelete(user?.userId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} profile={profile} />
      </div>
    </div>
  );
};

export default DashboardAdmin;