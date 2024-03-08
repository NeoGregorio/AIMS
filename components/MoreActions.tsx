import { createClient } from "@/utils/supabase/client";
import DeleteItem from "@/components/DeleteItem";
import AddStock from "@/components/AddStock";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// To delete an item from the inventory
async function handleDelete(itemID: number) {
  const supabase = createClient();
  try {
    const { error } = await supabase.from("items").delete().eq("id", itemID);
    if (error) {
      console.log(error);
      return error;
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

// To add stock to an item in the inventory
async function handleAddStock(itemID: number, newQty: number) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("items")
      .update({ quantity: newQty })
      .eq("id", itemID);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

export default function MoreActions({
  itemID,
  itemName,
  oldQty,
}: {
  itemID: number;
  itemName: string;
  oldQty: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="graysubtitle"
          className="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem>
          <DeleteItem
            itemID={itemID}
            itemName={itemName}
            formAction={handleDelete}
          />
          <AddStock
            itemID={itemID}
            oldQty={oldQty}
            handleAddStock={handleAddStock}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
