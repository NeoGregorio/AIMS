import { createClient } from "@/utils/supabase/client";
import DeleteItem from "@/components/DeleteItem";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// To delete an item from the inventory
async function handleDelete(Itemid: string) {
  const supabase = createClient();
  const { error } = await supabase.from("items").delete().eq("id", Itemid);
  if (error) {
    console.log(error);
  }
  return error;
}

export default function MoreActions({
  itemID,
  itemName,
}: {
  itemID: number;
  itemName: string;
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
          ></DeleteItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
