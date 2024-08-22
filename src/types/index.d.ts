

type ClassProps = {
    classId: string
    className: string
    classSlug: string
    category: string
}

type StudentProps = {
    studentId: string
    studentName: string
    fatherName: string
    bform: string
    cnic: string,
    dob: string
    doa: string
    gender: string
    religion: string
    tribe: zstring
    occupation: string
    address: string
    permanentAddress: string
    contact: string
    additionalContact: z.string
}

type EmployeeProps = {
    employeeId: string
    employeeId: string
    employeeName: string
    fatherName: string
    cnic: string
    fcnic: string,
    dob: string
    doj: string
    gender: string
    religion: string
    education: string
    address: string
    permanentAddress: string
    contact: string
    additionalContact: z.string
}

type SessionProps = {
    sessionId: string
    sessionName: string
    sessionFrom: string
    sessionTo: string
}