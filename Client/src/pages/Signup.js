// import React, { useState, useEffect } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import bgImage from "../assets/signupbg.png";
// import { useDispatch, useSelector } from "react-redux";
// import { signUpUser } from "../redux/features/authSlice";
// import Loading from "../utils/Loading/Loading";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const dispatach = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, token } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const HandleFormSubmit = (e) => {
//     e.preventDefault();
//     dispatach(signUpUser(formData));
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div
//       className="h-screen bg-cover bg-center flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-black text-white"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//       }}
//     >
//       <div className="w-auto sm:w-full sm:mx-3 max-w-sm md:max-w-md p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg" style={{ margin: "0 20px" }}>
//         <h1 className="text-3xl font-bold mb-6 text-center font-playfair">Sign Up</h1>

//         <form className="space-y-4" onSubmit={HandleFormSubmit}>
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium">
//               Name
//             </label>
//             <input
//               onChange={handleChange}
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               className="mt-1 w-full px-4 py-2 placeholder:text-gray-700 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="mt-1 w-full px-4 py-2 placeholder:text-gray-700 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
//             />
//           </div>

//           <div className="relative">
//           <label htmlFor="password" className="block text-sm font-medium">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               onChange={handleChange}
//               className="mt-1 w-full px-4 placeholder:text-gray-700 py-2 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692] pr-10"
//             />
//             <div
//               className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 cursor-pointer"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? (
//                 <AiFillEyeInvisible className="text-gray-500" />
//               ) : (
//                 <AiFillEye className="text-gray-500" />
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full font-montserrat py-2 px-4 bg-[#e1a257b8] hover:bg-[#b58954b8] rounded font-bold focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
//           >
//             Sign Up
//           </button>
//         </form>
//         {error && <p style={{ color: "red", marginTop: 2 }}>{error?.error}</p>}

//         <div className="flex items-center justify-center my-4">
//           <span className="border-t border-gray-700 w-1/4"></span>
//           <span className="mx-2 text-sm">OR</span>
//           <span className="border-t border-gray-700 w-1/4"></span>
//         </div>

//         <button onClick={handleGoogleLogin} className="w-full font-montserrat py-2 px-4 flex items-center justify-center bg-[#9b6d49] hover:bg-[#bf9c74] rounded font-bold focus:outline-none focus:ring-2 focus:ring-[#B7A692]">
//           <svg
//             className="w-5 h-5 mr-2"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M23.64 12.204c0-.638-.057-1.252-.164-1.843H12v3.492h6.64c-.287 1.54-1.12 2.84-2.385 3.704v3.084h3.865c2.265-2.085 3.56-5.155 3.56-8.437z" />
//             <path d="M12 24c3.24 0 5.96-1.08 7.946-2.92l-3.866-3.084c-1.08.72-2.47 1.145-4.08 1.145-3.14 0-5.8-2.12-6.76-4.97H1.34v3.11C3.32 21.51 7.32 24 12 24z" />
//             <path d="M5.24 14.01A7.34 7.34 0 0 1 4.91 12c0-.7.12-1.38.32-2.01V6.89H1.34A11.99 11.99 0 0 0 0 12c0 1.88.44 3.66 1.23 5.11l3.99-3.1z" />
//             <path d="M12 4.8c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.96 1.28 15.24 0 12 0 7.32 0 3.32 2.49 1.34 6.89l3.91 3.11C6.2 7.92 8.86 4.8 12 4.8z" />
//           </svg>
//           Continue with Google
//         </button>

//         <p className="text-sm text-center mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-[#ef964e] hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import bgImage from "../assets/signupbg.png";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/features/authSlice";
import Loading from "../utils/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localMessage, setLocalMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signUpUser(formData));
    if (result?.payload?.message) {
      setLocalMessage(result.payload.message); // ✅ Set message from backend
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Optional: redirect if token exists
    }
  }, [token, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  if (loading) return <Loading />;

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-black text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-auto sm:w-full sm:mx-3 max-w-sm md:max-w-md p-6 sm:p-8 bg-[#69363F] bg-opacity-90 rounded-lg shadow-lg" style={{ margin: "0 20px" }}>
        <h1 className="text-3xl font-bold mb-6 text-center font-playfair">Sign Up</h1>

        {localMessage ? (
          <div className="text-center text-green-300 mb-4">{localMessage}</div>
        ) : (
          <form className="space-y-4" onSubmit={HandleFormSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-2 placeholder:text-gray-700 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 placeholder:text-gray-700 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 pr-10 placeholder:text-gray-700 text-black border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
              />
              <div
                className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible className="text-gray-500" /> : <AiFillEye className="text-gray-500" />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full font-montserrat py-2 px-4 bg-[#e1a257b8] hover:bg-[#b58954b8] rounded font-bold focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
            >
              Sign Up
            </button>

            {error && (
              <p className="text-red-400 text-sm mt-2">
                {error.error || "Signup failed. Please try again."}
              </p>
            )}
          </form>
        )}

        <div className="flex items-center justify-center my-4">
          <span className="border-t border-gray-700 w-1/4"></span>
          <span className="mx-2 text-sm">OR</span>
          <span className="border-t border-gray-700 w-1/4"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full font-montserrat py-2 px-4 flex items-center justify-center bg-[#9b6d49] hover:bg-[#bf9c74] rounded font-bold focus:outline-none focus:ring-2 focus:ring-[#B7A692]"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.64 12.204c0-.638-.057-1.252-.164-1.843H12v3.492h6.64c-.287 1.54-1.12 2.84-2.385 3.704v3.084h3.865c2.265-2.085 3.56-5.155 3.56-8.437z" />
            <path d="M12 24c3.24 0 5.96-1.08 7.946-2.92l-3.866-3.084c-1.08.72-2.47 1.145-4.08 1.145-3.14 0-5.8-2.12-6.76-4.97H1.34v3.11C3.32 21.51 7.32 24 12 24z" />
            <path d="M5.24 14.01A7.34 7.34 0 0 1 4.91 12c0-.7.12-1.38.32-2.01V6.89H1.34A11.99 11.99 0 0 0 0 12c0 1.88.44 3.66 1.23 5.11l3.99-3.1z" />
            <path d="M12 4.8c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.96 1.28 15.24 0 12 0 7.32 0 3.32 2.49 1.34 6.89l3.91 3.11C6.2 7.92 8.86 4.8 12 4.8z" />
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#ef964e] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
