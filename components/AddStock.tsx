"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

type AddStockProps = {
  itemID: number;
  oldQty: number;
  handleAddStock: (id: number, newQty: number) => Promise<any>;
  handleExpiryDate: (id: number, expiryDate: string) => Promise<any>;
};

async function CreatePurchaseRecord(
  item_id: number,
  quantity: number,
  expiry: string
) {
  const supabase = createClient();
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data, error } = await supabase.from("purchaserecord").insert([
      {
        item_id,
        quantity,
        current_quantity: quantity,
        expiry,
        date: new Date().toISOString(),
        user_id: user?.id,
      },
    ]);
    window.location.reload();
    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  }
}

export default function AddStock({
  itemID,
  oldQty,
  handleAddStock,
  handleExpiryDate,
}: AddStockProps) {
  const [newQty, setNewQty] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  function handleClick() {
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
    // If the value is valid, update the stock and expiry date
    if (expiryDate === "") {
      alert("Please Enter an Expiry Date");
      return;
    }

    CreatePurchaseRecord(itemID, newValue, expiryDate);
    handleExpiryDate(itemID, expiryDate);
    handleAddStock(itemID, newValue).then(() => window.location.reload());
  }

  return (
    <>
      <input
        type="number"
        placeholder="Add Stock"
        style={{ width: "90px" }}
        onChange={(e) => setNewQty(e.target.value)}
      />
      <input type="date" onChange={(e) => setExpiryDate(e.target.value)} />
      <button
        type="submit"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        onClick={handleClick}
      >
        Save
      </button>
    </>
  );
}
