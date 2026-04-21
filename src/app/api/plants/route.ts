import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

/* ------------------ AUTH ------------------ */
async function getUser() {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("UNAUTHORIZED"); // ✅ FIX
  }

  return user;
}

/* ------------------ GET (ONLY USER DATA) ------------------ */
export async function GET() {
  try {
    const user = await getUser();

    const plants = await prisma.plant.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(plants);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

/* ------------------ CREATE ------------------ */
export async function POST(req: Request) {
  try {
    const user = await getUser();
    const body = await req.json();

    const plant = await prisma.plant.create({
      data: {
        name: body.name,
        category: body.category,
        price: Number(body.price),
        stock: Number(body.stock),
        userId: user.id,
      },
    });

    return NextResponse.json(plant);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

/* ------------------ UPDATE (OWNERSHIP CHECK) ------------------ */
export async function PUT(req: Request) {
  try {
    const user = await getUser();
    const body = await req.json();

    const existing = await prisma.plant.findUnique({
      where: { id: body.id },
    });

    if (!existing || existing.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
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
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

/* ------------------ DELETE (OWNERSHIP CHECK) ------------------ */
export async function DELETE(req: Request) {
  try {
    const user = await getUser();
    const { id } = await req.json();

    const existing = await prisma.plant.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.plant.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}