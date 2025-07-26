import React from "react";
import { Link } from "react-router-dom";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMoonSharp } from "react-icons/io5";
import { ImBrightnessContrast } from "react-icons/im";
import { FiBell } from "react-icons/fi"; // For Notifications Icon
import { useDispatch, useSelector } from "react-redux";

export default function Header({
  dark,
  toggleSideMenu,
  toggleTheme,
  profileImage,
  onMenuClick, 
  profile,
}) {


  return (
    <header className={`z-10 py-4`}>
         <div className="container flex items-center justify-between h-full px-6 mx-auto text-white dark:text-white">
           {/* Menu Button */}
           <button
             className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-white"
             onClick={toggleSideMenu}
             aria-label="Menu"
           >
             <BsFillMenuButtonWideFill />
           </button>
   
           {/* Right-side Buttons */}
           <div className="flex items-center space-x-4 ml-auto">
             {/* Dark Mode Toggle */}
             <button
               onClick={toggleTheme}
               className="p-1 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
               aria-label="Toggle Dark Mode"
             >
               {dark ? (
                 <ImBrightnessContrast className="text-[#C9B796]" />
               ) : (
                 <IoMoonSharp className="text-[#C9B796]" />
               )}
             </button>
   
             {/* Notifications Icon */}
             <button
               className="p-1 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
               aria-label="Notifications"
             >
               <FiBell className="text-[#C9B796]" />
             </button>
   
             {/* Profile Image */}
             <Link>
               <div
                 className="flex flex-row justify-center items-center"
                 onClick={() => onMenuClick("adminProfile")}
               >
                 <p className="me-2">
                   {profile?.username ? profile?.username : "username"}
                 </p>
                 <img
                   src={
                     profile?.profileImage
                       ? `http://localhost:5000/${profile?.profileImage}`
                       : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
                   }
                   alt="Profile"
                   className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
                 />
               </div>
             </Link>
           </div>
         </div>
       </header>
  );
}
