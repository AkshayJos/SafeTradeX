import "./Auth.css";
import SignupForm from "./SignupForm";
import { Button } from "../../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";
import { Loader } from "../../components/ui/loader";
import { useSelector } from "react-redux";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useSelector((store) => store);

  return  (
    <div className="h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-800 text-white overflow-hidden">
      {/* 🌫️ Blurred glow layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-violet-700/20 to-indigo-800/20 blur-3xl animate-pulse pointer-events-none" />

      {/* 🪟 Auth Card */}
      <div className="z-50 relative flex flex-col justify-center items-center h-[37rem] w-[30rem] bg-slate-800/60 backdrop-blur-lg shadow-lg px-10 border rounded-2xl ">
        <h1 className="text-6xl font-bold pb-6 text-white">SafeTradeX</h1>
        {location.pathname === "/signup" ? (
          <section className="w-full max-w-md mx-auto p-6 bg-zinc-800  shadow-lg border border-violet-600 rounded-xl">
            <SignupForm />

            <div className="flex items-center justify-center mt-6 text-sm text-zinc-300">
              <span>Already have an account?</span>
              <Button
                className="ml-2 text-violet-500 hover:text-violet-400 transition cursor-pointer"
                onClick={() => navigate("/signin")}
                variant="ghost"
              >
                Sign in
              </Button>
            </div>
          </section>
        ) : location.pathname === "/forgot-password" ? (
          <section className="w-full max-w-md mx-auto p-6 bg-zinc-800 shadow-lg border border-violet-600 rounded-xl">
            <ForgotPasswordForm />

            <div className="flex items-center justify-center mt-6 text-sm text-zinc-300">
              <span
                onClick={() => navigate("/signin")}
                className="cursor-pointer"
              >
                Back to login.
              </span>
              <Button
                className="ml-2 text-violet-500 hover:text-violet-400 transition cursor-pointer"
                onClick={() => navigate("/signin")}
                variant="ghost"
              >
                Sign in
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full max-w-md mx-auto p-6 bg-zinc-800 shadow-lg border border-violet-600 rounded-xl">
            <SigninForm />

            <div className="flex items-center justify-center mt-6 text-sm text-zinc-300">
              <span>Don't have an account?</span>
              <Button
                className="ml-2 text-violet-500 hover:text-violet-400 transition cursor-pointer"
                onClick={() => navigate("/signup")}
                variant="ghost"
              >
                Sign up
              </Button>
            </div>

            <div className="mt-8">
              <Button
                className="w-full border-zinc-600 text-zinc-200 hover:bg-zinc-700 cursor-pointer"
                onClick={() => navigate("/forgot-password")}
                variant="outline"
              >
                Forgot Password
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
