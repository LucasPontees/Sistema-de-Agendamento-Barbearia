/*
  Warnings:

  - Added the required column `role` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPRESA', 'USUARIO');

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "role" "Role" NOT NULL;
