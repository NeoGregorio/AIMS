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

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { item } from "@/types/supabase";

type AddStockProps = {
  item: item;
};

async function handleAddStock(
  item: item,
  expiryDate: string,
  qtyToAdd: number
) {
  const supabase = createClient();
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
        current_quantity: qtyToAdd,
        expiry,
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

export default function AddStock({ item }: AddStockProps) {
  const dateToday = new Date().toISOString().split("T")[0];
  const [qtyToAdd, setQtyToAdd] = useState("");
  const [expiryDate, setExpiryDate] = useState(dateToday);

  function handleClick() {
    const _qtyToAdd = parseInt(qtyToAdd); // Convert to number

    if (isNaN(_qtyToAdd)) {
      // If no value is entered, return
      alert("Please enter a valid quantity");
      return;
    }
    if (_qtyToAdd <= 0) {
      // If the value is negative, return
      alert("Please enter a valid quantity");
      return;
    }
    // If the value is valid, update the stock and expiry date
    if (expiryDate === "") {
      alert("Please Enter an Expiry Date");
      return;
    }

    CreatePurchaseRecord(item.id, item.quantity, _qtyToAdd, expiryDate);
    handleAddStock(item, expiryDate, _qtyToAdd).then(() =>
      window.location.replace("/inventory?message=Stock added successfully")
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        className="text-sky-500 underline"
        id={`${item.name}restockbtn`}
      >
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
                name="quantity"
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
                name="expiration"
                type="date"
                defaultValue={expiryDate}
                className="col-span-2"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            className="btn-generic text-sm"
            onClick={handleClick}
            id={`${item.name}restockconfirm`}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
