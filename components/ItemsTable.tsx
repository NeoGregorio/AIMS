"use client";
import MoreActions from "@/components/MoreActions";
import AddStock from "@/components/AddStock";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { SellItem } from "@/components/SellItem";

type ItemProps = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  sales: number;
  expiryDate: string;
  price: number;
};

/////////////////////////// To Move Siguro ///////////////////////////
async function handleAddStock(
  itemID: number,
  currentQty: number,
  qtyToAdd: number
) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("items")
      .update({ quantity: currentQty + qtyToAdd })
      .eq("id", itemID);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

async function handleExpiryDate(itemID: number, expiryDate: string) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("items")
      .update({ expiry: expiryDate })
      .eq("id", itemID);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

export default function ItemsTable({
  id,
  name,
  category,
  quantity,
  sales,
  expiryDate,
  price,
}: ItemProps) {
  const currency = "₱";
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{sales}</TableCell>
      <TableCell>{expiryDate}</TableCell>
      <TableCell>
        {currency}
        {price}
      </TableCell>
      <TableCell>
        <AddStock
          itemID={id}
          itemName={name}
          currentQty={quantity}
          handleAddStock={handleAddStock}
          handleExpiryDate={handleExpiryDate}
        />
      </TableCell>
      <TableCell>
        <SellItem />
      </TableCell>
      <TableCell>
        <MoreActions itemID={id} itemName={name} currentQty={quantity} />
      </TableCell>
    </TableRow>
  );
}
