
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { RegisterRouter } from "./routers/register";
import { ClassRouter } from "./routers/class";
import { StudentRouter } from "./routers/student";


export const appRouter = createTRPCRouter({
    register:RegisterRouter,
    class: ClassRouter,
    student:StudentRouter
});


export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);