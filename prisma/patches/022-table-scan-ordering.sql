-- 022: Table Scan Ordering Feature
-- Adds support for QR code table scanning with menu type differentiation

-- CreateEnum: MenuType for distinguishing restaurant vs shisha menu
CREATE TYPE "MenuType" AS ENUM ('RESTAURANT', 'SHISHA');

-- CreateEnum: OrderSource for tracking how orders were placed
CREATE TYPE "OrderSource" AS ENUM ('ONLINE', 'TABLE_SCAN');

-- Add table scan columns to Order table
ALTER TABLE "Order" ADD COLUMN "tableNumber" INTEGER;
ALTER TABLE "Order" ADD COLUMN "menuType" "MenuType";
ALTER TABLE "Order" ADD COLUMN "orderSource" "OrderSource" NOT NULL DEFAULT 'ONLINE';

-- Create indexes for table scan queries
CREATE INDEX "Order_tableNumber_idx" ON "Order"("tableNumber");
CREATE INDEX "Order_menuType_idx" ON "Order"("menuType");

-- Make OrderItem.menuItemId nullable (was required before)
-- This allows shisha-only orders without restaurant items
ALTER TABLE "OrderItem" ALTER COLUMN "menuItemId" DROP NOT NULL;

-- Add shisha menu item reference to OrderItem
ALTER TABLE "OrderItem" ADD COLUMN "shishaMenuItemId" TEXT;

-- Create index for shisha menu item lookups
CREATE INDEX "OrderItem_shishaMenuItemId_idx" ON "OrderItem"("shishaMenuItemId");

-- Add foreign key constraint for shisha menu items
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_shishaMenuItemId_fkey" 
  FOREIGN KEY ("shishaMenuItemId") REFERENCES "ShishaMenuItem"("id") 
  ON DELETE RESTRICT ON UPDATE CASCADE;
