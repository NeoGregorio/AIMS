import { createClient } from "@/utils/supabase/client";
import DeleteItem from "@/components/DeleteItem";
import { PurchaseSalesHistory } from "@/components/PurchaseSalesHistory";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MoreActions({
  itemID,
  itemName,
  currentQty,
}: {
  itemID: number;
  itemName: string;
  currentQty: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger name={`${itemName}moreactions`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="graysubtitle"
          className="h-6 w-6"
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
          <PurchaseSalesHistory itemID={itemID} itemName={itemName} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DeleteItem itemID={itemID} itemName={itemName} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
