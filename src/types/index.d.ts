type ClassProps = {
  classId: string
  className: string
  section: string
  category: "Montessori" | "Primary" | "Middle" | "SSC-I" | "SSC-II"
  fee: number
}

type StudentProps = {
  studentId: string
  registrationNumber: string
  studentMobile: string
  fatherMobile: string
  admissionNumber: string
  studentName: string
  gender: "MALE" | "FEMALE" | "CUSTOM"
  dateOfBirth: string
  fatherName: string
  studentCNIC: string
  fatherCNIC: string
  fatherProfession?: string
  bloodGroup?: string | null
  guardianName?: string
  caste?: string
  registrationDate: string
  currentAddress: string
  permanentAddress: string
  medicalProblem?: string
  isAssign: boolean
  discount: number
  discountbypercent: number
}

type EmployeeProps = {
  employeeId: string
  employeeName: string
  fatherName: string
  cnic: string
  fcnic: string
  dob: string
  doj: string
  gender: string
  religion: string
  education: string
  address: string
  permanentAddress: string
  contact: string
  additionalContact: string
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
}

type ClassStudentProps = {
  scId: string
  student: StudentProps
  class: ClassProps
  session: SessionProps
}

type ClassFeeProps = {
  scId: string
  feeId: string
  classId: string
  sessionId: string
  class: ClassProps
  fee: FeeProps
  session: SessionProps
}