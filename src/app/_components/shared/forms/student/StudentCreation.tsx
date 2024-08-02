"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import dayjs from 'dayjs'

const formSchema = z.object({
  doa: z.date({ required_error: "Field is required." }),
  studentName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  dob: z.date({ required_error: "Field is required." }),
  fatherName: z
    .string()
    .min(2, "Father's name must be at least 2 characters")
    .max(100, "Father's name must not exceed 100 characters"),
  studentBForm: z
    .string()
    .regex(
      /^\d{4}-\d{7}-\d{1}$/,
      "Invalid Student B-Form format (0000-0000000-0)",
    ),
  fatherCNIC: z
    .string()
    .regex(
      /^\d{4}-\d{7}-\d{1}$/,
      "Invalid Father CNIC format (0000-0000000-0)",
    ),
  gender: z.string({required_error:'Field is required.'}),
  caste: z.optional(z.string()),
  occupation: z
    .string()
    .min( 2, "Occupation must be at least 2 characters")
    .max(100, "Occupation must not exceed 100 characters"),
  religion: z.string().min(1, "Religion must be at least 2 characters"),
  residence: z
    .string()
    .min(5, "Residence must be at least 5 characters")
    .max(200, "Residence must not exceed 200 characters"),
  residence2: z.optional(
    z
      .string()
      .min(5, "Residence must be at least 5 characters")
      .max(200, "Residence must not exceed 200 characters"),
  ),
  contact1: z
    .string()
    .regex(/^[0-9,\s]+$/, "Invalid phone number format")
    .min(10, "Contact number must be at least 10 digits"),
  contact2: z.optional(
    z
      .string()
      .regex(/^[0-9,\s]+$/, "Invalid phone number format")
      .min(10, "Contact number must be at least 10 digits"),
  ),
});

export const StudentCreation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const genderClasses = [
    {
      value: "M",
      label: "Male",
    },
    {
      value: "F",
      label: "Female",
    },
  ];

  const religion = [
    {
      value: "M",
      label: "Muslim",
    },
    {
      value: "C",
      label: "Christian",
    },
    {
      value: "O",
      label: "Others",
    },
  ];

  const createStudent = api.student.createStudent.useMutation();

  const formSubmitted = (data: z.infer<typeof formSchema>) => {
    createStudent.mutate({
      studentName: data.studentName,
      fatherName: data.fatherName,
      bform: data.studentBForm,
      cnic: data.fatherCNIC,
      dob: dayjs(data.dob).format('YYYY-MM-DD'),
      doa: dayjs(data.doa).format('YYYY-MM-DD'),
      gender: data.gender,
      religion: data.religion,
      tribe: data.caste ?? "none",
      occupation: data.occupation,
      address: data.residence,
      permanentAddress: data.residence2?? "none",
      contact: data.contact1,
      additionalContact: data.contact2 ?? "none",
    });
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="font-serif text-4xl font-medium text-green-800">
          Student Registration Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitted)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 font-sans font-normal md:grid-cols-2">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name:*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student's name"
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
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father Name:*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Father's name"
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
                name="studentBForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student B-Form #*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0000-0000000-0"
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
                name="fatherCNIC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father CNIC #*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0000-0000000-0"
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
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth:*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doa"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Admission:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderClasses.map((value, index) => (
                          <SelectItem key={index} value={value.value}>
                            {value.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Religion:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Religion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {religion.map((value, index) => (
                          <SelectItem key={index} value={value.value}>
                            {value.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="caste"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tribe/ Caste:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tribe or caste"
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
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guardian Occupation:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter guardian's occupation"
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
                name="residence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential Address:*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter residential address"
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
                name="residence2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permanent Address:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Permanent Address (optional)"
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
                name="contact1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact #:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Mobile #"
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
                name="contact2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Contact #:(Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter contact numbers"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-full sm:w-auto" disabled={createStudent.isPending}>
                {createStudent.isPending ? 'Please wait':'Register Student'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
