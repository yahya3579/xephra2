import React, { useState } from "react";
import { Search, User, Bell } from "lucide-react";
import logo from "../assets/xephra logo-01.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMoonSharp } from "react-icons/io5";
import { ImBrightnessContrast } from "react-icons/im";
import GamesCardsV2 from "../components/HomePageComponents/GamesCardsV2";
import UpcomingTournaments from "../components/HomePageComponents/UpcomingTournaments";
import PricesV2 from "../components/HomePageComponents/PricesV2";
import Footer from "../components/HomePageComponents/Footer";
import { logout } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Bg1 from "../assets/homepage/homebg1.webp";
import Bg2 from "../assets/homepage/homebg2.webp";
import Bg3 from "../assets/homepage/homebg3.webp";
import Bg4 from "../assets/homepage/homebg4.webp";
import Bg5 from "../assets/homepage/homebg5.webp";

const HomeV2 = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [dark, setDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
    const dispatch = useDispatch();

  const toggleTheme = () => setDark(!dark);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle navigation and scrolling
  const handleNavClick = (item) => {
    setActiveNav(item);
    setIsMenuOpen(false); // Close mobile menu if open

    // Scroll to respective sections
    const sectionMap = {
      Home: "hero-section",
      Games: "games-section",
      Tournaments: "tournaments-section",
      Prices: "prices-section",
      Footer: "footer-section",
    };

    const sectionId = sectionMap[item];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const navItems = ["Home", "Games", "Tournaments", "Prices"];

  const logoutSubmit = () => {
      dispatch(logout());
      navigate("/login");
    };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background with character silhouettes */}
      <div className="absolute inset-0">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-orange-600/20"></div>

        {/* Character silhouettes */}
        <div className="absolute top-0 right-0 w-full h-full">
          {/* Main character silhouette - right side */}
          <div className="absolute top-10 right-10 w-80 h-96 opacity-60">
            <div className="w-full h-full bg-gradient-to-b from-gray-800/80 via-gray-700/60 to-transparent rounded-lg transform rotate-3"></div>
            <div className="absolute top-8 right-4 w-16 h-24 bg-orange-500/40 rounded-full blur-sm"></div>
            <div className="absolute top-20 right-8 w-12 h-20 bg-blue-400/30 rounded-lg blur-sm"></div>
          </div>

          {/* Secondary characters */}
          <div className="absolute top-16 right-40 w-48 h-64 opacity-40">
            <div className="w-full h-full bg-gradient-to-b from-gray-600/60 via-gray-500/40 to-transparent rounded-lg transform -rotate-2"></div>
          </div>

          <div className="absolute top-8 right-80 w-32 h-48 opacity-30">
            <div className="w-full h-full bg-gradient-to-b from-gray-500/50 via-gray-400/30 to-transparent rounded-lg transform rotate-1"></div>
          </div>
        </div>

        {/* Left side character silhouettes */}
        <div className="absolute top-20 left-0 w-64 h-80 opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-gray-600/40 via-gray-500/20 to-transparent rounded-lg transform -rotate-6"></div>
        </div>
      </div>

      {/* Header - Responsive for screens below 450px */}
      <header className="relative z-20 px-4 sm:px-8 py-2 sm:py-4 bg-[#292622c4] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo (Left) - Smaller on mobile */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="XEPHRA Logo"
              className="h-8 w-24 sm:h-12 sm:w-40"
            />
          </Link>

          {/* Nav (Center) - Hidden on very small screens */}
          <nav className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`block font-montserrat font-semibold transition-colors duration-200 ${
                  activeNav === item
                    ? "text-white"
                    : "text-[#D4AD66] hover:text-[#f0cc88]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right Icons and Username - Compact on mobile */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Dark Mode Toggle - Smaller on mobile */}
            <button
              onClick={toggleTheme}
              className="p-1 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle Dark Mode"
            >
              {dark ? (
                <ImBrightnessContrast className="text-[#C9B796] w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <IoMoonSharp className="text-[#C9B796] w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <div className="flex md:order-2 space-x-2 sm:space-x-3 lg:space-x-2 rtl:space-x-reverse">

              {isAuthenticated ? (
                <>
                  {user && user.role === "admin" ? (
                    <Link
                      to="/dashboard"
                      type="button"
                      className="text-white font-montserrat bg-[#b7a692] hover:bg-[#b9ac9b] focus:outline-none font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-2 text-center flex items-center justify-center dark:bg-[#b7a692] dark:bg-[#b7a692]-700 dark:focus:bg-[#b7a692]"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/userdashboard"
                      type="button"
                      className="text-white font-montserrat bg-[#b7a692] hover:bg-[#b9ac9b] focus:outline-none font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-2 text-center flex items-center justify-center dark:bg-[#b7a692] dark:bg-[#b7a692]-700 dark:focus:bg-[#b7a692]"
                    >
                      Dashboard
                    </Link>
                  )}
                  {/* Logout Button - Only show on sm and up */}
                  <button
                    onClick={logoutSubmit}
                    type="button"
                    className="ml-2 text-white font-montserrat bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-2 text-center flex items-center justify-center dark:bg-red-500 dark:hover:bg-red-600 hidden sm:flex"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    type="button"
                    className="text-white font-montserrat bg-[#b7a692] hover:bg-[#b9ac9b] focus:outline-none font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-2 text-center flex items-center justify-center dark:bg-[#b7a692] dark:bg-[#b7a692]-700 dark:focus:bg-[#b7a692]"
                  >
                    Get started
                  </Link>
                </>
              )}

              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-1 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden z-30 bg-[#292622c4] backdrop-blur-sm px-4 sm:px-8 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`block w-full text-left font-montserrat font-semibold text-base sm:text-lg transition-colors duration-200 ${
                activeNav === item
                  ? "text-white"
                  : "text-[#D4AD66] hover:text-[#f0cc88]"
              }`}
            >
              {item}
            </button>
          ))}
          {/* Logout Button in mobile nav */}
          {isAuthenticated && (
            <button
              onClick={logoutSubmit}
              type="button"
              className="block w-full text-left font-montserrat font-semibold text-base text-red-500 hover:text-red-600 transition-colors duration-200 sm:hidden"
            >
              Logout
            </button>
          )}
        </nav>
      )}

      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative z-10 w-full bg-no-repeat bg-cover bg-center px-4 sm:px-8 pt-8 md:pt-20 sm:pt-16 pb-8 md:pb-20"
        style={{
          backgroundImage: `url(${Bg1})`,
        }}
      >
        {/* Gradient Overlay (same as page background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-orange-600/20 z-0"></div>

        <div className="max-w-6xl">
          <div className="mb-4 sm:mb-6">
            <span className="font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">
              #1 Gaming Arena
            </span>
          </div>

          <div className="space-y-2 mb-8 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-none">
              <span className="font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] mb-2 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">
                Where Gamers
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-none">
              <span className="font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] mb-2 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">
                Compete For Glory
              </span>
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-none text-[#AC5867] mt-4">
              Enter The Tournament
            </h3>
            <h4 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-none text-[#AC5867]">
              Arena
            </h4>
          </div>
        </div>
      </section>

      <div
        id="games-section"
        className="relative z-10 w-full bg-no-repeat bg-cover bg-center px-2 sm:px-2 pt-2 sm:pt-4 pb-2"
        style={{
          backgroundImage: `url(${Bg4})`,
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-orange-600/20 z-0"></div> */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-purple-700/40 z-0"></div>

        <div className="relative z-10">
          <GamesCardsV2 dark={dark} />
        </div>
      </div>

      <div
        id="tournaments-section"
        className="relative z-10 w-full bg-no-repeat bg-cover bg-center px-2 sm:px-2 pt-2 sm:pt-4 pb-2"
        style={{
          backgroundImage: `url(${Bg5})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-purple-700/40 z-0"></div>

        <div className="relative z-10">
          <UpcomingTournaments dark={dark} />
        </div>
      </div>

      <div
        id="prices-section"
        className="relative z-10 w-full bg-no-repeat bg-cover bg-center px-2 sm:px-2 pt-2 sm:pt-4 pb-2"
        style={{
          backgroundImage: `url(${Bg2})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-purple-700/40 z-0"></div>

        <div className="relative z-10">
          <PricesV2 dark={dark} />
        </div>
      </div>

      {/* Footer */}
      <div id="footer-section">
        <Footer handleNavClick={handleNavClick} />
      </div>
    </div>
  );
};

export default HomeV2;
