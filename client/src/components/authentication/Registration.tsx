import { useNavigate, Navigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { register } from "@/api/axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

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

export default function Registration() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await register(values);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-gray-200 flex justify-center border rounded-lg gap-2 mt-2">
      {user ? (
        <Navigate to="/overview" />
      ) : (
        <div className="m-auto p-1">
          <div className="gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <Link to="/login">
            <Button variant="link" className="text-blue-500">
              Log into your account
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
