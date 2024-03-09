import { createClient } from "@/utils/supabase/server";
import NavBar from "@/components/NavBar";
import { InventoryHolder } from "@/components/inventoryHolder";
import { redirect } from "next/navigation";
import { item } from "@/types/supabase";
// Main
export default async function Main({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function GetItems() {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("items")
        .select()
        .order("name");
      if (error) {
        console.log(error);
        throw error;
      }
      return data as item[];
    } catch (error) {
      return null;
    }
  }
  const data = await GetItems();

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-10 mb-10">
        <NavBar
          hasLogin={true}
          hasFullName={false}
          hasLinks={true}
          currentActive={"inventory"}
        />
        <InventoryHolder data={data as item[]} />
      </div>
    );
  } else {
    return redirect("/");
  }
}
