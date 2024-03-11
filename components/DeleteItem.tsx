"use client";
import { createClient } from "@/utils/supabase/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteItem({
  itemID,
  itemName,
}: {
  itemID: number;
  itemName: string;
}) {
  const handleDelete = async () => {
    const supabase = createClient();
    try {
      const { error } = await supabase.from("items").delete().eq("id", itemID);
      if (error) {
        console.log(error);
        return error;
      }
      window.location.replace("/inventory?message=Item deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(event) => event.stopPropagation()}>
        Delete {itemName}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {itemName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item
            and all information regarding it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
