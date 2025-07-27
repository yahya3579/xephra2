import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


import Loading from "./utils/Loading/Loading";
import RegisterEventDetailUser from "./components/UserDashobard/RegisterEventDetailUser";
import PaymentForm from "./pages/PaymentForm/PaymentForm";
import VerifyEmail from "./pages/VerifyEmail";
import UserPaymentPortal from "./components/UserDashobard/PaymentPortal/PaymentPortal";
import PaymentVerificationPanel from "./components/AdminDashobard/PaymentPanel/PaymentVerificationPanel";
import HomeV2 from "./pages/HomeV2";
const Signup = lazy(() => import("./pages/Signup"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/AdminDashboard/Dashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Users = lazy(() => import("./components/AdminDashobard/Users"));
const TournamentRanking = lazy(() => import("./components/AdminDashobard/TournamentRanking"));
const EventDetailAdmin = lazy(() => import("./components/AdminDashobard/EventDetailAdmin"));
const EventDetailUser = lazy(() => import("./components/UserDashobard/EventDetailUser"));
const TournamentUsersRankingApproval = lazy(() => import("./components/AdminDashobard/TournamentUsersRankingApproval"));
const AllUserRankingBoard = lazy(() => import("./components/AdminDashobard/AllUserRankingBoard"));
const EventDetailUserDashboard = lazy(() => import("./components/UserDashobard/EventDetailUserDashboard"));
const TournamentRankings = lazy(() => import("./components/UserDashobard/TournamentRankings"));
const AllUserRankingUser = lazy(() => import("./components/UserDashobard/AllUserRankingUser"));
const GoogleSuccess = lazy(() => import("./components/GoogleSuccess"));
const Home = lazy(() => import("./pages/Home"));
const ChatSystem = lazy(() => import("./components/ChatSystem"));
// const HomeV2 = lazy(() => import("./pages/HomeV2"));


export default function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
    <Suspense fallback={<Loading />} >
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="*" element={<HomeV2 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route
          path="/userdashboard/chats"
          element={
            <PrivateRoute>
              <ChatSystem />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/chats"
          element={
            <PrivateRoute>
              <ChatSystem />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <PrivateRoute>
              <UserDashboard />{" "}
            </PrivateRoute>
          }
        />
         
        <Route path="/eventadmin/:eventId" element={<EventDetailAdmin />} />
        <Route path="/eventuser/:eventId" element={<EventDetailUser />} />
        <Route path="/registereventuser/:eventId" element={<RegisterEventDetailUser />} />
        <Route
          path="/userdashboard/eventdetailuser/:eventId"
          element={<EventDetailUserDashboard />}
        />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/allranking" element={<AllUserRankingBoard />} />
        <Route
          path="/userdashboard/allranking"
          element={<AllUserRankingUser />}
        />
        <Route
          path="/dashboard/tournamentrankings/:eventId"
          element={<TournamentRanking />}
        />
        <Route
          path="/userdashboard/tournamentrankings/:eventId"
          element={<TournamentRankings />}
        />
        <Route
          path="/dashboard/tournamentrankingapproval/:eventId"
          element={<TournamentUsersRankingApproval />}
        />
        <Route
          path="/paymentform"
          element={<PaymentForm />}
        /> 
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/paymentportal" element={<UserPaymentPortal />} />
        <Route path="/payment-verification-panel" element={<PaymentVerificationPanel />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
