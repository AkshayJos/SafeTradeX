import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/ui/button";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addItemToWatchlist,
  getUserWatchlist,
} from "../../State/Watchlist/Action";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/ui/loader";

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleRemoveFromWatchlist = (value) => {
    dispatch(addItemToWatchlist({ coinId: value }));
  };

  useEffect(() => {
    dispatch(getUserWatchlist());
  }, []);

  console.log(watchlist.items)

  return watchlist.loading ? <Loader/> : (
    <div className="px-5 lg:px-20">
      <div className="flex justify-center">
        <h1 className="font-bold text-3xl pt-2 pb-4 text-violet-700">
          Watchlist
        </h1>
      </div>
      <Table className="w-full table-fixed border-x">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              COIN
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              SYMBOL
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              VOLUME
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              MARKET CAP
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              24H
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              PRICE
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              REMOVE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.items.map((item, index) => (
            <TableRow
            onClick={()=>navigate(`/market/${item.id}`)}
             key={index} className="text-center cursor-pointer">
              <TableCell className="py-4">
                <div className="flex items-center justify-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.image} />
                  </Avatar>
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-4">
                {item.symbol.toUpperCase()}
              </TableCell>
              <TableCell className="py-4">{item.total_volume}</TableCell>
              <TableCell className="py-4">{item.market_cap}</TableCell>
              <TableCell className="py-4">
                {item.price_change_percentage_24h}%
              </TableCell>
              <TableCell className="py-4">${item.current_price}</TableCell>
              <TableCell className="py-4">
                <Button
                  variant="outline"
                  onClick={() => handleRemoveFromWatchlist(item.id)}
                  className="bg-violet-600 p-0 cursor-pointer"
                >
                  <Bookmark className="fill-violet-500 stroke-violet-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
