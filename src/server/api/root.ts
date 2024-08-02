
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { RegisterRouter } from "./routers/register";


export const appRouter = createTRPCRouter({
    register:RegisterRouter,
});


export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);