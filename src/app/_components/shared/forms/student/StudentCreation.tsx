"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";
import { toast } from "~/components/ui/use-toast";

const formSchema = z.object({
  class: z.string().min(1, "Class is required"),
  group: z.string().optional(),
  category: z.string().optional(),
  rollNumber: z.string().min(1, "Roll Number is required"),
  registrationNumber: z.string().min(1, "Registration Number is required"),
  fee: z.string().min(1, "Fee is required"),
  studentMobile: z.string().min(10, "Invalid mobile number"),
  fatherMobile: z.string().min(10, "Invalid mobile number"),
  whatsappNumber: z.string().min(10, "Invalid WhatsApp number"),
  admissionNumber: z.string().min(1, "Admission/GR Number is required"),
  studentName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters").max(100, "Father's name must not exceed 100 characters"),
  studentCNIC: z.string().min(13, "Invalid CNIC number"),
  fatherCNIC: z.string().min(13, "Invalid CNIC number"),
  fatherQualification: z.string().optional(),
  motherName: z.string().optional(),
  motherCNIC: z.string().optional(),
  motherQualification: z.string().optional(),
  fatherProfession: z.string().optional(),
  bloodGroup: z.string().optional(),
  guardianName: z.string().optional(),
  caste: z.string().optional(),
  family: z.string().min(1, "Family is required"),
  registrationDate: z.string().min(1, "Registration Date is required"),
  currentAddress: z.string().min(5, "Current Address must be at least 5 characters"),
  permanentAddress: z.string().min(5, "Permanent Address must be at least 5 characters"),
  medicalProblem: z.string().optional(),
});

export default function StudentCreationDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log(data);
      toast({
        title: "Success",
        description: "Student registered successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register student",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-6 justify-center sm:py-12">
      <div className="mx-auto">
        <div className="px-4 bg-yellow-100/60 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-teal-700 text-white p-2 mb-4">ACADEMIC DATA</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                <Select {...form.register("class")}>
                  <option value="MONTESSORI">Nursery</option>
                  <option value="MONTESSORI">Prep</option>
                  <option value="PRIMARY">GRADE - 1</option>
                  <option value="MIDDLE">GRADE - 1</option>
                  <option value="MATRICULATION">GRADE - 1</option>
                  {/* Add more options as needed */}
                </Select>
              </div>
              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700">Group</label>
                <Select {...form.register("group")}>
                  <option value="">Select an option</option>
                  {/* Add group options */}
                </Select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <Select {...form.register("category")}>
                  <option value="">Select an option</option>
                  {/* Add category options */}
                </Select>
              </div>
              <div>
                <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
                <Input type="text" {...form.register("rollNumber")} placeholder="0" />
              </div>
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
                <Input type="text" {...form.register("registrationNumber")} placeholder="Registration Number" />
              </div>
              <div>
                <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Fee</label>
                <Input type="text" {...form.register("fee")} placeholder="5,000" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="studentMobile" className="block text-sm font-medium text-gray-700">Student Mobile</label>
                <Input type="tel" {...form.register("studentMobile")} placeholder="03311070760" />
              </div>
              <div>
                <label htmlFor="fatherMobile" className="block text-sm font-medium text-gray-700">Father Mobile</label>
                <Input type="tel" {...form.register("fatherMobile")} placeholder="03311070760" />
              </div>
              <div>
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">Whatsapp Number</label>
                <Input type="tel" {...form.register("whatsappNumber")} placeholder="03311070760" />
              </div>
            </div>

            <div className="bg-red-600 text-white p-2 mb-4">PERSONAL DATA</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="admissionNumber" className="block text-sm font-medium text-gray-700">Admission/GR Number</label>
                <Input type="text" {...form.register("admissionNumber")} placeholder="79" />
              </div>
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name *</label>
                <Input type="text" {...form.register("studentName")} placeholder="abc" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <Select {...form.register("gender")}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                <Input type="date" {...form.register("dateOfBirth")} />
              </div>
              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name</label>
                <Input type="text" {...form.register("fatherName")} placeholder="xyz" />
              </div>
              <div>
                <label htmlFor="studentCNIC" className="block text-sm font-medium text-gray-700">Student CNIC Number</label>
                <Input type="text" {...form.register("studentCNIC")} placeholder="xxxxxxxxxxx" />
              </div>
              <div>
                <label htmlFor="fatherCNIC" className="block text-sm font-medium text-gray-700">Father CNIC Number</label>
                <Input type="text" {...form.register("fatherCNIC")} placeholder="123" />
              </div>
              <div>
                <label htmlFor="fatherQualification" className="block text-sm font-medium text-gray-700">Father Qualification</label>
                <Input type="text" {...form.register("fatherQualification")} placeholder="Father Qualification" />
              </div>
              <div>
                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother Name</label>
                <Input type="text" {...form.register("motherName")} placeholder="Mother Name" />
              </div>
              <div>
                <label htmlFor="motherCNIC" className="block text-sm font-medium text-gray-700">Mother CNIC Number</label>
                <Input type="text" {...form.register("motherCNIC")} placeholder="Mother CNIC Number" />
              </div>
              <div>
                <label htmlFor="motherQualification" className="block text-sm font-medium text-gray-700">Mother Qualification</label>
                <Input type="text" {...form.register("motherQualification")} placeholder="Mother Qualification" />
              </div>
              <div>
                <label htmlFor="fatherProfession" className="block text-sm font-medium text-gray-700">Father Profession</label>
                <Select {...form.register("fatherProfession")}>
                  <option value="">Select profession</option>
                  {/* Add profession options */}
                </Select>
              </div>
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                <Select {...form.register("bloodGroup")}>
                  <option value="O+">O+</option>
                  {/* Add more blood group options */}
                </Select>
              </div>
              <div>
                <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Guardian Name</label>
                <Input type="text" {...form.register("guardianName")} placeholder="Guardian Name" />
              </div>
              <div>
                <label htmlFor="caste" className="block text-sm font-medium text-gray-700">Caste</label>
                <Input type="text" {...form.register("caste")} placeholder="Enter caste" />
              </div>
              <div>
                <label htmlFor="family" className="block text-sm font-medium text-gray-700">Family *</label>
                <Select {...form.register("family")}>
                  <option value="xyz(123)">xyz(123)</option>
                  {/* Add more family options */}
                </Select>
              </div>
              <div>
                <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Registration Date</label>
                <Input type="date" {...form.register("registrationDate")} />
              </div>
            </div>
            <div>
              <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700">Current Address</label>
              <Input type="text" {...form.register("currentAddress")} placeholder="Current Address" />
            </div>
            <div>
              <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">Permanent Address</label>
              <Input type="text" {...form.register("permanentAddress")} placeholder="Permanent Address" />
            </div>
            <div>
              <label htmlFor="medicalProblem" className="block text-sm font-medium text-gray-700">Medical Problem</label>
              <Input type="text" {...form.register("medicalProblem")} placeholder="Medical Problem" />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">Close</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}