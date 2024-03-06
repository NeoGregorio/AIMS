"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddItem() {
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
    <>
      <form>
        <input
          required
          type="text"
          name="Name"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          type="number"
          name="Price"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          required
          type="text"
          name="Category"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleAdd}
          className="btn-generic whitespace-nowrap text-xxs sm:text-sm"
        >
          Done
        </button>
      </form>
    </>
  );
}
