"use client";

import { useState } from "react";
import { Plant } from "./InventoryTable";

export default function AddPlantModal({ children, onAdd }: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const handleSubmit = () => {
    onAdd({
      id: "PL" + Date.now(),
      ...form,
    });
  };

  return (
    <div>
      {children}
      {/* Replace with shadcn Dialog later */}
      <button onClick={handleSubmit}>Quick Add</button>
    </div>
  );
}