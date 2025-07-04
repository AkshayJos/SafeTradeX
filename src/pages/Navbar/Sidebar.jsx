import {
  XMarkIcon,
  WalletIcon,
  EyeIcon,
  UserCircleIcon,
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../State/Auth/Action";

// <div className="fixed left-0 top-0 z-50 h-full w-64 bg-gray-900 text-white shadow-xl"></div>

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // Wrapper ensures animation is smooth
    <div className="fixed top-0 left-0 z-50 h-full w-full pointer-events-none">
      <div
        className={`
          h-full w-64 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          pointer-events-auto
        `}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-violet-300">SafeTradeX</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        <nav className="mt-4 flex flex-col space-y-4 px-4">
          {[
            { to: "/", icon: HomeIcon, label: "Home" },
            { to: "/portfolio", icon: BriefcaseIcon, label: "Portfolio" },
            { to: "/watchlist", icon: EyeIcon, label: "Watchlist" },
            { to: "/activity", icon: ChartBarIcon, label: "Activity" },
            { to: "/wallet", icon: WalletIcon, label: "Wallet" },
            {
              to: "/payment-details",
              icon: CreditCardIcon,
              label: "Payment Details",
            },
            { to: "/withdrawal", icon: BanknotesIcon, label: "Withdrawal" },
            {
              to: "/all-withdrawal",
              icon: BanknotesIcon,
              label: "All Withdrawal",
            },
            { to: "/profile", icon: UserCircleIcon, label: "Profile" },
          ].map(({ to, icon: Icon, label }) => {
            return (
              (to !== "/all-withdrawal" || auth.user.role === "ROLE_ADMIN") && (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 text-violet-300" />
                  {label}
                </Link>
              )
            );
          })}
          <Link
            to={"/signin"}
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700"
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-violet-300" />
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
