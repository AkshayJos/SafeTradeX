import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "../../State/Order/Action";
import { calculateProfitLoss } from "../../utils/calculateProfitLoss";
import { Loader } from "../../components/ui/loader";

const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  console.log(order.orders);

  useEffect(() => {
    dispatch(getAllOrdersForUser());
  }, []);

  function formatTimestamp(timestamp) {
    const dateObj = new Date(timestamp);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // months are 0-indexed
    const day = dateObj.getDate();
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  return order.loading ? <Loader/> : (
    <div className="px-5 lg:px-20">
   <div className="flex justify-center">
       <h1 className="font-bold text-3xl pt-2 pb-4 text-violet-700">Activity</h1>
   </div>
      <Table className="border-x w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Date and Time
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Trading Pair
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Buy Price
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Selling Price
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Order Type
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Quantity
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Profit/Loss
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.orders.map((item, index) => (
            item.orderItem.buyPrice > 0 && item.orderItem.sellPrice > 0 &&
            <TableRow key={index} className="text-center">
              <TableCell className="py-3">
                <p>{formatTimestamp(item.timestamp).date}</p>
                <p className="text-gray-300">
                  {formatTimestamp(item.timestamp).time}
                </p>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center justify-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.orderItem.coin.image} />
                  </Avatar>
                  <span>{item.orderItem.coin.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">{item.orderItem.buyPrice}$</TableCell>
              <TableCell className="py-3">
                {item.orderItem.sellPrice}$
              </TableCell>
              <TableCell className="py-3">{item.orderType}</TableCell>
              <TableCell className="py-3">{item.orderItem.quantity}</TableCell>
              <TableCell
                className={`py-3 ${
                  calculateProfitLoss(item) !== "-" &&
                  (calculateProfitLoss(item) < 0
                    ? "text-red-500"
                    : "text-green-500")
                }`}
              >
                {calculateProfitLoss(item) === "-"
                  ? "-"
                  : `${calculateProfitLoss(item)}$`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
