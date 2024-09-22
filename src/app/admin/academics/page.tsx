import { AcademicCards } from "~/app/_components/shared/cards/AcademicCard";
import { SessionCards } from "~/app/_components/shared/cards/SessionCard";
import { Separator } from "~/components/ui/separator";

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-yellow-100/50 p-4 sm:p-6">
      <div className="container mx-auto">
        <div className="relative overflow-hidden mb-6">
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight p-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-500 hover:from-orange-400 hover:to-green-500 transition-all duration-300">
              Academics Management
            </span>
          </h1>
        </div>
        <Separator className="bg-green-900 my-4" />
        <div className="flex-cols-4 gap-6 lg:gap-8 justify-center items-center">
          <AcademicCards />
        </div>
        <Separator className="bg-green-900 my-4" />
        <div className="flex-cols-4 gap-6 lg:gap-8 justify-center items-center">
          <SessionCards />
        </div>
        <Separator className="bg-green-900 my-4" />
      </div>
    </main>
  );
}
