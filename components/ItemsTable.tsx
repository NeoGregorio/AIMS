"use client";
import { useState, useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import MoreActions from "@/components/MoreActions";

type ItemProps = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  sales: number;
  expiryDate: string;
  price: number;
};

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
    </TableRow>
  );
}
