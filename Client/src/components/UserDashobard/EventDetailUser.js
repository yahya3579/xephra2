import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventById, joinEvent } from "../../redux/features/eventsSlice";
import { getSubscriptionStatus } from "../../redux/features/paymentSlice";
import Loading from "../../utils/Loading/Loading";
import { useState } from "react";
import toast from "react-hot-toast";

const EventDetailUser = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { event, loading, error, message } = useSelector(
    (state) => state.events
  );
  const { subscriptionStatus } = useSelector((state) => state.payment);
  const [showPopup, setShowPopup] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).UserId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check subscription status when component mounts
  useEffect(() => {
    if (userId) {
      const loadingToast = toast.loading("Checking subscription status...");
      dispatch(getSubscriptionStatus(userId)).then((result) => {
        toast.dismiss(loadingToast);
        // Error will be handled by the subscription error useEffect
      });
    }
  }, [dispatch, userId]);

  // Load event details
  useEffect(() => {
    if (eventId) {
      const loadingToast = toast.loading("Loading event details...");
      dispatch(getEventById(eventId)).then((result) => {
        toast.dismiss(loadingToast);
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success("Event details loaded successfully!");
        }
        // Error will be handled by the event error useEffect
      });
    }
  }, [dispatch, eventId]);

  // Handle join event success and error
  useEffect(() => {
    if (message && !loading) {
      toast.success(message);
    }
    if (error && !loading) {
      toast.error(error);
    }
  }, [message, error, loading]);

  // Handle subscription status errors
  useEffect(() => {
    if (subscriptionStatus?.error && !subscriptionStatus?.loading) {
      toast.error(subscriptionStatus.error);
    }
  }, [subscriptionStatus?.error, subscriptionStatus?.loading]);

  // Handle event not found
  useEffect(() => {
    if (error && error.includes("not found") && !loading) {
      toast.error("Event not found or has been removed.");
    }
  }, [error, loading]);

  
  const handleJoin = (_id) => {
    const eventId = _id;
    if (!userId) {
      toast.error("User is not logged in");
      return;
    }

    // Check if subscription is active
    if (!subscriptionStatus?.isActive) {
      setShowPopup(true);
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Joining event...");
    
    dispatch(joinEvent({ userId, eventId })).then((result) => {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Success/error will be handled by the useEffect above
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleActivateSubscription = () => {
    setShowPopup(false);
    toast.success("Redirecting to payment portal...");
  };

  if (!event) {
    return (
      <div className="text-center text-white bg-[#232122] py-16">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link to="/userdashboard" className="text-[#69363f] mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log("error is", error);
    // Error toast is handled by useEffect above
  }

  return (
    <div className="min-h-screen bg-[#232122] text-[#b6a99a] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#202938] rounded-lg overflow-hidden shadow-lg">
        <img
          className="w-full h-64 object-cover"
          src={`${process.env.REACT_APP_BACKEND}/${event?.image}`}
          alt={event?.title}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#b8a896]">
            Tournament Title : {event?.title}
          </h1>
          <p className="text-[#69363f] font-bold mt-2">Game : {event?.game}</p>
          <p className="text-sm text-gray-400 mt-1">
            Date & Time : {event?.date} • {event?.time}
          </p>
          <p className="text-gray-300 mt-4">
            Description : {event?.description}
          </p>
          <p className="mt-6 text-lg text-white font-bold">
            Prize Pool: {event?.prizePool}
          </p>
          <div className="mt-6">
            <h2 className="text-xl text-[#b8a896] font-bold">Rules</h2>
            <p className="text-gray-300 mt-2">{event?.rules}</p>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/userdashboard"
              className="bg-[#69363f] text-white px-6 py-3 rounded-md hover:bg-[#8f404f] transition"
            >
              Back to Events
            </Link>
             <button
              disabled={loading || subscriptionStatus?.loading}
              onClick={() => handleJoin(event?._id)}
              className="bg-[#8f404f] text-white px-6 py-3 rounded-md hover:bg-[#a34c5a] transition"
            >
              {loading ? "Joining..." : subscriptionStatus?.loading ? "Checking..." : "Join Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#000000] border border-[#D19F43] rounded-lg p-6 max-w-md mx-4 relative">
                  <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-[#C9B796] hover:text-[#D19F43] text-xl font-bold"
                  >
                    ×
                  </button>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#D19F43] mb-4">
                      Subscription Required
                    </h3>
                    <p className="text-[#C9B796] mb-6">
                      You need to activate your subscription to join events.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={closePopup}
                        className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                      <Link to="/paymentportal">
                        <button
                          onClick={handleActivateSubscription}
                          className="px-6 py-2 bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-black rounded-md hover:opacity-90 transition"
                        >
                          Activate Subscription
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
};

export default EventDetailUser;
