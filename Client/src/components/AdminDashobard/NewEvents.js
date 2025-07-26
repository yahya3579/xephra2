import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEvent } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const NewEvents = ({ setActiveMenu, dark }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.events);
  const [formData, setFormData] = useState({
    title: "",
    game: "",
    date: "",
    time: "",
    description: "",
    image: null,
    prizePool: "",
    rules: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("game", formData.game);
    formDataToSubmit.append("date", formData.date);
    formDataToSubmit.append("time", formData.time);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("prizePool", formData.prizePool);
    formDataToSubmit.append("rules", formData.rules);
    formDataToSubmit.append("image", formData.image);

    // Get adminId from localStorage
    const adminData = JSON.parse(localStorage.getItem("user"));
    const adminId = adminData?.UserId;
    
    // Append adminId to FormData
    if (adminId) {
        formDataToSubmit.append("adminId", adminId);
    }

    dispatch(createEvent(formDataToSubmit));
    setFormData({
      title: "",
      game: "",
      date: "",
      time: "",
      description: "",
      image: null,
      prizePool: "",
      rules: "",
    });

    // setActiveMenu("postedEvents");
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`mx-auto py-10 px-4 rounded-lg shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm ${
        dark
          ? "bg-[#492f3418] bg-opacity-[.06]":"bg-[#232122]"}`}
    >
      <h2 className="text-[48px] font-bold text-[#b6a99a] mb-6 text-center drop-shadow-[2px_2px_3px_rgba(0,0,0,0.7)] bg-gradient-to-r from-[#e5b967] via-[#d1a759] to-[#f9f9f9] bg-clip-text text-transparent">
        Create New Tournament
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-[#D4AD66] ml-1 pb-2 ">
              Tournament Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#00000082] text-white p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#D4AD66] ml-1 pb-2">Game</label>
            <input
              type="text"
              name="game"
              value={formData.game}
              onChange={handleChange}
              className="p-2 rounded-md bg-[#00000082] text-white"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-[#D4AD66] ml-1 pb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 rounded-md bg-[#00000082] text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#D4AD66] ml-1 pb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="p-2 rounded-md bg-[#00000082] text-white"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-[#D4AD66] ml-1 pb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 rounded-md bg-[#00000082] text-white"
            rows="4"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[#D4AD66] ml-1 pb-2">Rules</label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            className="p-2 rounded-md bg-[#00000082] text-white"
            rows="2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-[#D4AD66] ml-1 pb-2">Prize Pool</label>
            <input
              type="text"
              name="prizePool"
              value={formData.prizePool}
              onChange={handleChange}
              className="p-2 rounded-md bg-[#00000082] text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#D4AD66] ml-1 pb-2">Image Upload</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="p-[5px] rounded-md bg-[#00000082] text-white"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className={`text-[#C9B796] px-10 py-3 rounded-md transition ${
              dark
                ? "bg-[#302B27] border-[1px] border-[#C9B796] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:text-black"
                : "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] border-[1px] border-[#C9B796] text-black hover:bg-[#A15D66]"
            } `}
          >
            Create Event
          </button>
        </div>
        {error && <p className="text-red-500">{error?.error}</p>}
      </form>
    </div>
  );
};

export default NewEvents;
