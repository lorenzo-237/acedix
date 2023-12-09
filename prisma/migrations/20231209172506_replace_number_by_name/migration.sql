/*
  Warnings:

  - You are about to drop the column `number` on the `versions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_id,name]` on the table `versions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `versions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "versions_project_id_number_key";

-- AlterTable
ALTER TABLE "versions" DROP COLUMN "number",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "versions_project_id_name_key" ON "versions"("project_id", "name");
