import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../../components/ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWithdrawalRequest,
  getWithdrawalHistory,
  proceedWithWithdrawal,
} from "../../State/Withdrawal/Action";
import { DialogClose } from "../../components/ui/dialog";
import { formatDate } from "../../utils/formatTimeString";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);

  console.log(withdrawal);

  useEffect(() => {
    dispatch(getAllWithdrawalRequest());
  }, []);

  const handleProceedWithWithdrawal = async (id, isAccepted) => {
    await dispatch(
      proceedWithWithdrawal({
        id: id,
        accept: isAccepted,
      })
    );
    dispatch(getAllWithdrawalRequest());
  };

  return (
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
              Full Name
            </TableHead>
            <TableHead className="text-center text-violet-400 font-semibold text-lg">
              Email
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
          {withdrawal.requests.map((item, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="py-4">
                <p>{formatDate(item?.date)}</p>
              </TableCell>
              <TableCell className="py-4">{item?.user.fullName}</TableCell>
              <TableCell className="py-4">{item?.user.email}</TableCell>
              <TableCell className="py-4">Bank</TableCell>
              <TableCell className="py-4">{item?.amount}</TableCell>
              <TableCell className="py-4">
                <div>
                  {item?.status === "PENDING" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="cursor-pointer bg-violet-700 hover:bg-violet-800 text-white px-3 py-2 rounded-md shadow h-[1.7rem]">
                          {item.status}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="border border-violet-900 rounded-lg shadow-lg bg-gray-900 text-white">
                        <DialogHeader className="space-y-4">
                          <DialogTitle className="text-violet-300 text-xl font-semibold text-center">
                            Request for Withdrawal
                          </DialogTitle>

                          <div className="flex justify-center gap-6 mt-6">
                            <DialogClose asChild>
                              <Button
                                onClick={() =>
                                  handleProceedWithWithdrawal(item.id, true)
                                }
                                className="cursor-pointer bg-green-700 hover:bg-green-700 px-5 py-2 rounded-md font-medium"
                              >
                                SUCCESS
                              </Button>
                            </DialogClose>

                            <DialogClose asChild>
                              <Button
                                onClick={() =>
                                  handleProceedWithWithdrawal(item.id, false)
                                }
                                className="cursor-pointer bg-red-700 hover:bg-red-700 px-5 py-2 rounded-md font-medium"
                              >
                                DECLINE
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <p
                      className={`${
                        item?.status === "SUCCESS"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item?.status}
                    </p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
