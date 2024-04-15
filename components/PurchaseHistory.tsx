"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "./ui/scroll-area";

async function GetPurchaseHistory(itemID: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("purchaserecord")
    .select()
    .eq("item_id", itemID)
    .order("date", { ascending: false });
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
}

export default function PurchaseHistory({ itemID }: { itemID: number }) {
  const [data, setData] = useState<any[] | null>(null);

  // retrieve purchase records when itemID changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await GetPurchaseHistory(itemID);
      setData(result);
    };
    fetchData();
  }, [itemID]);

  return (
    <ScrollArea className="h-[50vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quantity</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Date of Purchase</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.quantity}</TableCell>
              <TableCell>{record.expiry}</TableCell>
              <TableCell>{record.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
