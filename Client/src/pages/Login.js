// import { React, useState, useEffect } from "react";
// import bgLoginImage from "../assets/loginbg.webp";
// import { LoginUser } from "../redux/features/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Loading from "../utils/Loading/Loading";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const { loading, error, token } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const HandleFormSubmit = (e) => {
//     e.preventDefault();
//     dispatch(LoginUser(formData)).then((action) => {
//       if (LoginUser.fulfilled.match(action)) {
//         if (action?.payload?.user?.role === "admin") {
//           navigate("/dashboard");
//         } else {
//           navigate("/userdashboard");
//         }
//       }
//     });
//   };
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };


//   if (loading) {
//     return <Loading />;
//   }
//   return (
//     <div
//       className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
//       style={{
//         backgroundImage: `url(${bgLoginImage})`,
//       }}
//     >
//       <div className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg" style={{ margin: "0 20px" }}>
//         <h2 className="text-2xl font-bold text-center mb-6 font-playfair">Login</h2>
//         <form className="space-y-4" onSubmit={HandleFormSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full font-montserrat bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-2 rounded-lg transition-colors"
//           >
//             Login
//           </button>
//         </form>
//         {error && <p className="text-red-500 text-sm mt-2">{error?.error}</p>}
//         <div className="flex items-center my-4">
//           <div className="border-t border-gray-700 flex-grow"></div>
//           <span className="px-3 text-gray-400 text-sm">OR</span>
//           <div className="border-t border-gray-700 flex-grow"></div>
//         </div>
//         <button onClick={handleGoogleLogin} className="w-full font-montserrat bg-white text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
//           <img
//             src="https://www.svgrepo.com/show/355037/google.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           Continue with Google
//         </button>
//         <p className="text-sm text-center text-gray-400 mt-4">
//           <a href="/forget" className="text-[#ef964e] hover:underline">
//             Forgot Password?
//           </a>
//         </p>
//         <p className="text-sm text-center text-gray-400 mt-4">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-[#ef964e] hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from "react";
// import bgLoginImage from "../assets/loginbg.webp";
// import { LoginUser } from "../redux/features/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Loading from "../utils/Loading/Loading";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { loading, error } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [verifyMessage, setVerifyMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setVerifyMessage("");
//   };

//   const HandleFormSubmit = (e) => {
//     e.preventDefault();
//     dispatch(LoginUser(formData)).then((action) => {
//       if (LoginUser.fulfilled.match(action)) {
//         const role = action?.payload?.user?.role;
//         navigate(role === "admin" ? "/dashboard" : "/userdashboard");
//       } else if (LoginUser.rejected.match(action)) {
//         const err = action.payload;
//         if (err?.needsVerification) {
//           setVerifyMessage("Please verify your email. Check your inbox.");
//         }
//       }
//     });
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };

//   if (loading) return <Loading />;

//   return (
//     <div
//       className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
//       style={{ backgroundImage: `url(${bgLoginImage})` }}
//     >
//       <div className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg mx-4">
//         <h2 className="text-2xl font-bold text-center mb-6 font-playfair">
//           Login
//         </h2>
//         <form className="space-y-4" onSubmit={HandleFormSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full font-montserrat bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-2 rounded-lg transition-colors"
//           >
//             Login
//           </button>
//         </form>

//         {/* Error / Verification Message */}
//         {verifyMessage && (
//           <p className="text-yellow-300 text-sm mt-3 text-center">
//             {verifyMessage}
//           </p>
//         )}
//         {error && !verifyMessage && (
//           <p className="text-red-500 text-sm mt-3 text-center">{error?.error}</p>
//         )}

//         <div className="flex items-center my-4">
//           <div className="border-t border-gray-700 flex-grow"></div>
//           <span className="px-3 text-gray-400 text-sm">OR</span>
//           <div className="border-t border-gray-700 flex-grow"></div>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full font-montserrat bg-white text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
//         >
//           <img
//             src="https://www.svgrepo.com/show/355037/google.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           Continue with Google
//         </button>

//         <p className="text-sm text-center text-gray-300 mt-4">
//           <a href="/forget" className="text-[#ef964e] hover:underline">
//             Forgot Password?
//           </a>
//         </p>
//         <p className="text-sm text-center text-gray-300 mt-2">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-[#ef964e] hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import { React, useState } from "react";
// import bgLoginImage from "../assets/loginbg.webp";
// import { LoginUser, ResendVerificationEmail } from "../redux/features/authSlice"; // assuming you add this thunk
// import { useDispatch, useSelector } from "react-redux";
// import Loading from "../utils/Loading/Loading";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { loading, error, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showResend, setShowResend] = useState(false);
//   const [resendStatus, setResendStatus] = useState(null); // success or error message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Reset resend status if user edits form
//     setShowResend(false);
//     setResendStatus(null);
//   };

