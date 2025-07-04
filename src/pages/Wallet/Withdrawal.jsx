import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { DialogClose } from "../../components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentDetails,
  withdrawalRequest,
} from "../../State/Withdrawal/Action";
import { Loader } from "../../components/ui/loader";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);

  console.log(wallet);

  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(withdrawalRequest({ amount }));
    console.log(amount);
  };

  return withdrawal.loading ? <Loader/> : (
    <div className="pt-5 space-y-5">
      <div className="flex justify-between rounded-md items-center bg-violet-800 text-lg font-semibold px-5 py-3">
        <p>Available Balance</p>
        <p>{wallet.userWallet.balance}$</p>
      </div>
      <div className="flex justify-center">
        {wallet.userWallet.balance - amount < 0 && (
          <p className="text-red-500">Insufficient Balance to Withdraw !</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h1 className="pb-3">Enter Withdrawal Amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center no-spinner"
            placeholder="$96549"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer To</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img className="h-8 w-8 rounded-md" src="/bank.png" alt="bank" />
          <div>
            <p className="text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs">
              {withdrawal.paymentDetails?.accountNumber}
            </p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-5 text-lg cursor-pointer"
        >
         Request to withdraw
        </Button>
      </DialogClose>
    </div>
  );
};

export default Withdrawal;
