// import React from "react";
// import { Link } from "react-router-dom";
// import { BsFillMenuButtonWideFill } from "react-icons/bs";
// import { IoMoonSharp } from "react-icons/io5";
// import { ImBrightnessContrast } from "react-icons/im";
// import { FiBell } from "react-icons/fi"; // For Notifications Icon
// import { getSubscriptionStatus } from "../../redux/features/paymentSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// export default function Header({
//   dark,
//   toggleSideMenu,
//   toggleTheme,
//   profileImage,
//   onMenuClick,
//   profile,
// }) {

//   const dispatch = useDispatch();

//   // Access subscriptionStatus from Redux
//   const { subscriptionStatus } = useSelector((state) => state.payment);

//   // Fetch subscription status when component mounts
//   useEffect(() => {
//     const userId = profile?.userId || localStorage.getItem("userId");
//     if (userId) {
//       dispatch(getSubscriptionStatus(userId));
//     }
//   }, [dispatch, profile?.userId]);

//   return (
//     <header className={`z-10 py-4`}>
//       <div className="container flex items-center justify-between h-full px-6 mx-auto text-white dark:text-white">
//         {/* Menu Button */}
//         <button
//           className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-white"
//           onClick={toggleSideMenu}
//           aria-label="Menu"
//         >
//           <BsFillMenuButtonWideFill />
//         </button>

//         {/* Right-side Buttons */}
//         <div className="flex items-center space-x-4 ml-auto">
//           {/* <Link to="/paymentform">
//       <button
//         className="px-4 py-2 text-white bg-[#854951] hover:bg-[#994b55] rounded-full focus:outline-none"
//         aria-label="Subscribe"
//       >
//         Subscribe
//       </button>
//       </Link> */}

//          {/* Subscription Status Badge */}
//           {profile?.userId && (
//             subscriptionStatus?.isActive ? (
//               <div className="px-4 py-2 bg-[#854951] text-white rounded-full text-sm">
//                 Subscription Active
//               </div>
//             ) : (
//               <div className="px-4 py-2 bg-red-600 text-white rounded-full text-sm">
//                 Subscription Not Active
//               </div>
//             )
//           )}

//           {/* Dark Mode Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-1 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
//             aria-label="Toggle Dark Mode"
//           >
//             {dark ? (
//               <ImBrightnessContrast className="text-[#C9B796]" />
//             ) : (
//               <IoMoonSharp className="text-[#C9B796]" />
//             )}
//           </button>

//           {/* Notifications Icon */}
//           <button
//             className="p-1 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
//             aria-label="Notifications"
//           >
//             <FiBell className="text-[#C9B796]" />
//           </button>

//           {/* Profile Image */}
//           <Link>
//             <div
//               className="flex flex-row justify-center items-center"
//               onClick={() => onMenuClick("userProfile")}
//             >
//               <p className="me-2">
//                 {profile?.username ? profile?.username : "username"}
//               </p>
//               <img
//                 src={
//                   profile?.profileImage
//                     ? `${process.env.REACT_APP_BACKEND}/${profile?.profileImage}`
//                     : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
//                 }
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
//               />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMoonSharp } from "react-icons/io5";
import { ImBrightnessContrast } from "react-icons/im";
import { FiBell } from "react-icons/fi";
import { getSubscriptionStatus } from "../../redux/features/paymentSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Header({
  dark,
  toggleSideMenu,
  toggleTheme,
  profileImage,
  onMenuClick,
  profile,
}) {
  const dispatch = useDispatch();
  const { subscriptionStatus } = useSelector((state) => state.payment);

  useEffect(() => {
    const userId = profile?.userId || localStorage.getItem("userId");
    if (userId) {
      dispatch(getSubscriptionStatus(userId));
    }
  }, [dispatch, profile?.userId]);

  return (
    <header className="z-10 py-3 bg-transparent">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 text-white">
        {/* Left - Menu Icon */}
        <button
          className="p-2 rounded-md md:hidden focus:outline-none"
          onClick={toggleSideMenu}
          aria-label="Menu"
        >
          <BsFillMenuButtonWideFill size={20} />
        </button>

        {/* Right - Actions and Profile */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 ml-auto">
          {/* Subscription Badge */}
          {profile?.userId && (
            <div
              className={`text-sm px-3 py-1 rounded-full ${
                subscriptionStatus?.isActive ? "bg-[#854951]" : "bg-gray-500"
              } text-white whitespace-nowrap`}
            >
              {subscriptionStatus?.isActive
                ? "Subscription Active"
                : "No Subscription"}
            </div>
          )}

          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
          >
            {dark ? (
              <ImBrightnessContrast className="text-[#C9B796]" />
            ) : (
              <IoMoonSharp className="text-[#C9B796]" />
            )}
          </button>

          {/* Notification Button */}
          <button
            className="p-2 rounded-full focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700"
            aria-label="Notifications"
          >
            <FiBell className="text-[#C9B796]" />
          </button>

          {/* Profile */}
          <Link>
            <div
              className="flex items-center gap-2 max-w-[150px] truncate"
              onClick={() => onMenuClick("userProfile")}
            >
              <p className="truncate text-sm">
                {profile?.username || "username"}
              </p>
              <img
                src={
                  profile?.profileImage
                    ? `${process.env.REACT_APP_BACKEND}/${profile?.profileImage}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
