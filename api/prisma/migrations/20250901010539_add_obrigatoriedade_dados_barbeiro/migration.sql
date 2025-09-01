/*
  Warnings:

  - Made the column `telefone` on table `Barbeiro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Barbeiro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `especialidade` on table `Barbeiro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `Servico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Barbeiro" ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "especialidade" SET NOT NULL;

-- AlterTable
ALTER TABLE "Servico" ALTER COLUMN "descricao" SET NOT NULL;
