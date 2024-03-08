"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export function SalesHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Quantity</TableHead>
          <TableHead>Date of Sale</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>2002-05-02</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
