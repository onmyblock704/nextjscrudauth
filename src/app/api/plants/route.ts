import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

/* ------------------ AUTH ------------------ */
async function getUser() {
  const user = await stackServerApp.getUser();
    if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  return user;
}

/* ------------------ GET (ONLY USER DATA) ------------------ */
export async function GET() {
  const user = await getUser();

  const plants = await prisma.plant.findMany({
    where: { userId: user.id }, // 🔥 LOCKED
  });

  return NextResponse.json(plants);
}

/* ------------------ CREATE ------------------ */
export async function POST(req: Request) {
  const user = await getUser();
  const body = await req.json();

  const plant = await prisma.plant.create({
    data: {
      name: body.name,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock),
      userId: user.id, // 🔐 OWNER SET HERE
    },
  });

  return NextResponse.json(plant);
}

/* ------------------ UPDATE (OWNERSHIP CHECK) ------------------ */
export async function PUT(req: Request) {
  const user = await getUser();
  const body = await req.json();

  // 🔥 verify ownership FIRST
  const existing = await prisma.plant.findUnique({
    where: { id: body.id },
  });

  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const updated = await prisma.plant.update({
    where: { id: body.id },
    data: {
      name: body.name,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock),
    },
  });

  return NextResponse.json(updated);
}

/* ------------------ DELETE (OWNERSHIP CHECK) ------------------ */
export async function DELETE(req: Request) {
  const user = await getUser();
  const { id } = await req.json();

  const existing = await prisma.plant.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.plant.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}