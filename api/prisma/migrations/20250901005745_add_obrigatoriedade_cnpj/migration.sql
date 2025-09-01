/*
  Warnings:

  - Made the column `cnpj` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "cnpj" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
