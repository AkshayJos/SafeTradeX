import { useState } from "react";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { DotIcon, } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler } from "../../State/Wallet/Action";
import { Loader } from "../../components/ui/loader";

const TopUpForm = () => {
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const {wallet} = useSelector(store => store);

  const dispatch = useDispatch();

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () =>{
    console.log(amount, paymentMethod);
    dispatch(paymentHandler({amount, paymentMethod}));
  }

  return wallet.loading ? <Loader/> : (
    <div className="pt-10 space-y-5 rounded-2xl">
      <div>
        <h1 className="pb-3">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-8 text-lg"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className="pb-1">Select payment Method</h1>
        <RadioGroup
          onValueChange={(value) => handlePaymentMethodChange(value)}
          className="flex"
          defaultValue="RAZORPAY"
        >
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              value="RAZORPAY"
              icon={DotIcon}
              className="h-9 w-9 cursor-pointer"
              id="r1"
            />

            <Label htmlForm="r1">
              <div className="bg-violet-300 rounded-lg w-32">
                <img
                  className="rounded-xl"
                  src="/razorpay.jpg"
                  alt="razorpay"
                />
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              value="STRIPE"
              icon={DotIcon}
              className="h-9 w-9 cursor-pointer"
              id="r2"
            />

            <Label htmlForm="r2">
              <div className="bg-violet-300 rounded-xl w-28">
                <img
                  className="rounded-xl h-10"
                  src="/stripe.png"
                  alt="stripe"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={handleSubmit} className='w-full py-7 text-md cursor-pointer'>
        Submit
      </Button>
    </div>
  );
};

export default TopUpForm;
