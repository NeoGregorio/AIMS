"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { item } from "@/types/supabase";

type SellItemProps = {
  item: item;
};

async function createSalesRecord(item_id: number, qtyToSell: number) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data, error } = await supabase.from("salesrecord").insert([
      {
        item_id,
        quantity: qtyToSell,
        date: new Date().toISOString(),
        user_id: user?.id,
      },
    ]);
  } catch (error: any) {
    if (error.message.includes("NetworkError")) {
      alert("Database Connection Not Found");
    } else {
      alert(error.message);
    }
  }
}

async function handleSellItem(item: item, qtyToSell: number) {
  const supabase = createClient();

  try {
    const { error: error_item_table } = await supabase
      .from("items")
      .update({
        quantity: item.quantity - qtyToSell,
        sales: item.sales + qtyToSell,
      })
      .eq("id", item.id);

    const { data: purchaseRecords, error: error_fetch_purchase } =
      await supabase
        .from("purchaserecord")
        .select("current_quantity, id, expiry")
        .eq("item_id", item.id)
        .neq("current_quantity", 0)
        .order("expiry", { ascending: true });

    if (!purchaseRecords || purchaseRecords.length === 0) {
      alert("Out of stock!");
      return;
    }

    for (let record of purchaseRecords) {
      if (qtyToSell <= 0) break;

      let quantityToDeduct = Math.min(record.current_quantity, qtyToSell);
      qtyToSell -= quantityToDeduct;

      const { error: error_purchase_table } = await supabase
        .from("purchaserecord")
        .update({
          current_quantity: record.current_quantity - quantityToDeduct,
        })
        .eq("id", record.id);

      if (error_purchase_table) throw error_purchase_table;
    }

    const { data: earliestExpiryRecord, error: error_fetch_earliest_expiry } =
      await supabase
        .from("purchaserecord")
        .select("expiry")
        .eq("item_id", item.id)
        .neq("current_quantity", 0)
        .order("expiry", { ascending: true })
        .limit(1)
        .single();

    const newEarliestExpiry = earliestExpiryRecord?.expiry ?? null;
    console.log(newEarliestExpiry);

    const { error: error_update_expiry } = await supabase
      .from("items")
      .update({
        expiry: newEarliestExpiry,
      })
      .eq("id", item.id);

    if (error_item_table) throw error_item_table;
    if (error_fetch_purchase) throw error_fetch_purchase;
    if (error_fetch_earliest_expiry) throw error_fetch_earliest_expiry;
    if (error_update_expiry) throw error_update_expiry;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

export function SellItem({ item }: SellItemProps) {
  const [qtyToSell, setQtyToSell] = useState("");
  const _qtyToSell = parseInt(qtyToSell); // Convert to number

  function handleClick() {
    if (isNaN(_qtyToSell)) {
      alert("Please enter a valid quantity");
    } else if (_qtyToSell <= 0) {
      alert("Please enter a valid quantity");
    } else if (_qtyToSell > item.quantity) {
      alert("Not enough stock to sell");
    } else {
      createSalesRecord(item.id, _qtyToSell);
      handleSellItem(item, _qtyToSell).then(() =>
        window.location.replace("/inventory?message=Stock sold successfully"),
      );
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="underline text-red-600">
        <span>Sell</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Sell {item?.name}</DialogTitle>
          <DialogDescription>
            Sold this item to your customers? Log how many you sold!
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-2 py-4">
            <div className="grid grid-cols-2 items-center gap-5">
              <Label htmlFor="quantity" className="text-left">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                className="text-left col-span-1"
                onChange={(e) => setQtyToSell(e.target.value)}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <button
            type="submit"
            className="btn-generic text-sm"
            onClick={handleClick}
            id="sellstockbtn"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
