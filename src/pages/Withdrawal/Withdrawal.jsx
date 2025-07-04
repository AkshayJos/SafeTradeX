import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "../../State/Withdrawal/Action";
import {formatDate} from '../../utils/formatTimeString'
import { Loader } from "../../components/ui/loader";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);

  console.log(withdrawal);

  useEffect(() => {
    dispatch(getWithdrawalHistory());
  }, []);

  return withdrawal.loading ? <Loader/> : (
    <div className="px-5 lg:px-20 mx-20">
      <div className="flex justify-center">
        <h1 className="font-bold text-3xl pt-2 pb-4 text-violet-700">
        Withdrawal
        </h1>
      </div>
      <Table className="w-full table-fixed border-x">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Date
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Method
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Amount
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {withdrawal.history.map((item, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="py-4">
                <p>{formatDate(item.date)}</p>
              </TableCell>
              <TableCell className="py-4">Bank</TableCell>
              <TableCell className="py-4">{item.amount}</TableCell>
              <TableCell
                className={`py-4 ${
                  item.status === "SUCCESS"
                    ? "text-green-600"
                    : item.status === "DECLINE"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {item.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
