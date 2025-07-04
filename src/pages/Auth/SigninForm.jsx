import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  verifyTwoFactorAuthOTP,
} from "../../State/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [otp, setOtp] = useState();
  const [isClicked, setIsClicked] = useState(false);

  console.log(auth);

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(login({ data, navigate }));
    setIsClicked(true);
    console.log(data);
  };

  const handleOTPSubmit = () => {
    console.log(otp);
    dispatch(verifyTwoFactorAuthOTP(otp));
  };

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
    }
  }, [auth.error]);

  useEffect(() => {
    if (
      auth.user &&
      (!auth.user.twoFactorAuth.enable || auth.isTwoFactorAuthVerified)
    ) {
      toast.success("Login successfully!");
      navigate("/");
    }
  }, [auth.user, auth.isTwoFactorAuthVerified]);

  useEffect(() => {
    if (isClicked && auth.user?.twoFactorAuth.enable) {
      toast.success("OTP sent successfully!");
      setIsClicked(false);
    }
  }, [auth.user, isClicked]);

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-800 shadow-xl border-violet-600 rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Login</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="w-full p-4 bg-zinc-900 text-white placeholder-gray-400 border border-zinc-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition duration-150"
                    placeholder="Enter email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full p-4 bg-zinc-900 text-white placeholder-gray-400 border border-zinc-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition duration-150"
                    placeholder="Enter password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Dialog>
            <DialogTrigger>
              <Button
                type="submit"
                className="w-[19rem] py-4 text-white font-semibold bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900 transition duration-200 rounded-lg shadow-md cursor-pointer"
              >
                Submit
              </Button>
            </DialogTrigger>
            {auth.user && auth.user.twoFactorAuth.enable && (
              <DialogContent className="border-violet-900">
                <DialogHeader>
                  <DialogTitle>Enter OTP</DialogTitle>
                </DialogHeader>
                <div className="py-5 gap-10 flex justify-center items-center">
                  <InputOTP
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <DialogClose>
                    <Button
                      onClick={handleOTPSubmit}
                      className="w-[10rem] cursor-pointer"
                    >
                      Submit
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </form>
      </Form>
    </div>
  );
};

export default SigninForm;
