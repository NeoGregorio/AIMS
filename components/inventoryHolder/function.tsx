"use server";
import { createClient } from "@/utils/supabase/server";
import { item } from "@/types/supabase";
async function GetEarliestExpiry(itemID: number) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("purchaserecord")
      .select("expiry")
      .eq("item_id", itemID)
      .order("expiry", { ascending: true })
      .limit(1);

    if (error) {
      console.log(error);
      throw error;
    }

    const earliestExpiry = data[0]?.expiry;
    return earliestExpiry ?? "N/A";
  } catch (error) {
    return null;
  }
}

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
