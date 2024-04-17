"use client";

import MoreActions from "@/components/MoreActions";
import AddStock from "@/components/AddStock";
import { SellItem } from "@/components/SellItem";
import { item } from "@/types/supabase";

import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
} from "@/components/ui/table";

export default function ItemsTable({ data }: { data: item[] }) {
  const currency = "₱";

  return (
    <div className="flex w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/12">Name</TableHead>
            <TableHead className="w-2/12">Category</TableHead>
            <TableHead className="w-1/12">Quantity</TableHead>
            <TableHead className="w-1/12">Sales</TableHead>
            <TableHead className="w-2/12">Earliest Expiry</TableHead>
            <TableHead className="w-1/12">Price</TableHead>
            <TableHead className="w-1/12"></TableHead>
            <TableHead className="w-1/12"></TableHead>
            <TableHead className="w-1/12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full bg-white">
          {data?.map((item) => (
            <TableRow>
              <TableCell className="w-2/12">{item.name}</TableCell>
              <TableCell className="w-2/12">{item.category}</TableCell>
              <TableCell className="w-1/12">{item.quantity}</TableCell>
              <TableCell className="w-1/12">{item.sales}</TableCell>
              <TableCell className="w-2/12">{item.expiry ?? "N/A"}</TableCell>
              <TableCell className="w-1/12">
                {currency}
                {item.price}
              </TableCell>
              <TableCell className="w-1/12">
                <AddStock item={item} />
              </TableCell>
              <TableCell className="w-1/12">
                <SellItem item={item} />
              </TableCell>
              <TableCell className="w-1/12">
                <MoreActions
                  itemID={item.id}
                  itemName={item.name}
                  currentQty={item.quantity}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
