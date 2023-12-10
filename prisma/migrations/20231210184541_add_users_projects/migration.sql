-- CreateTable
CREATE TABLE "users_projects" (
    "user_id" INTEGER NOT NULL,
    "belongs" BOOLEAN NOT NULL,
    "project_id" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL,
    "lastDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_projects_user_id_project_id_key" ON "users_projects"("user_id", "project_id");

-- AddForeignKey
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
