import { EmployeeReg } from "~/app/_components/shared/forms/student/employeeCreation";

export default function FacultyRegistration(){

    return (
        <section className="grid gap-2">
        <div className="min-h-screen sm:px-6 bg-yellow-100/50">
        <h1 className="text-5xl font-serif font-bold text-green-800 text-center p-6">Employee Registration Portal</h1>
        <EmployeeReg/>
    </div>
        </section>
    )
}