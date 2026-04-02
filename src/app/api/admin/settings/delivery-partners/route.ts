import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const setting = await prisma.siteSetting.findUnique({ where: { key: "deliveryPartners" } });
  const data = setting ? JSON.parse(setting.value) : [];
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();

  await prisma.siteSetting.upsert({
    where: { key: "deliveryPartners" },
    create: { key: "deliveryPartners", value: JSON.stringify(body) },
    update: { value: JSON.stringify(body) },
  });

  return NextResponse.json({ success: true, data: body });
}
