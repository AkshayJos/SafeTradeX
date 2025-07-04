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

import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEnableTwoFactorAuthOTP, verifyEnableTwoFactorAuthOTP } from "../../State/Auth/Action";
import { Loader } from "../../components/ui/loader";

const AccountVerificationForm = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState();
  const {auth} = useSelector(store => store);

  const [value, setvalue] = useState();
  const navigate = useNavigate();

  const handleSendOTP = () =>{
    dispatch(sendEnableTwoFactorAuthOTP());
  }

  const handleSubmit = () => {
    console.log(otp);
   dispatch(verifyEnableTwoFactorAuthOTP(otp));
  };

  return auth.loading ? <Loader/> :(
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full">
        <div className="flex space-x-2">
          <p className="text-violet-400">Email :</p>
          <p>{auth.user.email}</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button 
            onClick={handleSendOTP}
            className='cursor-pointer'>Send OTP</Button>
          </DialogTrigger>
          <DialogContent className='border-violet-900'>
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
              <DialogClose asChild>
                <Button onClick={handleSubmit} className="w-[10rem] cursor-pointer">
                  Submit
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
