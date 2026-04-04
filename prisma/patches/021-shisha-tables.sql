-- CreateEnum
CREATE TYPE "ShishaTableStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'TEMPORARILY_UNAVAILABLE');

-- CreateEnum
CREATE TYPE "ShishaBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- CreateTable
CREATE TABLE "ShishaTable" (
    "id" TEXT NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "capacity" INTEGER NOT NULL DEFAULT 4,
    "status" "ShishaTableStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShishaTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShishaBooking" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "bookingTime" TEXT NOT NULL,
    "endTime" TEXT,
    "guests" INTEGER NOT NULL,
    "status" "ShishaBookingStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShishaBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShishaCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShishaCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShishaMenuItem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION,
    "image" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "intensity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShishaMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShishaTable_tableNumber_key" ON "ShishaTable"("tableNumber");

-- CreateIndex
CREATE INDEX "ShishaTable_tableNumber_idx" ON "ShishaTable"("tableNumber");

-- CreateIndex
CREATE INDEX "ShishaTable_status_idx" ON "ShishaTable"("status");

-- CreateIndex
CREATE INDEX "ShishaTable_isActive_idx" ON "ShishaTable"("isActive");

-- CreateIndex
CREATE INDEX "ShishaBooking_tableId_idx" ON "ShishaBooking"("tableId");

-- CreateIndex
CREATE INDEX "ShishaBooking_bookingDate_idx" ON "ShishaBooking"("bookingDate");

-- CreateIndex
CREATE INDEX "ShishaBooking_status_idx" ON "ShishaBooking"("status");

-- CreateIndex
CREATE INDEX "ShishaBooking_bookingDate_bookingTime_idx" ON "ShishaBooking"("bookingDate", "bookingTime");

-- CreateIndex
CREATE UNIQUE INDEX "ShishaCategory_slug_key" ON "ShishaCategory"("slug");

-- CreateIndex
CREATE INDEX "ShishaCategory_slug_idx" ON "ShishaCategory"("slug");

-- CreateIndex
CREATE INDEX "ShishaCategory_sortOrder_idx" ON "ShishaCategory"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ShishaMenuItem_slug_key" ON "ShishaMenuItem"("slug");

-- CreateIndex
CREATE INDEX "ShishaMenuItem_categoryId_idx" ON "ShishaMenuItem"("categoryId");

-- CreateIndex
CREATE INDEX "ShishaMenuItem_slug_idx" ON "ShishaMenuItem"("slug");

-- CreateIndex
CREATE INDEX "ShishaMenuItem_isAvailable_idx" ON "ShishaMenuItem"("isAvailable");

-- CreateIndex
CREATE INDEX "ShishaMenuItem_isFeatured_idx" ON "ShishaMenuItem"("isFeatured");

-- CreateIndex
CREATE INDEX "ShishaMenuItem_sortOrder_idx" ON "ShishaMenuItem"("sortOrder");

-- AddForeignKey
ALTER TABLE "ShishaBooking" ADD CONSTRAINT "ShishaBooking_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "ShishaTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShishaMenuItem" ADD CONSTRAINT "ShishaMenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ShishaCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
