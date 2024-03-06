"use client";

export default function DeleteItem({
  item,
  formAction,
}: {
  item: any;
  formAction: (data: any) => Promise<any>;
}) {
  return (
    <button
      onClick={() => {
        formAction(item.id).then(() => {
          window.location.reload();
        });
      }}
      style={{ color: "red", textDecoration: "underline" }}
      type="submit"
    >
      Remove
    </button>
  );
}
