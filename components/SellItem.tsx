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

export function SellItem({ item }: { item: item }) {
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
              <Input id="quantity" className="text-left col-span-1" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" className="btn-generic">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
