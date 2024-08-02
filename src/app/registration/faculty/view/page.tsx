import { EmployeeTable } from "~/app/_components/shared/tables/EmployeeTable";

export default function FacultyView(){

    return (
        <section className="grid mx-10">
            <h1 className="text-center text-5xl p-4 font-serif font-semibold text-green-800">Employee Credentials Detail</h1>
            <EmployeeTable />
        </section>
    )
}