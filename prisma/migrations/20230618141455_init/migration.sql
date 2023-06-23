-- CreateEnum
CREATE TYPE "AccountRoles" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ComplaintStatuses" AS ENUM ('WAITING', 'DOING', 'SOLVED', 'REJECTED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "role" "AccountRoles" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" UUID NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "number" VARCHAR(20) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "formattedAddress" VARCHAR(550) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "id" UUID NOT NULL,
    "status" "ComplaintStatuses" NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "solver_description" VARCHAR(5000),
    "location_id" UUID NOT NULL,
    "denunciator_id" UUID NOT NULL,
    "solver_id" UUID,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_denunciator_id_fkey" FOREIGN KEY ("denunciator_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_solver_id_fkey" FOREIGN KEY ("solver_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
