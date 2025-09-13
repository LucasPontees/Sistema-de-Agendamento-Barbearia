/*
  Warnings:

  - You are about to drop the `Especialidades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Especialidades" DROP CONSTRAINT "Especialidades_barbeiroId_fkey";

-- DropTable
DROP TABLE "Especialidades";

-- CreateTable
CREATE TABLE "_BarbeiroServicos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BarbeiroServicos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BarbeiroServicos_B_index" ON "_BarbeiroServicos"("B");

-- AddForeignKey
ALTER TABLE "_BarbeiroServicos" ADD CONSTRAINT "_BarbeiroServicos_A_fkey" FOREIGN KEY ("A") REFERENCES "Barbeiro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarbeiroServicos" ADD CONSTRAINT "_BarbeiroServicos_B_fkey" FOREIGN KEY ("B") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
