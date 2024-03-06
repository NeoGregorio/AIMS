"use client";
import { useState, useEffect } from "react";
//import { GetItems } from "../app/inventory/page";
import { TableCell, TableRow } from "@/components/ui/table";

type ItemProps = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  sales: number;
  expiryDate: string;
  price: number;
};

export default function ItemsTable({
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
    </TableRow>
  );
}
