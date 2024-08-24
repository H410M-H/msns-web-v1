import { TRPCClientError } from "@trpc/client"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"




export const StudentRouter = createTRPCRouter({

    getStudents: publicProcedure.query(async ({ ctx }) => {
        try {
            const students: StudentProps[] = await ctx.db.students.findMany();
            return students;
        } catch (error) {
            if (error instanceof TRPCClientError) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error("Something went wrong.");
        }
    }),

    getUnAllocateStudents: publicProcedure.query(async ({ ctx }) => {
        try {
            const students: StudentProps[] = await ctx.db.students.findMany({
                where: {
                    isAssign: false
                }
            });
            return students;
        } catch (error) {
            if (error instanceof TRPCClientError) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error("Something went wrong.");
        }
    }),

    createStudent: publicProcedure
        .input(z.object({
            studentName: z.string(),
            fatherName: z.string(),
            bform: z.string(),
            cnic: z.string(),
            dob: z.string(),
            doa: z.string(),
            gender: z.string(),
            religion: z.string(),
            tribe: z.string(),
            occupation: z.string(),
            address: z.string(),
            permanentAddress: z.string(),
            contact: z.string(),
            additionalContact: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {

                await ctx.db.students.create({
                    data: {
                        studentName: input.studentName,
                        fatherName: input.fatherName,
                        bform: input.bform,
                        cnic: input.cnic,
                        dob: input.dob,
                        doa: input.doa,
                        gender: input.gender === 'M' ? "MALE" : "FEMALE",
                        religion: input.religion === 'M' ? "MUSLIM" : input.religion === 'C' ? "CHRISTIAN" : "OTHERS",
                        tribe: input.tribe,
                        occupation: input.occupation,
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

    deleteStudentsByIds: publicProcedure
        .input(z.object({
            studentIds: z.string().array(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.db.students.deleteMany({
                    where: {
                        studentId: {
                            in: input.studentIds,
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