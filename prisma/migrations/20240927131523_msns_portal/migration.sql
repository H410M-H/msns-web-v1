-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'CLERK');

-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('Montessori', 'Primary', 'Middle', 'SSC_I', 'SSC_II');

-- CreateTable
CREATE TABLE "classes" (
    "classId" TEXT NOT NULL,
    "className" TEXT NOT NULL DEFAULT 'none',
    "section" TEXT NOT NULL DEFAULT 'ROSE',
    "category" "ClassCategory" NOT NULL DEFAULT 'Montessori',
    "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "students" (
    "studentId" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "studentMobile" TEXT NOT NULL DEFAULT 'none',
    "fatherMobile" TEXT NOT NULL DEFAULT 'none',
    "admissionNumber" TEXT NOT NULL,
    "studentName" TEXT NOT NULL DEFAULT 'none',
    "gender" "Gender" NOT NULL DEFAULT 'CUSTOM',
    "dateOfBirth" TEXT NOT NULL DEFAULT 'none',
    "fatherName" TEXT NOT NULL DEFAULT 'none',
    "studentCNIC" TEXT NOT NULL DEFAULT '0000-0000000-0',
    "fatherCNIC" TEXT NOT NULL DEFAULT '0000-0000000-0',
    "fatherProfession" TEXT NOT NULL DEFAULT 'none',
    "bloodGroup" TEXT DEFAULT 'none',
    "guardianName" TEXT DEFAULT 'none',
    "caste" TEXT NOT NULL DEFAULT 'none',
    "registrationDate" TEXT NOT NULL DEFAULT 'none',
    "currentAddress" TEXT NOT NULL DEFAULT 'none',
    "permanentAddress" TEXT NOT NULL DEFAULT 'none',
    "medicalProblem" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAssign" BOOLEAN NOT NULL DEFAULT false,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountbypercent" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "students_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "employees" (
    "employeeId" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL DEFAULT 'none',
    "fatherName" TEXT NOT NULL DEFAULT 'none',
    "cnic" TEXT NOT NULL DEFAULT '00000-0000000-0',
    "fcnic" TEXT NOT NULL DEFAULT '00000-0000000-0',
    "dob" TEXT NOT NULL DEFAULT 'none',
    "doj" TEXT NOT NULL DEFAULT 'none',
    "gender" TEXT NOT NULL DEFAULT 'none',
    "religion" TEXT NOT NULL DEFAULT 'none',
    "education" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "permanentAddress" TEXT NOT NULL DEFAULT 'none',
    "contact" TEXT NOT NULL DEFAULT 'none',
    "additionalContact" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "sessions" (
    "sessionId" TEXT NOT NULL,
    "sessionName" TEXT NOT NULL DEFAULT 'none',
    "sessionFrom" TEXT NOT NULL DEFAULT 'none',
    "sessionTo" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "fees" (
    "feeId" TEXT NOT NULL,
    "feeName" TEXT NOT NULL,
    "feeTuition" INTEGER NOT NULL,
    "feePaper" INTEGER NOT NULL,
    "feeSport" INTEGER NOT NULL,
    "feeIdcard" INTEGER NOT NULL,
    "feeComm" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fees_pkey" PRIMARY KEY ("feeId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "StudentClass" (
    "scId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "StudentClass_pkey" PRIMARY KEY ("scId")
);

-- CreateIndex
CREATE INDEX "classes_className_idx" ON "classes"("className");

-- CreateIndex
CREATE UNIQUE INDEX "students_registrationNumber_key" ON "students"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "students_admissionNumber_key" ON "students"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "StudentClass" ADD CONSTRAINT "StudentClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClass" ADD CONSTRAINT "StudentClass_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClass" ADD CONSTRAINT "StudentClass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
