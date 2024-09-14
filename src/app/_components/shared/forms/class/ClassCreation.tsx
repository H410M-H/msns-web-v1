"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

const formSchema = z.object({
  className: z.string({ required_error: "Field is required" }),
  classSlug: z.enum(["ROSE", "TULIP"], {
    required_error: "Category is required",
  }),
  category: z.enum(["Montessori", "Primary", "Middle", "SSC-I", "SSC-II"], {
    required_error: "Category is required",
  }),
});

export const ClassCreationDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createClass = api.class.createClass.useMutation({
    onSuccess: () => {
      form.reset();
    },
  });

  const formSubmitted = (values: z.infer<typeof formSchema>) => {
    createClass.mutate({
      className: values.className ?? "none",
      classSlug: values.classSlug ?? "none",
      category: values.category ?? "none"
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add class
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create class</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitted)}
            className="flex flex-col gap-4 p-4"
          >
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write Class/Grade"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="classSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ROSE">ROSE</SelectItem>
                      <SelectItem value="TULIP">TULIP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Montessori">MONTESSORI (Nursery and Prep)</SelectItem>
                      <SelectItem value="Primary">PRIMARY (One to Five)</SelectItem>
                      <SelectItem value="Middle">MIDDLE (Six and Seven)</SelectItem>
                      <SelectItem value="SSC-I">SSC-I</SelectItem>
                      <SelectItem value="SSC-II">SSC-II</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={createClass.isPending}
              className="w-full"
            >
              {createClass.isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create class"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
