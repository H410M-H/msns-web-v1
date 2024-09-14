import { TRPCError } from "@trpc/server"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"

const studentSchema = z.object({
  registrationNumber: z.string(),
  studentMobile: z.string(),
  fatherMobile: z.string(),
  admissionNumber: z.string(),
  studentName: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'CUSTOM']),
  dateOfBirth: z.string(),
  fatherName: z.string(),
  studentCNIC: z.string(),
  fatherCNIC: z.string(),
  fatherProfession: z.string(),
  bloodGroup: z.string().optional(),
  guardianName: z.string().optional(),
  caste: z.string(),
  registrationDate: z.string(),
  currentAddress: z.string(),
  permanentAddress: z.string(),
  medicalProblem: z.string().optional(),
})

export const StudentRouter = createTRPCRouter({
  getStudents: publicProcedure.query(async ({ ctx }) => {
    try {
      const students = await ctx.db.students.findMany()
      return students
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong.",
      })
    }
  }),

  getUnAllocateStudents: publicProcedure.query(async ({ ctx }) => {
    try {
      const students = await ctx.db.students.findMany({
        where: {
          isAssign: false
        }
      })
      return students
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong.",
      })
    }
  }),

  createStudent: publicProcedure
    .input(studentSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.students.create({
          data: {
            ...input,
            dateOfBirth: new Date(input.dateOfBirth).toISOString(),
            registrationDate: new Date(input.registrationDate).toISOString(),
          }
        })
      } catch (error) {
        console.error(error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong'
        })
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
        })
      } catch (error) {
        console.error(error)
        throw new TRPCError({ 
          code: 'INTERNAL_SERVER_ERROR', 
          message: "Something went wrong." 
        })
      }
    }),
})