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

export function PurchaseSalesHistory() {
  return (
    <Dialog>
      <DialogTrigger
        className="underline text-red-600"
        onClick={(event) => event.stopPropagation()}
      >
        <span>Purchase & Sales History</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>itemName History</DialogTitle>
          <DialogDescription>Purchase | Sales</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
