/*
  Warnings:

  - You are about to drop the column `especialidade` on the `Barbeiro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbeiro" DROP COLUMN "especialidade";

-- CreateTable
CREATE TABLE "Especialidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "foto" TEXT,
    "barbeiroId" INTEGER NOT NULL,

    CONSTRAINT "Especialidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Especialidades" ADD CONSTRAINT "Especialidades_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "Barbeiro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
