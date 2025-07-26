import React, { useState } from "react";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../redux/features/authSlice";
import Loading from "../utils/Loading/Loading";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }
    dispatch(resetPassword({ token, newPassword }));

    if (message) {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="bg-[#69363f] dark:bg-[#69363f] h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-20 h-16 mr-2" src={logo} alt="logo" />
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset Your Password
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">
            Enter your new password to reset your password.
          </p>
          <form
            className="mt-2 space-y-4 lg:mt-3 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                New password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm new password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="password"
                id="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-[#843e4b] hover:bg-[#69363f] focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#843e4b] dark:hover:bg-[#843e4b] dark:focus:ring-[#843e4b]"
            >
              Reset Password
            </button>
          </form>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
