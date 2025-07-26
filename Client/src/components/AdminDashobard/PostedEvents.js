import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { useSelector, useDispatch } from "react-redux";
import { getEvents, deleteEventById , editEvent} from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const PostedEvents = ({ setActiveMenu, dark }) => {
  const dispatch = useDispatch();
  const { loading, error, events, message, event } = useSelector(
    (state) => state.events
  );
  const isAdmin = true;

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch , event]);



  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const changeMenu = () => {
    setActiveMenu("newEvents");
  };

  const DeleteEvent = (id) => {
    dispatch(deleteEventById(id));
  };

  const onEdit = (tournament) => {
    setSelectedTournament(tournament);
    setShowEditModal(true);
  };

  const saveEdit = (updatedTournament) => {
    const id = updatedTournament._id;
    dispatch(editEvent({id, updatedData :updatedTournament}));
    console.log("here edit", updatedTournament);
    setShowEditModal(false);
    setSelectedTournament(null);
  };
  if (loading) {
    return <Loading />;
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const TournamentCard = ({
    _id,
    title,
    game,
    date,
    time,
    description,
    image,
    prizePool,
    rules,
    // onDelete,
    onEdit,
  }) => {
    const imageUrl = `${process.env.REACT_APP_BACKEND}/${image}`;

    return (
      <div className="bg-[#000000] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        <Link to={`/eventadmin/${_id}`} className="relative block w-full">
          <img
            className="w-full h-56 object-cover"
            src={imageUrl}
            alt={title}
          />
           <h3 className="drop-shadow-2xl absolute bottom-0 left-0 w-[55%] text-2xl font-bold text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] px-4 py-2">{title}</h3>
        </Link>
        <div className="p-4">
          <Link to={`/eventadmin/${_id}`}>         
          <p className="text-[#C9B796] text-lg font-bold mt-1">{game}</p>
          <p className="text-sm text-gray-400">
            <span className="bg-[#302A27] font-bold px-2 w-1/2">{date}</span> •<span className="bg-[#302A27] font-bold px-2 w-1/2">{time}</span> 
          </p>
          <p className="text-[#C9B796] mt-2  line-clamp-3">{description}</p>
          </Link>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-white">{prizePool}</span>
            {isAdmin && (
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    onEdit({
                      _id,
                      title,
                      game,
                      date,
                      time,
                      description,
                      image,
                      prizePool,
                      rules,
                    })
                  }
                  className="text-[#b8a896] hover:text-[#8f404f]"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => DeleteEvent(_id)}
                  className="text-[#b8a896] hover:text-[#8f404f]"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div
      className={`mx-auto pt-0 pb-10 px-4 rounded-lg min-h-full shadow-2xl shadow-gray-950 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)] backdrop-blur-sm bg-[#492f3418] bg-opacity-[.03] ${
        dark
          ? "":""}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent py-6 drop-shadow-[3px_3px_10px_rgba(0,0,0,0.6)]">
          POSTED EVENTS
        </h2>
        {isAdmin && (
          <Link onClick={changeMenu}>
            <button
              className={`flex items-center text-[#C9B796] px-2 sm:px-6 py-2 rounded-md transition text-sm sm:text-base ${
                dark
                  ? "bg-[#302B27] border-[1px] border-[#C9B796] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:text-black"
                  : "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] border-[1px] border-[#C9B796] text-black hover:bg-[#A15D66]"
              } `}
            >
              <FaPlus className="mr-2" /> New Event
            </button>
          </Link>
        )}
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.length === 0
          ? "No events posted yet"
          : sortedEvents?.map((tournament, index) => (
              <TournamentCard
                key={index}
                {...tournament}
                // onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
      </div>

      {/* {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-6 rounded-lg ${
              dark ? "bg-[#69363F]" : "bg-[#232122]"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-white">
              Confirm Deletion
            </h2>
            <p className="text-white">
              Are you sure you want to delete "{selectedTournament.title}"?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete(selectedTournament._id)}
                className={`px-4 py-2 text-white rounded ${
                  dark
                    ? "bg-[#302B27] hover:bg-[#49413C]"
                    : "bg-[#854951] hover:bg-[#A15D66]"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showEditModal && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div
         className={`p-6 rounded-lg shadow-lg w-[90%] max-w-lg overflow-y-scroll h-[90vh] sm:max-h-[none] ${
           dark ? "bg-[#69363F]" : "bg-[#232122]"
         }`}
       >
         <h2 className="text-lg font-bold mb-4 text-[#B6A99A]">Edit Tournament</h2>
         <form
           onSubmit={() => {
             saveEdit(selectedTournament);
           }}
         >
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Title</label>
             <input
               type="text"
               value={selectedTournament.title}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   title: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Game</label>
             <input
               type="text"
               value={selectedTournament.game}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   game: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Date</label>
             <input
               type="date"
               value={selectedTournament.date}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   date: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Time</label>
             <input
               type="time"
               value={selectedTournament.time}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   time: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Prize Pool</label>
             <input
               type="text"
               value={selectedTournament.prizePool}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   prizePool: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Description</label>
             <textarea
               value={selectedTournament.description}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   description: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-[#B6A99A]">Rules</label>
             <textarea
               value={selectedTournament.rules}
               onChange={(e) =>
                 setSelectedTournament((prev) => ({
                   ...prev,
                   rules: e.target.value,
                 }))
               }
               className="w-full px-3 py-2 border rounded-lg"
             />
           </div>
           <div className="flex justify-end space-x-2">
             <button
               onClick={() => setShowEditModal(false)}
               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
             >
               Cancel
             </button>
             <button
               type="submit"
               className={`px-4 py-2 text-white rounded ${
                 dark
                   ? "bg-[#302B27] hover:bg-[#49413C]"
                   : "bg-[#854951] hover:bg-[#A15D66]"
               } `}
             >
               Save
             </button>
           </div>
         </form>
       </div>
     </div>
     
      
      )}
    </div>
  );
};

export default PostedEvents;
