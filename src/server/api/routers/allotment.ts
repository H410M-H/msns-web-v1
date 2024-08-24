import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";



export const AlotmentRouter = createTRPCRouter({

    addToClass: publicProcedure
        .input(z.object({
            classId: z.string(),
            studentId: z.string(),
            sessionId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            try {

                await ctx.db.students.update({
                    where: { studentId: input.studentId },
                    data: {
                        isAssign: true
                    }
                })
                await ctx.db.studentClass.create({
                    data: {
                        classId: input.classId,
                        studentId: input.studentId,
                        sessionId: input.sessionId
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }),

    getStudentsInClass: publicProcedure
        .input(z.object({ classId: z.string() }))
        .query(async ({ ctx, input }) => {
            try {

                const data : ClassStudentProps[] = await ctx.db.studentClass.findMany({
                    where: { classId: input.classId },
                    include: {
                        class: true,
                        student: true,
                        session: true
                    }
                })
                return data
            } catch (error) {
                console.error(error)
            }
        })

})