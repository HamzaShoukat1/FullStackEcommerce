"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { addUserformSchematype, addUserformSchema } from "@repo/shared/types";
import { registerUser } from "@/services/user.service";

const AddUser = () => {
  const form = useForm<addUserformSchematype>({
    resolver: zodResolver(addUserformSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { mutate: createCategoryMutation, isPending } = useMutation<
    any,
    Error,
    addUserformSchematype
  >({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("User has been created successfully!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  const onSubmit = (data: addUserformSchematype) => {
    createCategoryMutation(data);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-2">Add User</SheetTitle>
        {/* Fixed: Kept short description text here and removed the form from inside it */}
        <SheetDescription>
          Fill in the details below to create a new user profile.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form
          className="space-y-6 mt-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>Enter user first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormDescription>Enter user last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  {/* Fixed: Removed the .split(",") array creation that was breaking Zod string validation */}
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Only admin can see your email.</FormDescription>
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  Only admin can see your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Actions */}
          <Button
            type="submit"
            disabled
            className="cursor-pointer w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default AddUser;
