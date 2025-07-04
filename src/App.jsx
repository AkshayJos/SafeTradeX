import "./App.css";

import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Portfolio from "./pages/Portfolio/Portfolio";
import Activity from "./pages/Activity/Activity";
import Wallet from "./pages/Wallet/Wallet";
import SearchCoin from "./pages/SearchCoin/SearchCoin";
import Profile from "./pages/Profile/Profile";
import Watchlist from "./pages/Watchlist/Watchlist";
import StockDetails from "./pages/StockDetails/StockDetails";
import PaymentDetails from "./pages/PaymentDetails/PaymentDetails";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";
import AllWithdrawal from "./pages/Withdrawal/AllWithdrawal";
import { Toaster } from "react-hot-toast";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      auth.user &&
      (!auth.user.twoFactorAuth.enable || auth.isTwoFactorAuthVerified)
    ) {
      navigate("/");
    }
  }, [auth.user, auth.isTwoFactorAuthVerified]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getUser());
    }
  }, [auth.jwt]);

  console.log(auth);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a", // slate-950
            color: "#d1d5db", // slate-300
            border: "1px solid #7c3aed", // violet-600 border
            fontWeight: "500",
          },
          success: {
            style: {
              background: "#0f172a",
              color: "#4ade80", // green-400
              border: "1px solid #4ade80",
            },
            iconTheme: {
              primary: "#4ade80",
              secondary: "#0f172a",
            },
          },
          error: {
            style: {
              background: "#0f172a",
              color: "#f87171", // red-400
              border: "1px solid #f87171",
            },
            iconTheme: {
              primary: "#f87171",
              secondary: "#0f172a",
            },
          },
        }}
      />

      {!auth.user ||
      (auth.user.twoFactorAuth.enable && !auth.isTwoFactorAuthVerified) ? (
        <Auth />
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/all-withdrawal" element={<AllWithdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
