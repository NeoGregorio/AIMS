"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

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

type AddStockProps = {
  item: item;
  handleAddStock: (
    item: item,
    expiryDate: string,
    qtyToAdd: number
  ) => Promise<any>;
};

async function CreatePurchaseRecord(
  item_id: number,
  currentQty: number,
  qtyToAdd: number,
  expiry: string
) {
  const supabase = createClient();
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data, error } = await supabase.from("purchaserecord").insert([
      {
        item_id,
        quantity: qtyToAdd,
        current_quantity: currentQty + qtyToAdd,
        expiry,
        date: new Date().toISOString(),
        user_id: user?.id,
      },
    ]);
    window.location.reload();
    if (error) throw error;
  } catch (error: any) {
    alert(error.message);
  }
}

export default function AddStock({ item, handleAddStock }: AddStockProps) {
  const [qtyToAdd, setQtyToAdd] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  function handleClick() {
    const _qtyToAdd = parseInt(qtyToAdd); // Convert to number

    if (isNaN(_qtyToAdd)) {
      // If no value is entered, return
      alert("Please Enter a Number");
      return;
    }
    if (_qtyToAdd <= 0) {
      // If the value is negative, return
      alert("Please Add Stock");
      return;
    }
    // If the value is valid, update the stock and expiry date
    if (expiryDate === "") {
      alert("Please Enter an Expiry Date");
      return;
    }

    CreatePurchaseRecord(item.id, item.quantity, _qtyToAdd, expiryDate);
    handleAddStock(item, expiryDate, _qtyToAdd).then(() =>
      window.location.reload()
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="underline text-sky-500">
        <span>Restock</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restock {item.name}</DialogTitle>
          <DialogDescription>
            New delivery from your supplier? Input each batch and their
            expiration dates here!
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-2 py-4">
            <div className="grid grid-cols-3 items-center gap-5">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Add Stock"
                className="col-span-2"
                onChange={(e) => setQtyToAdd(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-5">
              <Label htmlFor="expiration" className="text-right">
                Expiration Date
              </Label>
              <Input
                id="expiration"
                type="date"
                className="col-span-2"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <button
            type="submit"
            className="btn-generic text-sm"
            onClick={handleClick}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
