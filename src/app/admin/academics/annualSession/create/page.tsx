import { SessionCards } from "~/app/_components/shared/cards/SessionCard";
import { SessionCreationDialog } from "~/app/_components/shared/forms/annualSession/SessionCreation";

export default function SessionRegistration() {
  return (
    <section className="grid gap-2">
      <div className="min-h-screen bg-yellow-100/50 sm:px-6">
        <h1 className="p-6 text-center font-serif text-5xl font-bold text-green-800">
          Session Management
        </h1>
        <SessionCards />
        <SessionCreationDialog />
      </div>
    </section>
  );
}