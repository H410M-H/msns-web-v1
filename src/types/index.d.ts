

type ClassProps = {
    classId: string
    className: string
    classSlug: string
    category: string
}

type StudentProps = {
    studentId: string
    registrationNumber: string
    studentMobile: string
    fatherMobile: string
    admissionNumber: string
    studentName: string
    gender: string
    dateOfBirth: string
    fatherName: string
    studentCNIC: string
    fatherCNIC: string
    fatherProfession?: string
    bloodGroup?: string
    guardianName?: string
    caste?: string
    registrationDate: string
    currentAddress: string
    permanentAddress: string
    medicalProblem?: string
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

type FeeProps = {
    feeId: string
    feeName: string
    feeTuition: number
    feePaper: number
    feeSport: number
    feeIdcard: number
    feeComm: number
    createdAt: string
    updatedAt: string
  };
  


type ClassStudentProps = {
    scId: string
    studentId: string
    classId: string
    sessionId: string
    class : ClassProps
    student:StudentProps
    session:SessionProps
}

type ClassFeeProps = {
    scId: string
    feeId: string
    classId: string
    sessionId: string
    class : ClassProps
    fee:FeeProps
    session:SessionProps
}


