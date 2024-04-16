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

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { item } from "@/types/supabase";

type SellItemProps = {
  item: item;
};

async function CreateSalesRecord(item_id: number, qtyToSell: number) {
  const supabase = createClient();
  // Get current user
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
  // const earliestExpiry =
  //   (item.expiry ?? expiryDate) < expiryDate! ? item.expiry : expiryDate;

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
        .order("expiry", { ascending: true })
        .limit(1);

    if (!purchaseRecords || purchaseRecords.length === 0) {
      console.error("No purchase records found for item:", item.id);
      alert("Out of stock!");
      return;
    }

    const { error: error_purchase_table } = await supabase
      .from("purchaserecord")
      .update({
        current_quantity: purchaseRecords[0].current_quantity - qtyToSell,
      })
      .eq("id", purchaseRecords[0].id);

    if (error_item_table) throw error_item_table;
    if (error_fetch_purchase) throw error_fetch_purchase;
    if (error_purchase_table) throw error_purchase_table;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

export function SellItem({ item }: SellItemProps) {
  const [qtyToSell, setQtyToSell] = useState("");

  function handleClick() {
    const _qtyToSell = parseInt(qtyToSell); // Convert to number
    CreateSalesRecord(item.id, _qtyToSell);
    handleSellItem(item, _qtyToSell).then(() =>
      window.location.replace("/inventory?message=Stock sold successfully")
    );
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
            id={`${item.name}restockconfirm`}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
