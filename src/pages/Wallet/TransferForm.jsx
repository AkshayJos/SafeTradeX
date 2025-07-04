import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { DialogClose } from "../../components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { transferMoney } from "../../State/Wallet/Action";
import { Loader } from "../../components/ui/loader";

const TransferForm = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);

  const [formData, setFormaData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormaData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
    dispatch(transferMoney({
      walletId : formData.walletId,
      reqData : {
        amount : formData.amount,
        purpose : formData.purpose,
        transferId : formData.walletId
    }
  }))
  };

  return wallet.loading ? <Loader/> : (
    <div className="pt-10 space-y-5 ">
      <div>
        <h1 className="pb-3">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className="pb-3">Reciever's Wallet Id</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7"
          placeholder="#Adfg34d"
        />
      </div>

      <div>
        <h1 className="pb-3">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7"
          placeholder="Enter purpose.."
        />
      </div>

      <DialogClose className='w-full'>
        <Button onClick={handleSubmit} className="w-full py-5 text-md">
          Submit
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
