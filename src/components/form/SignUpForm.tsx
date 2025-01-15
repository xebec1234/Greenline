"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GoogleSignInButton from "../button/GoogleSignInButton";
import { useRouter } from "next/navigation";
import AlertMessage from "../ui/Alert";
import { useState } from "react";
import Link from "next/link";

// Validation schema
const FormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "You need to re-enter your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const showAlert = (message: string) => {
    setAlert({ message, visible: true });
  };

  const closeAlert = () => {
    router.push("/pages/auth/login");
    setAlert({ message: "", visible: false });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      showAlert("Successfully Registered!");
    } else {
      showAlert("Registration failed");
    }
  };

  return (
    <div className="flex-1 h-full flex justify-center items-center">
      <div className="bg-[#efece1] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264743]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Create a password"
                      className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264743]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re-enter Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter your Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="rePassword"
                      placeholder="Re-enter your password"
                      className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264743]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#264743] text-white py-3 rounded-lg hover:bg-[#1e3b38]"
            >
              Sign Up
            </Button>
            <div
              className="mx-auto my-4 flex w-full items-center justify-evenly 
            before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
            after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
            >
              or
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              if you have already an account. please&nbsp;
              <Link
                className="text-green-900 hover:underline"
                href="/pages/auth/login"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
      {alert.visible && (
        <AlertMessage message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
};

export default SignUpForm;
