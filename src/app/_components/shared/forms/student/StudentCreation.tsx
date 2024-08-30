"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import dayjs from 'dayjs'
import { toast } from "~/components/ui/use-toast";

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
  studentBForm: z.string({ required_error: "Invalid Student B-Form format (0000-0000000-0)"}),
  fatherCNIC: z.string({ required_error: "Invalid Father CNIC format (0000-0000000-0)"}),
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

export const StudentCreationDialog = () => {
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

  const createStudent = api.student.createStudent.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Student created successfully",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
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
<div className="min-h-screen bg-[url('/jpg/Schoolview.jpg')] bg-cover backdrop-blur-3xl sm:py-12 animate-fade-in">
  <div className="relative sm:max-w-4xl sm:mx-auto animate-slide-in-up">
    <div className="relative bg-green-100/40 backdrop-blur-sm shadow-lg sm:rounded-3xl sm:p-20 animate-fade-in-up">
      <div className="w-full">
        <h1 className="text-3xl font-serif font-bold text-amber-500 mb-4 transition duration-300 transform hover:scale-105">
          Create Student
        </h1>
        <form onSubmit={form.handleSubmit(formSubmitted)} className="grid grid-cols-1 gap-y-8 gap-10 sm:grid-col lg:grid-cols-2 xl:grid-cols-3">
          <div className="relative">
            <input
              autoComplete="off"
              id="studentName"
              {...form.register("studentName")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Student Name"
            />
            <label
              htmlFor="studentName"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Student Name
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="fatherName"
              {...form.register("fatherName")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Father's Name"
            />
            <label
              htmlFor="fatherName"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Father Name
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="studentBForm"
              {...form.register("studentBForm")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Student B-Form"
            />
            <label
              htmlFor="studentBForm"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Student B-Form
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="fatherCNIC"
              {...form.register("fatherCNIC")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Father CNIC"
            />
            <label
              htmlFor="fatherCNIC"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Father CNIC
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="dob"
              type="date"
              {...form.register("dob")}
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
            />
            <label
              htmlFor="dob"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Date of Birth
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="doa"
              type="date"
              {...form.register("doa")}
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
            />
            <label
              htmlFor="doa"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Date of Admission
            </label>
          </div>
          <div className="relative">
            <select
              id="gender"
              {...form.register("gender")}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent focus:outline-none focus:border-green-600 transition duration-200 ease-in-out"
            >
              <option value="" disabled>Select Gender</option>
              {genderClasses.map((gender) => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
            <label
              htmlFor="gender"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Gender
            </label>
          </div>
          <div className="relative">
            <select
              id="religion"
              {...form.register("religion")}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent focus:outline-none focus:border-green-600 transition duration-200 ease-in-out"
            >
              <option value="" disabled>Select Religion</option>
              {religion.map((rel) => (
                <option key={rel.value} value={rel.value}>
                  {rel.label}
                </option>
              ))}
            </select>
            <label
              htmlFor="religion"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Religion
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="occupation"
              {...form.register("occupation")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Occupation"
            />
            <label
              htmlFor="occupation"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Occupation
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="residence"
              {...form.register("residence")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Residence"
            />
            <label
              htmlFor="residence"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Residence
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="residence2"
              {...form.register("residence2")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Permanent Residence (Optional)"
            />
            <label
              htmlFor="residence2"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Permanent Residence (Optional)
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="contact1"
              {...form.register("contact1")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Contact Number 1"
            />
            <label
              htmlFor="contact1"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Contact Number 1
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="contact2"
              {...form.register("contact2")}
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600 bg-transparent transition duration-200 ease-in-out"
              placeholder="Contact Number 2 (Optional)"
            />
            <label
              htmlFor="contact2"
              className="absolute left-0 -top-3.5 text-gray-900 text-sm peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Contact Number 2 (Optional)
            </label>
          </div>
          <div className="relative col-span-full">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300 transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    );
}

