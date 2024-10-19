/*
  Warnings:

  - You are about to drop the column `address` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `fcnic` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `employees` table. All the data in the column will be lost.
  - You are about to alter the column `employeeName` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `fatherName` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `cnic` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(15)`.
  - You are about to alter the column `education` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `additionalContact` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - Added the required column `designation` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNo` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residentialAddress` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dob` on the `employees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `doj` on the `employees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `employees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Married', 'Unmarried', 'Widow', 'Divorced');

-- CreateEnum
CREATE TYPE "Designation" AS ENUM ('Principal', 'Admin', 'Head', 'Clerk', 'Teacher', 'Worker');

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "address",
DROP COLUMN "contact",
DROP COLUMN "fcnic",
DROP COLUMN "permanentAddress",
DROP COLUMN "religion",
ADD COLUMN     "designation" "Designation" NOT NULL,
ADD COLUMN     "maritalStatus" "MaritalStatus" NOT NULL,
ADD COLUMN     "mobileNo" VARCHAR(13) NOT NULL,
ADD COLUMN     "residentialAddress" TEXT NOT NULL,
ALTER COLUMN "employeeName" DROP DEFAULT,
ALTER COLUMN "employeeName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "fatherName" DROP DEFAULT,
ALTER COLUMN "fatherName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "cnic" DROP DEFAULT,
ALTER COLUMN "cnic" SET DATA TYPE CHAR(15),
DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
DROP COLUMN "doj",
ADD COLUMN     "doj" TIMESTAMP(3) NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "education" DROP DEFAULT,
ALTER COLUMN "education" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "additionalContact" DROP NOT NULL,
ALTER COLUMN "additionalContact" DROP DEFAULT,
ALTER COLUMN "additionalContact" SET DATA TYPE VARCHAR(13);

-- CreateIndex
CREATE INDEX "employees_employeeName_idx" ON "employees"("employeeName");

-- CreateIndex
CREATE INDEX "employees_cnic_idx" ON "employees"("cnic");
