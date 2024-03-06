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

export function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async (event: any) => {
    event.preventDefault();
    const supabase = createClient();
    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    try {
      const { data: items, error } = await supabase.from("items").insert([
        {
          name,
          category,
          quantity: 0,
          sales: 0,
          price,
          user_id: user?.id,
        },
      ]);
      window.location.reload();
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-btn-background hover:bg-btn-background-hover flex flex flex-row items-center gap-2 rounded-full px-6 py-4 text-center text-sm font-semibold leading-4 text-white no-underline shadow-lg transition-colors duration-200 duration-200 ease-in-out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Add new item</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
          <DialogDescription>
            Add item details here; click save when you're done!
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-2 py-4">
            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="name" className="text-right">
                Item Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="price" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                className="col-span-3"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                className="col-span-3"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleAdd} className="btn-generic">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
