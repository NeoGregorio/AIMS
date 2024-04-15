"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

async function GetSalesHistory(itemID: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("salesrecord")
    .select()
    .eq("item_id", itemID)
    .order("date", { ascending: false });
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
}

export function SalesHistory({ itemID }: { itemID: number }) {
  const [data, setData] = useState<any[] | null>(null);

  // retrieve purchase records when itemID changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await GetSalesHistory(itemID);
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
            <TableHead>Date of Sale</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((record: any) => (
            <TableRow key={record.id}>
              <TableCell>{record.quantity}</TableCell>
              <TableCell>
                {new Date(record.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
