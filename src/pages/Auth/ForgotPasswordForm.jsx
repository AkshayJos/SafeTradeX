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
  resetAuthState,
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
} from "../../State/Auth/Action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const { auth } = useSelector((store) => store);

  console.log(auth);

  const navigate = useNavigate();

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: email,
      verificationType: "EMAIL",
    },
  });

  const onFormSubmit = (data) => {
    dispatch(sendPasswordResetOTP({ forgotPasswordTokenRequest: data }));
    setEmail(data.email);
    toast.success("OTP sent successfully!")
    console.log(data);
  };

  const handleOTPSubmit = () => {
    const request = {
      otp: value,
      password: newPassword,
      email: email,
    };
    console.log(request);
    dispatch(verifyPasswordResetOTP(request));
  };

  useEffect(() => {
    if (auth.message) {
      toast.success(auth.message.message);
      dispatch(resetAuthState());
      navigate("/signin");
    }
  }, [auth.message]);

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
      dispatch(resetAuthState());
    }
  }, [auth.error]);

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-800 shadow-xl border-violet-600 rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
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

          <Dialog>
            <DialogTrigger>
              <Button
                type="submit"
                className="py-4 w-[19rem] text-white font-semibold bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900 transition duration-200 rounded-lg shadow-md cursor-pointer"
              >
                Submit
              </Button>
            </DialogTrigger>
            <DialogContent className="border-violet-900">
              <DialogHeader>
                <DialogTitle className="text-center text-violet-300">
                  Enter OTP & New Password
                </DialogTitle>
              </DialogHeader>

              <div className="py-5 gap-10 flex flex-col justify-center items-center">
                <InputOTP
                  value={value}
                  onChange={(value) => setvalue(value)}
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

                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full max-w-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

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
          </Dialog>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
