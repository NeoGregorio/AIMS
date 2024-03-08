"use client";

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
  formAction,
}: {
  itemID: number;
  itemName: string;
  formAction: (data: any) => Promise<any>;
}) {
  // This function is used to delete an item from the inventory
  // then reload the page to update the table
  const HandleClick = () => {
    formAction(itemID).then(() => {
      window.location.reload();
    });
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
          <AlertDialogAction onClick={HandleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
