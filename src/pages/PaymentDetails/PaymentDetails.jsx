import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../../components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentDetails } from "../../State/Withdrawal/Action";
import { Loader } from "../../components/ui/loader";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  console.log(withdrawal.paymentDetails);

  useEffect(() => {
    dispatch(getPaymentDetails());
  }, []);

  return withdrawal.loading ? <Loader/> : (
    <div className="px-20">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold pb-10 pt-8 text-violet-500">
          Payment Details
        </h1>
      </div>
      {withdrawal.paymentDetails ? (
        <div className="flex justify-center items-center bg-gray-950">
          <Card className="w-full max-w-md bg-gray-900 border border-violet-600 shadow-md rounded-xl p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white">
                <span className="text-violet-400">Bank Name :</span>{" "}
                {withdrawal.paymentDetails.bankName}
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                <span className="text-violet-300">A/C No :</span>{" "}
                {withdrawal.paymentDetails.accountNumber}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <p className="text-violet-300">A/C Holder :</p>
                <p className="text-white">
                  {withdrawal.paymentDetails.accountHolderName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-violet-300 ">IFSC Code :</p>
                <p className="text-white">
                  {withdrawal.paymentDetails.ifscCode}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger>
              <Button className="py-6 cursor-pointer">Add payment details</Button>
            </DialogTrigger>
            <DialogContent className="border-violet-900">
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
              </DialogHeader>
              <PaymentDetailsForm />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
