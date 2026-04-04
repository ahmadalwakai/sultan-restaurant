import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const number = searchParams.get("number");

  if (!type || !number) {
    return NextResponse.json(
      { valid: false, error: "Missing type or number parameter" },
      { status: 400 }
    );
  }

  if (!["restaurant", "shisha"].includes(type)) {
    return NextResponse.json(
      { valid: false, error: "Invalid table type" },
      { status: 400 }
    );
  }

  const tableNumber = parseInt(number, 10);
  if (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 100) {
    return NextResponse.json(
      { valid: false, error: "Invalid table number" },
      { status: 400 }
    );
  }

  try {
    let table;
    if (type === "restaurant") {
      table = await prisma.restaurantTable.findFirst({
        where: { tableNumber, isActive: true },
      });
    } else {
      table = await prisma.shishaTable.findFirst({
        where: { tableNumber, isActive: true },
      });
    }

    if (!table) {
      return NextResponse.json(
        { valid: false, error: "Table not found or inactive" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      table: {
        id: table.id,
        tableNumber: table.tableNumber,
        capacity: table.capacity,
        type,
      },
    });
  } catch (error) {
    console.error("Table validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate table" },
      { status: 500 }
    );
  }
}
