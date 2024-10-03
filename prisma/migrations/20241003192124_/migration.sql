/*
  Warnings:

  - Added the required column `sessionId` to the `SalaryAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `SalaryIncrement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalaryAssignment" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalaryIncrement" ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SalaryAssignment" ADD CONSTRAINT "SalaryAssignment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryIncrement" ADD CONSTRAINT "SalaryIncrement_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
