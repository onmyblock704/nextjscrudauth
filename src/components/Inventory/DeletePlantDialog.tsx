"use client";

export default function DeletePlantDialog({ children, onDelete }: any) {
  return (
    <div>
      {children}
      <button onClick={onDelete}>Confirm Delete</button>
    </div>
  );
}