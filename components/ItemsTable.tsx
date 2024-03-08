"use client";
import { useState, useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import MoreActions from "@/components/MoreActions";
import AddStock from "@/components/AddStock";
import { createClient } from "@/utils/supabase/client";

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
async function handleAddStock(itemID: number, newQty: number) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("items")
      .update({ quantity: newQty })
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
        <MoreActions itemID={id} itemName={name} oldQty={quantity} />
      </TableCell>
      <TableCell>
        <AddStock
          itemID={id}
          oldQty={quantity}
          handleAddStock={handleAddStock}
        />
      </TableCell>
    </TableRow>
  );
}
