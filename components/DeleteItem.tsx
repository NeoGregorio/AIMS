"use client";

// import { createClient } from "@/utils/supabase/server";

// // To delete an item from the inventory
// async function handleDelete(itemID: string) {
//   "use server";
//   const supabase = createClient();
//   const { error } = await supabase.from("items").delete().eq("id", itemID);
//   if (error) {
//     console.log(error);
//   }
//   return error;
// }

export default function DeleteItem({
  item,
  OnClick,
}: {
  item: any;
  OnClick: (data: any) => Promise<any>;
}) {
  // This function is used to delete an item from the inventory
  // then reload the page to update the table
  const HandleClick = () => {
    if (window.confirm("are you sure you want to remove bla bla bla")) {
      OnClick(item.id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <button
      onClick={HandleClick}
      style={{ color: "red", textDecoration: "underline" }}
      type="submit"
    >
      Remove
    </button>
  );
}
