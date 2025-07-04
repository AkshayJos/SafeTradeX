import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../State/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth} = useSelector(store => store);

  console.log(auth);

  const form = useForm({
    resolver: "",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(register({...data, navigate : navigate}));
  };

  
    useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
    }

    else if (auth.user) {
      toast.success("Registered successfully!");
    }
  }, [auth]);

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-800 shadow-xl border border-zinc-700 rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Account</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full p-4 bg-zinc-900 text-white placeholder-gray-400 border border-zinc-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition duration-150"
                    placeholder="Enter full name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full p-4 bg-zinc-900 text-white placeholder-gray-400 border border-zinc-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition duration-150"
                    placeholder="Enter email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full p-4 bg-zinc-900 text-white placeholder-gray-400 border border-zinc-700 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition duration-150"
                    placeholder="Enter password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-4 text-white font-semibold bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900 transition duration-200 rounded-lg shadow-md cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
