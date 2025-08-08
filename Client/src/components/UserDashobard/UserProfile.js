import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaCity,
  FaGamepad,
  FaPhone,
  FaMapMarkedAlt,
} from "react-icons/fa";
import styles from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  createProfile,
  getProfile,
  fetchUserBadge
} from "../../redux/features/userSlice";
import {
  fetchUserRank
} from "../../redux/features/rankingSlice";
import Loading from "../../utils/Loading/Loading";
import RankInfo from "./RankInfo";
const apiUrl = process.env.REACT_APP_BACKEND;

const UserProfile = ({ dark, profile }) => {
  const { loading } = useSelector((state) => state.profile);
  const { userrank } = useSelector((state) => state.ranking);
  const { badge } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.UserId;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBadge(userId));
    }
  }, [dispatch, userId]);

  const [profileData, setProfileData] = useState({
    userId: userId,
    profileImage: null,
    username: "",
    fullName: "",
    bio: "",
    email: "",
    phoneNumber: "",
    address: "",
    age: "",
    locationCity: "",
    locationCountry: "",
    favoriteGames: [], // Changed this to an array
  });
  const [profileImageView, setProfileImageView] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null); // Track initial profile data
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(""); // For displaying the message

  const [newGame, setNewGame] = useState(""); // Input field for new game

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId)); // Fetch the profile if userId exists
      dispatch(fetchUserRank(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Update profileData when profile state changes
    if (profile) {
      setProfileData((prevState) => ({
        ...prevState,
        ...profile,
        profileImage: profile.profileImage || prevState.profileImage, // Keep the current image if not provided
      }));

      setInitialProfileData(profile); // Set the initial profile data
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profileImage: URL.createObjectURL(file) });
    setSelectedFile(file);
    const profileImage = URL.createObjectURL(file);
    setProfileImageView(profileImage);
  };

  const handleGameChange = (e) => {
    setNewGame(e.target.value);
  };

  const handleCreate = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profileImage", selectedFile); // Append profileImage if there's a new file
    }
    formData.append("userId", profileData.userId);
    formData.append("username", profileData.username);
    formData.append("fullName", profileData.fullName);
    formData.append("bio", profileData.bio);
    formData.append("email", profileData.email);
    formData.append("locationCity", profileData.locationCity);
    formData.append("locationCountry", profileData.locationCountry);
    formData.append("phoneNumber", profileData.phoneNumber);
    formData.append("address", profileData.address);
    formData.append("age", profileData.age);
    // formData.append("favoriteGames", profileData.favoriteGames);
    formData.append("favoriteGames", JSON.stringify(profileData.favoriteGames));

    dispatch(createProfile(formData)).then(() => {
      dispatch(getProfile(userId)); // Re-fetch the profile after creating it
    });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profileImage", selectedFile); // Append profileImage if there's a new file
    }
    formData.append("userId", profileData.userId);
    formData.append("username", profileData.username);
    formData.append("fullName", profileData.fullName);
    formData.append("bio", profileData.bio);
    formData.append("email", profileData.email);
    formData.append("locationCity", profileData.locationCity);
    formData.append("locationCountry", profileData.locationCountry);
    formData.append("phoneNumber", profileData.phoneNumber);
    formData.append("address", profileData.address);
    formData.append("age", profileData.age);
    // formData.append("favoriteGames", profileData.favoriteGames);
    formData.append("favoriteGames", JSON.stringify(profileData.favoriteGames));

    dispatch(updateProfile({ userId: profileData.userId, formData })).then(
      () => {
        dispatch(getProfile(userId)); // Re-fetch the profile after updating it
      }
    );
  };

  const isProfileChanged = () => {
    return (
      initialProfileData?.username !== profileData.username ||
      initialProfileData?.fullName !== profileData.fullName ||
      initialProfileData?.bio !== profileData.bio ||
      initialProfileData?.email !== profileData.email ||
      initialProfileData?.phoneNumber !== profileData.phoneNumber ||
      initialProfileData?.address !== profileData.address ||
      initialProfileData?.age !== profileData.age ||
      initialProfileData?.favoriteGames !== profileData.favoriteGames ||
      initialProfileData?.locationCity !== profileData.locationCity ||
      initialProfileData?.locationCountry !== profileData.locationCountry ||
      initialProfileData?.profileImage !== profileData.profileImage
    );
  };

  const handleProfileUpdateClick = () => {
    if (!isProfileChanged()) {
      setMessage("No changes detected. Please modify some fields to update.");
    } else {
      setMessage(""); // Reset message
      handleUpdate();
    }
  };

  const handleAddGame = () => {
    if (newGame.trim() !== "" && !profileData.favoriteGames.includes(newGame)) {
      setProfileData((prevProfile) => ({
        ...prevProfile,
        favoriteGames: [...prevProfile.favoriteGames, newGame.trim()],
      }));
      setNewGame(""); // Clear input field after adding
    }
  };

  const handleRemoveGame = (gameToRemove) => {
    setProfileData((prevProfile) => ({
      ...prevProfile,
      favoriteGames: prevProfile.favoriteGames.filter(
        (game) => game !== gameToRemove
      ),
    }));
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="p-4">
      <div className="bg-gradient-to-r from-[#D19F43] via-[#B2945C] via-[#C9B796] via-[#B39867] via-[#D4AD66] to-[#D19F43] p-0 shadow-lg mb-6 relative h-48 rounded-t-xl">
  {/* Xephra Id Display */}
  <div className="absolute top-2 right-2 sm:top-3 sm:right-6 font-montserrat text-white text-xs sm:text-sm font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.6)] bg-black/20 rounded-md px-2 py-1 sm:px-3">
    Xephra Id: {userId || "NA"}
  </div>
  
  {/* Rank Display */}
  <div className="absolute top-8 right-2 sm:top-12 sm:right-6 font-montserrat text-white text-xs sm:text-xl font-semibold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] bg-black/10 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
    🏆 Rank: {userrank || "NA"}
  </div>
  
  {/* Rank Tiers Display */}
  <div className="absolute top-14 right-2 sm:top-24 sm:right-6 font-montserrat text-white text-xs sm:text-xl font-semibold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] bg-black/10 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
    ⭐ Rank Tiers: {badge || "NA"}
  </div>
  
  <div className="absolute top-20 right-2 sm:top-36 sm:right-6">
    <RankInfo />
  </div>

  {/* Profile Image Container */}
  <div className="absolute -bottom-12 left-3 sm:-bottom-20 sm:left-10">
    {/* Camera Icon */}
    <label
        htmlFor="profileImage"
        className="z-40 absolute top-0 left-0 bg-[#3028259b] rounded-full p-1.5 sm:p-3 text-white hover:bg-gray-700 transition cursor-pointer"
      >
         <FaCamera className="relative w-3 h-3 sm:w-6 sm:h-6 text-white" />
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </label>
 
    <div className="relative w-24 h-24 sm:w-44 sm:h-44 rounded-full bg-[#000000A1] border-4 sm:border-[13px] border-[#0000005e] overflow-hidden">
      <img
        src={
          profileImageView
            ? profileImageView
            : profileData?.profileImage
            ? `${apiUrl}/${profileData.profileImage}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
        }
        alt="Profile"
        className="w-full h-full object-cover"
      />
      
    </div>
  </div>

  {/* Username and Bio */}
  <div className="absolute bottom-6 left-28 sm:-bottom-0 sm:left-56 text-sm sm:text-2xl font-[Montserrat]">
    <label className="text-[#622D37] text-sm sm:text-3xl font-semibold">{profileData.username}</label>
  </div>
  <div className="absolute bottom-1 left-28 sm:top-48 sm:left-[14.2rem] max-w-[50%] sm:max-w-none">
    <label className="font-[500] text-[#FFFFFF] text-xs sm:text-xl">{profileData.bio}</label>
  </div>
</div>


        <div className={styles.profileForm}>
          <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 mt-8 sm:mt-[4.25rem] px-4 sm:ml-4">
            {/* Username */}
            <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
              <label className="text-[#D4AD66] flex items-center gap-2 font-montserrat text-sm sm:text-base">
                <FaUser /> Username
              </label>
              <input
                type="text"
                name="username"
                value={profileData?.username || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>

            {/* Full Name */}
            <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
              <label className="text-[#D4AD66] flex items-center gap-2 font-montserrat text-sm sm:text-base" >
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profileData?.fullName || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>
          </div>
          
          <div className="px-4 sm:ml-4 mt-4">
            <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
              <FaEnvelope /> Bio/About
            </label>
            <textarea
              name="bio"
              value={profileData?.bio || ""}
              onChange={handleChange}
              className={`${styles.userProfiletextarea} p-2 rounded h-24 sm:h-32 w-full mt-2 text-sm sm:text-base`}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 px-4 sm:ml-4 mt-4">
            {/* Email */}
            <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
              <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData?.email || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
              <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
                <FaPhone /> Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={profileData?.phoneNumber || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 px-4 sm:ml-4 mt-4">
            <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
              <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
                <FaMapMarkedAlt /> Address
              </label>
              <input
                type="text"
                name="address"
                value={profileData?.address || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>

            {/* Age Field */}
            <div className="grid grid-cols-1 w-full lg:w-90 gap-2">
              <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
                <FaCalendarAlt /> Age
              </label>
              <input
                type="number"
                name="age"
                value={profileData?.age || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 px-4 sm:ml-4 mt-4">
            {/* City Field */}
            <div className="grid grid-cols-1 w-full lg:w-90 gap-2">
              <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
                <FaCity /> City
              </label>
              <input
                type="text"
                name="locationCity"
                value={profileData?.locationCity || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>

            {/* Country Field */}
            <div className="grid grid-cols-1 w-full lg:w-90 gap-2">
              <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
                <FaCity /> Country
              </label>
              <input
                type="text"
                name="locationCountry"
                value={profileData?.locationCountry || ""}
                onChange={handleChange}
                className={`${styles.userProfileInput} p-2 rounded w-full text-sm sm:text-base`}
              />
            </div>
          </div>

          <div className="px-4 sm:ml-4 mt-4">
            <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
              <FaGamepad /> Favourite Games
            </label>
            <div className="flex flex-col space-y-2 mt-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGame}
                  onChange={handleGameChange}
                  className={`${styles.userProfileInput} p-2 rounded flex-1 text-sm sm:text-base`}
                />

                <button
                  type="button"
                  onClick={handleAddGame}
                  className={`p-2 text-white rounded text-sm sm:text-base px-3 sm:px-4 ${
                    dark
                      ? "bg-[#302B27] hover:bg-[#49413C]"
                      : "bg-[#854951] hover:bg-[rgb(161,93,102)]"
                  }`}
                >
                  Add Game
                </button>
              </div>

              <ol className="list-decimal space-y-1">
                {profileData.favoriteGames.length > 0 ? (
                  profileData.favoriteGames.map((game, index) => (
                    <li key={index} className="flex items-center ml-2">
                      <span className="text-[#B6A99A] text-sm sm:text-md font-bold bg-[#00000070] rounded-lg px-3 py-2 sm:px-4">
                        {game}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGame(game)}
                        className="text-red-500 hover:text-red-700 font-bold ml-2 sm:ml-4 text-sm sm:text-base"
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm sm:text-base">No favorite games added yet.</p>
                )}
              </ol>
            </div>
          </div>

          {/* Show message if no changes are detected */}
          {message && <div className={`${styles.message} text-sm sm:text-base mx-4`}>{message}</div>}
          <div className="flex justify-center items-center w-full mt-6 px-4">
          {/* Conditionally render the button */}
          {profile ? (
            <button
              className={`text-[#C9B796] rounded-md font-bold border-[#C9B796] border-[1px] px-8 py-2 sm:px-14 sm:py-3 text-sm sm:text-base ${
                dark
                  ? "bg-[#302B27] hover:bg-[#49413C]"
                  : "bg-[#302B27] hover:bg-[#A15D66]"
              }`}
              onClick={handleProfileUpdateClick} // Handle update button click
            >
              Update
            </button>
          ) : (
            <button
              className={`text-[#C9B796] rounded-md font-bold border-[#C9B796] border-[1px] px-8 py-2 sm:px-14 sm:py-3 text-sm sm:text-base ${
                dark
                  ? "bg-[#302B27] hover:bg-[#49413C]"
                  : "bg-[#302B27] hover:bg-[#A15D66]"
              }`}
              onClick={handleCreate} // Create the profile if it doesn't exist
            >
              Create Profile
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
