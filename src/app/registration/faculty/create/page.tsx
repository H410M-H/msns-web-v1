import { EmployeeReg } from "~/app/_components/shared/forms/employee/employeeCreation";

export default function FacultyRegistration() {
  return (
    <section className="grid gap-2">
      <div className="min-h-screen bg-yellow-100/50 sm:px-6">
        <h1 className="p-6 text-center font-serif text-5xl font-bold text-green-800">
          Employee Registration Portal
        </h1>
        <EmployeeReg />
      </div>
    </section>
  );
}
