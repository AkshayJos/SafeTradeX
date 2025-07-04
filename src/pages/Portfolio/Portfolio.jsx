import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "../../State/Asset/Action";
import { Loader } from "../../components/ui/loader";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets());
  }, []);

  return asset.loading ? (
    <Loader />
  ) : (
    <div className="px-5 lg:px-20">
      <div className="flex justify-center">
        <h1 className="font-bold text-3xl pt-2 pb-4 text-violet-700">
          Portfolio
        </h1>
      </div>
      <Table className="w-full table-fixed border-x">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              ASSETS
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              PRICE
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              UNIT
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              CHANGE
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              CHANGE (%)
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              VOLUME
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asset.userAssets.map((item, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="py-4">
                <div className="flex items-center justify-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.coin.image} />
                  </Avatar>
                  <span>{item.coin.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-4">
                {item.coin.symbol.toUpperCase()}
              </TableCell>
              <TableCell className="py-4">{item.quantity}</TableCell>
              <TableCell className="py-4">
                {item.coin.price_change_24h}
              </TableCell>
              <TableCell className="py-4">
                {item.coin.price_change_percentage_24h}
              </TableCell>
              <TableCell className="py-4">{item.coin.total_volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
