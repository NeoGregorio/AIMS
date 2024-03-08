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

export function RestockItem() {
  return (
    <Dialog>
      <DialogTrigger className="underline text-sky-500">
        <span>Restock</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restock itemName</DialogTitle>
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
              <Input id="quantity" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-5">
              <Label htmlFor="expiration" className="text-right">
                Expiration Date
              </Label>
              <Input id="expiration" className="col-span-2" />
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
