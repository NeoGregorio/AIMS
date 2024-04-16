"use server";
import { createClient } from "@/utils/supabase/server";

// For Testing: To create sample items in the inventory
async function CreateSample(name: string, category: string = "Food") {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase.from("items").insert([
    {
      name,
      category,
      quantity: 0,
      sales: 0,
      price: 23,
      user_id: user?.id,
    },
  ]);
}
