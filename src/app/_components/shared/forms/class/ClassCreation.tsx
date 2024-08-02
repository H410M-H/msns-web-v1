"use client";

import {  ReloadIcon } from "@radix-ui/react-icons";
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

const formSchema = z.object({
  className: z.string({ required_error: "Field is required" }),
  classSlug: z.string({ required_error: "Field is required" }),
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
                  <FormLabel>Class slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ROSE/ TULIP"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
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
