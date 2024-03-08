"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export function PurchaseHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Quantity</TableHead>
          <TableHead>Expiry</TableHead>
          <TableHead>Date of Purchase</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>2002-05-02</TableCell>
          <TableCell>2002-05-25</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
