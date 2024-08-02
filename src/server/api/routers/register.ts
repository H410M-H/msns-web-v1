import { createTRPCRouter, publicProcedure } from "../trpc";





export const RegisterRouter = createTRPCRouter({
    hello: publicProcedure.query(()=>{
        return `hello`
    })
})