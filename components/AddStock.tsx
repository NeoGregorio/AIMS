"use client";

import { useState } from "react";

type ItemProps = {
  itemID: number;
  oldQty: number;
  handleAddStock: (itemID: number, newQty: number) => Promise<any>;
};

export default function AddStock({
  itemID,
  oldQty,
  handleAddStock,
}: ItemProps) {
  const [newQty, setNewQty] = useState("oldQty");

  function HandleClick() {
    const newValue = parseInt(newQty); // Convert to number

    if (newValue === oldQty) return; // If newQty is the same as the oldQty, return

    if (isNaN(newValue)) {
      // If no value is entered, return
      alert("Please Enter a Number");
      return;
    }
    if (newValue < 0) {
      // If the value is negative, return
      alert("Stock Cannot be Negative");
      return;
    }
    // If the value is valid, update the stock
    handleAddStock(itemID, newValue).then(() => {
      window.location.reload();
    });
  }

  return (
    <>
      <input
        type="number"
        placeholder="Add Stock"
        style={{ width: "90px" }}
        onChange={(e) => setNewQty(e.target.value)}
      />
      <button
        type="submit"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        onClick={HandleClick}
      >
        Submit
      </button>
    </>
  );
}
