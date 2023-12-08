/*
  Warnings:

  - A unique constraint covering the columns `[version_id,name]` on the table `boards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[board_id,title]` on the table `lists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id,number]` on the table `versions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "boards_version_id_name_key" ON "boards"("version_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "lists_board_id_title_key" ON "lists"("board_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "versions_project_id_number_key" ON "versions"("project_id", "number");
