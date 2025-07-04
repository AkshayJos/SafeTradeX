import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark, BookmarkIcon, DotIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import TreadingForm from "./TreadingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetails, resetCoinState } from "../../State/Coin/Action";
import {
  addItemToWatchlist,
  getUserWatchlist,
} from "../../State/Watchlist/Action";
import { existInWatchlist } from "../../utils/existInWatchlist";
import { Loader } from "../../components/ui/loader";
import toast from "react-hot-toast";

const StockDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { coin, watchlist } = useSelector((store) => store);

  console.log(coin)

  const handleAddToWatch = () => {
    dispatch(addItemToWatchlist({ coinId: coin.coinDetails.id }));
  };

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: id }));
    dispatch(getUserWatchlist());
  }, [id]);

  useEffect(() => {
  if (coin.error && !coin.coinDetails) {
    toast.error(coin.error);
    
      dispatch(fetchCoinDetails({ coinId: id }));
  }
}, [coin.error]);


  return coin.loading ? (
    <Loader />
  ) : (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
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
                <span>
                  {coin.coinDetails?.market_data.market_cap_change_24h}$
                </span>
                <span>
                  {" "}
                  (
                  {
                    coin.coinDetails?.market_data
                      .market_cap_change_percentage_24h
                  }
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Button
            onClick={handleAddToWatch}
            variant="outline"
            className="bg-violet-600 p-0 cursor-pointer"
          >
            {existInWatchlist(watchlist.items, coin.coinDetails) ? (
              <Bookmark className="fill-violet-500 stroke-violet-500" />
            ) : (
              <BookmarkIcon className="text-violet-500" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button className="cursor-pointer">Trade</Button>
            </DialogTrigger>
            <DialogContent className="border border-violet-600 rounded-lg">
              <DialogHeader className="ml-20">
                <DialogTitle className="text-violet-300">
                  How much do you want to spend?
                </DialogTitle>
              </DialogHeader>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-8">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
