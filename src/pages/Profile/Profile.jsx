import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { VerifiedIcon } from "lucide-react";
import AccountVerificationForm from "./AccountVerificationForm";
import { useSelector } from "react-redux";
import { Loader } from "../../components/ui/loader";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const { auth } = useSelector((store) => store);

  console.log(auth);

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
    }
  }, [auth.error]);

  const handleEnableTwoStepVerification = () => {
    console.log("two step verification");
  };

  return auth.loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem] text-violet-500">Email : </p>
                  <p className="">{auth.user?.email}</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem] text-violet-500">Full Name : </p>
                  <p className="">{auth.user?.fullName}</p>
                </div>
              </div>

              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem] text-violet-500">Date Of Birth : </p>
                  <p className="">25/09/1998</p>
                </div>

                <div className="flex">
                  <p className="w-[9rem] text-violet-500">Nationality : </p>
                  <p className="">Indian</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Card className="w-full ">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>

                {auth.user.twoFactorAuth.enable ? (
                  <Badge className="space-x-1 text-white bg-green-600 w-21 h-6">
                    <VerifiedIcon />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500 text-black font-semibold">
                    Disabled
                  </Badge>
                )}
              </div>
            </CardHeader>
            {!auth.user.twoFactorAuth.enable && (
              <CardContent className="flex">
                <div>
                  <Dialog>
                    <DialogTrigger>
                      <Button className="cursor-pointer">
                        Enable Two Step Verification
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-violet-900">
                      <DialogHeader>
                        <DialogTitle>Verify your account</DialogTitle>
                        <AccountVerificationForm
                          handleSubmit={handleEnableTwoStepVerification}
                        />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
