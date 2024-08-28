"use client";

import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
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
import dayjs from "dayjs";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  feeName: z.string().min(1, "Fee name is required"),
  feeTuition: z.number().nonnegative("Tuition fee must be non-negative"),
  feePaper: z.number().nonnegative("Paper fund must be non-negative"),
  feeSport: z.number().nonnegative("Sports fund must be non-negative"),
  feeIdcard: z.number().nonnegative("ID card fee must be non-negative"),
  feeComm: z.number().nonnegative("INFO & CALLS fee must be non-negative"),
  createdAt: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
  updatedAt: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
});

export const FeeCreationDialog: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createFee = api.fee.createFee.useMutation({
    onSuccess: () => {
      form.reset();
    },
  });

  const formSubmitted = (values: z.infer<typeof formSchema>) => {
    createFee.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Set Fee</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Fee Structure</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmitted)} className="flex flex-col gap-4 p-4">
            <FormField
              control={form.control}
              name="feeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fee of Class" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {['feeTuition', 'feePaper', 'feeSport', 'feeIdcard', 'feeComm'].map((feeField) => (
              <FormField
                key={feeField}
                control={form.control}
                name={feeField as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{feeField.replace('fee', '').charAt(0).toUpperCase() + feeField.slice(1)} Fee</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {['createdAt', 'updatedAt'].map((dateField) => (
              <FormField
                key={dateField}
                control={form.control}
                name={dateField as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{dateField === 'createdAt' ? 'Creation Date' : 'Updated Date'}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={createFee.isPending} className="w-full">
              {createFee.isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Fee"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
