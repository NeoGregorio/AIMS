"use client";

export default function DeleteItem({
  item,
  formAction,
}: {
  item: any;
  formAction: (data: any) => Promise<any>;
}) {
  // This function is used to delete an item from the inventory
  // then reload the page to update the table
  const AreYouSure = () => {
    if (window.confirm("are you sure you want to remove bla bla bla")) {
      HandleClick();
    }
  };
  const HandleClick = () => {
    formAction(item.id).then(() => {
      window.location.reload();
    });
  };

  return (
    <button
      onClick={AreYouSure}
      style={{ color: "red", textDecoration: "underline" }}
      type="submit"
    >
      Remove
    </button>
  );
}
