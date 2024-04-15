"use client";

import MoreActions from "@/components/MoreActions";
import AddStock from "@/components/AddStock";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
} from "@/components/ui/table";
import { SellItem } from "@/components/SellItem";
import { item } from "@/types/supabase";

/////////////////////////// To Move Siguro ///////////////////////////
async function handleAddStock(
  item: item,
  expiryDate: string,
  qtyToAdd: number,
) {
  const supabase = createClient();
  const date = new Date().toLocaleDateString();
  const earliestExpiry =
    (item.expiry ?? expiryDate) < expiryDate! ? item.expiry : expiryDate;

  try {
    const { error } = await supabase
      .from("items")
      .update({ quantity: item.quantity + qtyToAdd, expiry: earliestExpiry })
      .eq("id", item.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

export default function ItemsTable({ data }: { data: item[] }) {
  const currency = "₱";
  return (
    <div className="flex items-center justify-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Earliest Expiry Date</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {data?.map((item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.sales}</TableCell>
              <TableCell>{item.expiry}</TableCell>
              <TableCell>
                {currency}
                {item.price}
              </TableCell>
              <TableCell>
                <AddStock item={item} handleAddStock={handleAddStock} />
              </TableCell>
              <TableCell>
                <SellItem item={item} />
              </TableCell>
              <TableCell>
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