//   const HandleFormSubmit = (e) => {
//     e.preventDefault();
//     dispatch(LoginUser(formData)).then((action) => {
//       if (LoginUser.fulfilled.match(action)) {
//         if (action?.payload?.user?.role === "admin") {
//           navigate("/dashboard");
//         } else {
//           navigate("/userdashboard");
//         }
//       } else {
//         // Check if error is email not verified (Adjust this check as per your backend error structure)
//         if (
//           action.payload &&
//           action.payload.error === "Email not verified" // example error message
//         ) {
//           setShowResend(true);
//         } else {
//           setShowResend(false);
//         }
//       }
//     });
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };

//   const handleResendVerification = () => {
//     dispatch(ResendVerificationEmail({ email: formData.email }))
//       .then((res) => {
//         console.log("Resend response:", res);
//         if (res.payload.success) {
//           setResendStatus("Verification email sent! Please check your inbox.");
//         } else {
//           setResendStatus("Failed to send verification email. Try again later.");
//         }
//       })
//       .catch(() => {
//         setResendStatus("Failed to send verification email. Try again later.");
//       });
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div
//       className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
//       style={{
//         backgroundImage: `url(${bgLoginImage})`,
//       }}
//     >
//       <div
//         className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg"
//         style={{ margin: "0 20px" }}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 font-playfair">Login</h2>
//         <form className="space-y-4" onSubmit={HandleFormSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full font-montserrat bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-2 rounded-lg transition-colors"
//           >
//             Login
//           </button>
//         </form>
//         {error && <p className="text-red-500 text-sm mt-2">{error?.error}</p>}

//         {showResend && (
//           <div className="mt-4">
//             <p className="text-yellow-400 mb-2">
//               Your email is not verified. Please verify your email.
//             </p>
//             <button
//               onClick={handleResendVerification}
//               className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
//             >
//               Resend Verification Email
//             </button>
//             {resendStatus && (
//               <p className="mt-2 text-sm text-green-400">{resendStatus}</p>
//             )}
//           </div>
//         )}

//         <div className="flex items-center my-4">
//           <div className="border-t border-gray-700 flex-grow"></div>
//           <span className="px-3 text-gray-400 text-sm">OR</span>
//           <div className="border-t border-gray-700 flex-grow"></div>
//         </div>
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full font-montserrat bg-white text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
//         >
//           <img
//             src="https://www.svgrepo.com/show/355037/google.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           Continue with Google
//         </button>
//         <p className="text-sm text-center text-gray-400 mt-4">
//           <a href="/forget" className="text-[#ef964e] hover:underline">
//             Forgot Password?
//           </a>
//         </p>
//         <p className="text-sm text-center text-gray-400 mt-4">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-[#ef964e] hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { React, useState, useEffect } from "react";
import bgLoginImage from "../assets/loginbg.webp";
import { LoginUser, resendVerificationEmail } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../utils/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, error, token, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData)).then((action) => {
      if (LoginUser.fulfilled.match(action)) {
        if (action?.payload?.user?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/userdashboard");
        }
      } else if (LoginUser.rejected.match(action)) {
        // Check if user needs email verification
        if (action?.payload?.needsVerification) {
          setShowVerificationMessage(true);
        }
      }
    });
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      alert("Please enter your email address first");
      return;
    }
    
    setResendLoading(true);
    dispatch(resendVerificationEmail(formData.email)).then((action) => {
      setResendLoading(false);
      if (resendVerificationEmail.fulfilled.match(action)) {
        alert("Verification email sent successfully! Please check your inbox.");
      }
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white"
      style={{
        backgroundImage: `url(${bgLoginImage})`,
      }}
    >
      <div className="w-full max-w-sm p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg" style={{ margin: "0 20px" }}>
        <h2 className="text-2xl font-bold text-center mb-6 font-playfair">Login</h2>
        <form className="space-y-4" onSubmit={HandleFormSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 text-gray-900 placeholder:text-gray-700 rounded-lg border border-gray-700 focus:ring focus:ring-[#B7A692] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full font-montserrat bg-[#e1a257b8] hover:bg-[#b58954b8] text-white font-bold py-2 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        {/* Error Messages */}
        {error && (
          <div className="mt-4">
            <p className="text-red-500 text-sm">{error?.error}</p>
            {showVerificationMessage && (
              <div className="mt-2 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                <p className="text-yellow-700 text-sm mb-2">
                  Your email is not verified. Please check your inbox or resend the verification email.
                </p>
                <button
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline disabled:opacity-50"
                >
                  {resendLoading ? "Sending..." : "Resend Verification Email"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {message && !error && (
          <p className="text-green-500 text-sm mt-2">{message}</p>
        )}

        <div className="flex items-center my-4">
          <div className="border-t border-gray-700 flex-grow"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="border-t border-gray-700 flex-grow"></div>
        </div>
        
        <button 
          onClick={handleGoogleLogin} 
          className="w-full font-montserrat bg-white text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>
        
        <p className="text-sm text-center text-gray-400 mt-4">
          <a href="/forget" className="text-[#ef964e] hover:underline">
            Forgot Password?
          </a>
        </p>
        
        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#ef964e] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;