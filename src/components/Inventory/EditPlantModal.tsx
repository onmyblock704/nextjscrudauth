"use client";

import { useState } from "react";
import { Plant } from "./InventoryTable";

export default function EditPlantModal({ plant, onUpdate, children }: any) {
  const [form, setForm] = useState(plant);

  const handleUpdate = () => {
    onUpdate(form);
  };

  return (
    <div>
      {children}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}