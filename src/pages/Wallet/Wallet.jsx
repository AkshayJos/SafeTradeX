import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  CopyIcon,
  DollarSign,
  DownloadIcon,
  RefreshCcw,
  ShuffleIcon,
  UploadIcon,
  Wallet2Icon,
} from "lucide-react";
import TopUpForm from "./TopUpForm";
import Withdrawal from "./Withdrawal";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "../../State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";
import { getPaymentDetails } from "../../State/Withdrawal/Action";
import { formatDate } from "../../utils/formatTimeString";
import { Loader } from "../../components/ui/loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentReferenceId = query.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserWallet();
    fetchWalletTransactions();
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(depositMoney({ orderId, paymentReferenceId, navigate }));
    }
  }, [orderId, paymentReferenceId]);

  const fetchUserWallet = () => {
    dispatch(getUserWallet());
  };

  const fetchWalletTransactions = () => {
    dispatch(getWalletTransactions({}));
  };

  return wallet.loading ? <Loader/> : (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Wallet2Icon />
                <div>
                  <CardTitle className="text-2xl text-violet-500">
                    My Wallet
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm">{wallet.userWallet.id}</p>
                    <CopyIcon
                      size={15}
                      className="cursor-pointer hover:text-violet-400"
                    />
                  </div>
                </div>
              </div>
              <div>
                <RefreshCcw
                  onClick={fetchUserWallet}
                  className="w-6 h-6 cursor-pointer text-violet-500 hover:text-violet-400"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-2xl font-semibold">
                {wallet.userWallet.balance}$
              </span>
            </div>
            <div className="flex gap-7 mt-5 ">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-violet-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-violet-800 shadow-lg">
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="border-violet-900">
                  <DialogHeader>
                      <DialogTitle className="text-center text-violet-200">
                        Top Up Your Wallet
                      </DialogTitle>
                   
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-violet-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-violet-800 shadow-lg">
                    <DownloadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="border-violet-900">
                  <DialogHeader>
                      <DialogTitle className="text-center text-violet-300">
                        Request For Withdrawal
                      </DialogTitle>
                  </DialogHeader>
                  <Withdrawal />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-violet-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-violet-800 shadow-lg">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="border-violet-900">
                  <DialogHeader>
                    <DialogTitle className="text-center text-lg text-violet-300">
                      Transfer To Other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-lg font-semibold">History</h1>
            <RefreshCcw
              onClick={fetchWalletTransactions}
              className="h-5 w-5 p-0 cursor-pointer text-violet-400 hover:text-violet-300"
            />
          </div>

          <div className="space-y-5">
            {wallet.transactions.map((item, index) => (
              <div key={index}>
                <Card className="px-5 flex flex-row justify-between p-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <ShuffleIcon className="bg-violet-600 rounded-xl p-1 h-7 w-7" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1>{item.purpose}</h1>
                      <p className="text-sm text-violet-300">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className={`text-green-500`}>{item.amount} USD</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
