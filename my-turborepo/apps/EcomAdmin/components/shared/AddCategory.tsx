"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
// import { addOrderCategoryformSchematype, addCategoryformSchema } from "@/app/Validations";
import { addOrderCategoryformSchematype, addCategoryformSchema } from "@repo/shared/types";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/services/product.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; 

const AddCategory = () => {
  const form = useForm<addOrderCategoryformSchematype>({
    resolver: zodResolver(addCategoryformSchema),
    defaultValues: {
      name: "",
      slug: ""
    }
  });

  const { mutate: createCategoryMutation, isPending } = useMutation<
    any,
    Error,
    addOrderCategoryformSchematype
  >({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      toast.success("Category has been created successfully!");
      form.reset();

    },
    onError: (error) => {
      toast.error(error.message || "Failed to create category");
    }
  });

  const onSubmit = (data: addOrderCategoryformSchematype) => {
    createCategoryMutation(data);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Category</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormDescription>Enter category name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormDescription>Enter Category Slug.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto disabled:cursor-not-allowed cursor-pointer">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddCategory;
