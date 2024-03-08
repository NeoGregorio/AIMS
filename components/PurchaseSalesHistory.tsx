"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { PurchaseHistory } from "@/components/PurchaseHistory";

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
      <DialogTrigger onClick={(event) => event.stopPropagation()}>
        <span>Purchase & Sales History</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>itemName History</DialogTitle>
          <DialogDescription>
            <p>Purchase | Sales</p>
            <PurchaseHistory />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
