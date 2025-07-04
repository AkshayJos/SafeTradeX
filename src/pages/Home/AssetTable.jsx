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
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";
import { formatDecimalWithEllipsis } from "../../utils/formatDecimalWithEllipsis";

export default function AssetTable({ coin, category }) {
  const navigate = useNavigate();

  return (
    <Table>
      <ScrollArea className="h-[73vh] pr-4">
        <TableHeader>
          <TableRow>
            <TableHead className="">COIN</TableHead>
            <TableHead className="text-center">SYMBOL</TableHead>
            <TableHead className="text-center">VOLUME</TableHead>
            <TableHead className="text-center">MARKET CAP</TableHead>
            <TableHead className="text-center">24h PRICE CHANGE</TableHead>
            <TableHead className="text-center">PRICE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {coin.map((item, index) => (
            <TableRow
              key={item?.id || item?.item.id}
              onClick={() => navigate(`/market/${item?.id || item?.item.id}`)}
            >
              <TableCell className="font-medium flex items-center gap-3 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                <Avatar className="-z-50 h-[2rem] w-[2rem]">
                  <AvatarImage src={item?.image || item?.item.large} />
                </Avatar>
                <span className="truncate">
                  {item?.name || item?.item.name}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {item.symbol?.toUpperCase() || item.item.symbol.toUpperCase()}
              </TableCell>
              <TableCell className="text-center">
                {item?.total_volume || item?.item?.data.total_volume}
              </TableCell>
              <TableCell className="text-center">
                {item?.market_cap || item?.item.data.market_cap}
              </TableCell>
              <TableCell className="text-center">
               {formatDecimalWithEllipsis(item?.price_change_percentage_24h ||
                    item?.item?.data?.price_change_percentage_24h?.usd)}
              </TableCell>

              <TableCell className="text-center">
                {formatDecimalWithEllipsis(item?.current_price || item?.item.data.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}
