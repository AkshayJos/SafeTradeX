import { DotIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { use, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "../../State/Wallet/Action";
import { getAssetDetails } from "../../State/Asset/Action";
import { payOrder } from "../../State/Order/Action";
import { DialogClose } from "../../components/ui/dialog";

const TreadingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { coin, wallet, asset } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWallet());
    dispatch(getAssetDetails({ coinId: coin.coinDetails?.id }));
  }, []);

  const handleChangeAmount = (e) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);
    console.log(inputAmount);

    const price = coin.coinDetails?.market_data.current_price.usd;

    if (!inputAmount || isNaN(inputAmount) || inputAmount <= 0 || !price) {
      setQuantity("0");
      return;
    }

    const volume = calculateBuyCost(inputAmount, price);
    console.log(volume);
    setQuantity(volume);
  };

  const handleChangeQuantity = (e) => {
  const inputQuantity = e.target.value;
  setQuantity(inputQuantity);
  console.log("inputQuantity : ", inputQuantity);

  const price = coin.coinDetails?.market_data.current_price.usd;

  if (!inputQuantity || isNaN(inputQuantity) || inputQuantity <= 0 || !price) {
    setAmount("0");
    return;
  }

  const cost = parseFloat(inputQuantity) * parseFloat(price);
  console.log("cost : ", cost);
  setAmount(cost); // Optional: limit decimal places
};


  const handleBuyAssets = () => {
    dispatch(
      payOrder({
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
        amount,
      })
    );
  };

  const calculateBuyCost = (amount, price) => {
    let volume = parseFloat(amount) / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);

    return volume.toFixed(decimalPlaces);
  };

  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex flex-col gap-3">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount..."
            onChange={(e)=>{
            orderType ==="BUY" ? handleChangeAmount(e) : handleChangeQuantity(e);
            }}
            type="number"
            name="amount"
          />

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{
            orderType ==="BUY" ? "Quantity : " : "Amount : "
            }</p>
            <p className="border text-lg px-4 py-2 rounded-md break-words text-right leading-tight w-fit max-w-full">
              {
            orderType ==="BUY" ? quantity : amount
            }
            </p>
          </div>
        </div>

        {orderType === "BUY" && wallet.userWallet.balance < amount && (
          <div className="flex justify-center">
            <h1 className="text-red-600 mt-2">
              Insufficient wallet balance to buy!
            </h1>
          </div>
        )}

        {orderType === "SELL" && (asset.assetDetails.quantity || 0) < quantity && (
          <div className="flex justify-center">
            <h1 className="text-red-600 mt-2">
              Insufficient quantity of {coin.coinDetails.name} to sell !
            </h1>
          </div>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <div className="h-8 w-8">
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
            <DotIcon className="text-violet-400" />
            <p className="text-violet-400">{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-lg font-bold">
              ${coin.coinDetails?.market_data.current_price.usd}
            </p>
            <p
              className={`${
                coin.coinDetails?.market_data.market_cap_change_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <span>{coin.coinDetails?.market_data.market_cap_change_24h}$</span>
              <span>
                {" "}
                (
                {coin.coinDetails?.market_data.market_cap_change_percentage_24h}
                %)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <p>
          {orderType === "BUY"
            ? `$${wallet.userWallet?.balance}`
            : asset.assetDetails?.quantity || 0}
        </p>
      </div>

      <div>
        <DialogClose asChild>
          <Button
            onClick={handleBuyAssets}
            className={`w-full py-6 cursor-pointer
            ${orderType === "SELL" ? "bg-red-600 text-white hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}`}
          >
            {orderType}
          </Button>
        </DialogClose>
        <Button
          variant="link"
          className="w-full mt-5 text-lg text-violet-400 cursor-pointer"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TreadingForm;
