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

async function handleSellItem(item: item, qtyToSell: number) {
  const supabase = createClient();
  // const earliestExpiry =
  //   (item.expiry ?? expiryDate) < expiryDate! ? item.expiry : expiryDate;

  try {
    const { error } = await supabase
      .from("items")
      .update({
        quantity: item.quantity - qtyToSell,
        sales: item.sales + qtyToSell,
      })
      .eq("id", item.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

export function SellItem({ item }: SellItemProps) {
  const [qtyToSell, setQtyToSell] = useState("");

  function handleClick() {
    const _qtyToSell = parseInt(qtyToSell); // Convert to number

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
          <DialogTitle>Sell itemName</DialogTitle>
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
