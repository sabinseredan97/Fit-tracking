import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { login } from "../../api/axios";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import fk2p_ymhy_230421 from "@/assets/fk2p_ymhy_230421.jpg";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
);

const formSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(passwordValidation, {
      message:
        "Your password must contain: at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export default function Login() {
  const { user } = useContext(AuthContext);
  const [headerBearer, setHeaderBearer] = useState(
    Cookies.get(".AspNetCore.Identity.Application")
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values);
      setHeaderBearer(Cookies.get(".AspNetCore.Identity.Application"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${headerBearer}`;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      {user ? (
        <Navigate to="/overview" />
      ) : (
        <div className="font-[sans-serif] text-[#333] max-w-7xl mx-auto h-screen">
          <div className="grid md:grid-cols-2 items-center gap-8 h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-lg max-md:mx-auto w-full p-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-[15px] mb-3 block">
                        Email
                      </FormLabel>
                      <FormControl className="relative flex items-center">
                        <Input
                          placeholder="email"
                          {...field}
                          className="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600"
                        />
                      </FormControl>
                      <FormDescription>Type your email here.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] mb-3 block">
                        Password
                      </FormLabel>
                      <FormControl className="relative flex items-center">
                        <Input
                          type="password"
                          placeholder="password"
                          className="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Type your password here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </Button>
                <p className="text-sm text-center">
                  Don't have an account?
                  <Link to="/register">
                    <Button
                      variant="link"
                      className="text-blue-600 font-semibold"
                    >
                      Register here
                    </Button>
                  </Link>
                </p>
              </form>
            </Form>
            <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-02">
              <img
                src={fk2p_ymhy_230421}
                className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative"
                alt="Image"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
