import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera, FaUser, FaEnvelope, FaCity } from "react-icons/fa";
import styles from "./AdminProfile.module.css";
import {
  updateProfile,
  createProfile,
  getProfile,
} from "../../redux/features/profileSlice";
import Loading from "../../utils/Loading/Loading";
const apiUrl = process.env.REACT_APP_BACKEND;

const AdminProfile = ({ dark, profile }) => {
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.UserId;

  const [profileData, setProfileData] = useState({
    userId: userId,
    profileImage: null,
    username: "",
    fullName: "",
    bio: "",
    email: "",
    locationCity: "",
    locationCountry: "",
    phoneNumber: "",
    address: "",
  });
  const [profileImageView, setProfileImageView] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null); // Track initial profile data
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(""); // For displaying the message

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId)); // Fetch the profile if userId exists
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

    dispatch(createProfile(formData)).then(() => {
      dispatch(getProfile(userId)); // Re-fetch the profile after creating it
    });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    console.log("selected file", selectedFile);
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

  if (loading) return <Loading />;
  console.log("profileData", profileData);
  return (
    <div
    className="p-2 sm:p-4"
      // className={`${styles.userProfile} ${
      //   dark ? "bg-[#69363F]" : "bg-[#232122]"
      // }`}
    >
       <div className="bg-gradient-to-r from-[#D19F43] via-[#B2945C] via-[#C9B796] via-[#B39867] via-[#D4AD66] to-[#D19F43] p-0 shadow-lg mb-6 relative h-48 rounded-t-xl">
        {/* Rank Display */}
        {/* <div className="absolute top-4 right-6 font-montserrat text-white text-3xl font-semibold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          Rank: {profileData.rank || 73}
        </div> */}
      
        {/* Profile Image Container */}
        <div className="absolute -bottom-20 left-4 sm:left-6 lg:left-10">
          {/* Camera Icon */}
          <label
              htmlFor="profileImage"
              className="z-40 absolute top-0 left-0 bg-[#3028259b] rounded-full p-3 text-white hover:bg-gray-700 transition cursor-pointer"
            >
               <FaCamera className="relative w-6 h-6 text-white" />
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
       
          <div className="relative w-44 h-44 rounded-full bg-[#000000A1] border-[13px] border-[#0000005e] overflow-hidden">
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
          
        {/* <div className="flex flex-col gap-4">
              <label className=" text-[#D4AD66] text-3xl ml-10">{profileData.username}</label>
              <label className="text-[#D4AD66] text-xl ml-10">{profileData.bio}</label>
            </div> */}
      </div>
      <div className="absolute -bottom-0 left-48 sm:left-52 md:left-56 text-2xl font-[Montserrat]">
    <label className="text-[#622D37] text-2xl sm:text-3xl font-semibold">{profileData.username}</label>
  </div>
  <div className="absolute top-48 left-48 sm:left-52 md:left-[14.2rem]">
    <label className="font-[500] text-[#FFFFFF] text-lg sm:text-xl">{profileData.bio}</label>
  </div>
      </div>

      <div className={styles.profileForm}>
        <div className="grid grid-cols-1 lg:flex lg:justify-between gap-3 sm:gap-5 mt-12 sm:mt-14 px-2 sm:px-4">
          {/* Username */}
          <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
            <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
              <FaUser /> Username
            </label>
            <input
              type="text"
              name="username"
              value={profileData?.username || ""}
              onChange={handleChange}
              className={`${styles.userProfileInput} p-2 rounded flex-1 text-sm sm:text-base`}
            />
          </div>

          {/* Full Name */}
          <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
            <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profileData?.fullName || ""}
              onChange={handleChange}
              className={`${styles.userProfileInput} p-2 rounded flex-1 text-sm sm:text-base`}
            />
          </div>
        </div>

        <div className="px-2 sm:px-4 mt-3 sm:mt-4">
          <label className="text-[#D4AD66] text-sm sm:text-base">
            <FaEnvelope /> Bio/About
          </label>
          <textarea
            name="bio"
            value={profileData?.bio || ""}
            onChange={handleChange}
            className={`${styles.userProfileInput} p-2 rounded w-full mt-2 text-sm sm:text-base`}
            rows="3"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 lg:flex lg:justify-between gap-3 sm:gap-5 px-2 sm:px-4 mt-3 sm:mt-4">
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
              className={`${styles.userProfileInput} p-2 rounded flex-1 text-sm sm:text-base`}
            />
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
            <label className="text-[#D4AD66] flex items-center gap-2 text-sm sm:text-base">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData?.phoneNumber || ""}
              onChange={handleChange}
              className={`${styles.userProfileInput} p-2 rounded flex-1 text-sm sm:text-base`}
            />
          </div>
        </div>

        {/* Address Info */}

        <div className="grid grid-cols-1 lg:flex lg:justify-between gap-3 sm:gap-5 px-2 sm:px-4 mt-3 sm:mt-4">
          {/* City */}
          <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
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

          {/* Country */}
          <div className="grid grid-cols-1 gap-2 w-full lg:w-90">
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

        <div className="px-2 sm:px-4 mt-3 sm:mt-4">
          <label className="text-[#D4AD66] text-sm sm:text-base">Address</label>
          <input
            type="text"
            name="address"
            value={profileData?.address || ""}
            onChange={handleChange}
            className={`${styles.userProfileInput} p-2 rounded w-full mt-2 text-sm sm:text-base`}
          />
        </div>

       
        {/* Show message if no changes are detected */}
        {message && <div className={`${styles.message} px-2 sm:px-4 text-center mt-4`}>{message}</div>}

        {/* Conditionally render the button */}
        <div className="flex justify-center items-center w-full px-2 sm:px-4 mt-6">
        {profile ? (
          <button
          className={`font-[Poppins] text-[#C9B796] rounded-md font-bold border-[#C9B796] border-[1px] px-8 sm:px-12 lg:px-14 py-2 sm:py-3 text-sm sm:text-base ${
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
             className={`text-[#C9B796] rounded-md font-bold border-[#C9B796] border-[1px] px-8 sm:px-12 lg:px-14 py-2 sm:py-3 font-[Poppins] text-sm sm:text-base ${
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
  );
};

export default AdminProfile;
