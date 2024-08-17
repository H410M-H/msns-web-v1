import { TRPCClientError } from "@trpc/client"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const ClassRouter = createTRPCRouter({

    getClasses: publicProcedure.query(async ({ ctx }) => {
        try {
            const classes: ClassProps[] = await ctx.db.classes.findMany()
            return classes
        } catch (error) {
            if (error instanceof TRPCClientError) {
                console.error(error.message)
                throw new Error(error.message)
            }
            console.error(error)
            throw new Error("Something went wrong.")
        }
    }),

    createClass: publicProcedure
    .input(z.object({
      className: z.string(),
      classSlug: z.string(),
      category: z.enum(["Montessori", "Primary", "Middle", "SSC-I", "SSC-II"]),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.classes.create({
            data: {
              className: input.className,
              classSlug: input.classSlug,
              category: input.category,
            }
          });
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
                }
                console.error(error)
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Something went wrong." })
            }
        }),

    deleteClassesByIds: publicProcedure
        .input(z.object({
            classIds: z.string().array(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {

                await ctx.db.classes.deleteMany({
                    where: {
                        classId: {
                            in: input.classIds
                        }
                    }
                })
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    console.error(error.message)
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
                }
                console.error(error)
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Something went wrong." })
            }
        })
})