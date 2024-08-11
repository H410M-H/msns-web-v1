import { TRPCClientError } from "@trpc/client"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"




export const EmployeeRouter = createTRPCRouter({

    getEmployees: publicProcedure.query(async ({ ctx }) => {
        try {
            const employees: EmployeeProps[] = await ctx.db.employees.findMany();
            return employees;
        } catch (error) {
            if (error instanceof TRPCClientError) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error("Something went wrong.");
        }
    }),

    createEmployee: publicProcedure
        .input(z.object({
            employeeName: z.string(),
            fatherName: z.string(),
            cnic: z.string(),
            fcnic: z.string(),
            dob: z.string(),
            doj: z.string(),
            gender: z.string(),
            religion: z.string(),
            education: z.string(),
            address: z.string(),
            permanentAddress: z.string(),
            contact: z.string(),
            additionalContact: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                
                await ctx.db.employees.create({
                    data: {
                        employeeName: input.employeeName,
                        fatherName: input.fatherName,
                        cnic: input.cnic,
                        fcnic: input.fcnic,
                        dob: input.dob,
                        doj: input.doj,
                        gender: input.gender === 'M' ? "MALE" : "FEMALE",
                        religion: input.religion ==='M' ? "MUSLIM" : input.religion ==='C' ? "CHRISTIAN":"OTHERS" ,
                        education: input.education,
                        address: input.address,
                        permanentAddress: input.permanentAddress,
                        contact: input.contact,
                        additionalContact: input.additionalContact,
                    }
                });
            } catch (error) {

                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: error.message
                    })
                }
                console.error(error);
                throw new TRPCError({
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'Something went wrong'
                });
              }
            }),
                
            deleteEmployeesByIds: publicProcedure
            .input(z.object({
                employeeIds: z.string().array(),
            }))
            .mutation(async ({ ctx, input }) => {
                try {
                    await ctx.db.employees.deleteMany({
                        where: {
                            employeeId: {
                                in: input.employeeIds,
                            },
                        },
                    });
                } catch (error) {
                    if (error instanceof TRPCClientError) {
                        console.error(error.message);
                        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
                    }
                    console.error(error);
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Something went wrong." });
                }
            }),
});