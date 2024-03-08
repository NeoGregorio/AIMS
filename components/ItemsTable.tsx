"use client";

type ItemProps = {
  id: string;
  name: string;
  quantity: number;
  sales: number;
  expiry: string;
  price: number;
  category: string;
};

export default function ItemsTable({
  id,
  name,
  quantity,
  sales,
  expiry,
  price,
  category,
}: ItemProps) {
  return (
    <>
      <div className="flex justify-between">
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{sales}</td>
        <td>{expiry ?? "N/A"} </td>
        <td>{price}</td>
        <td>{category}</td>
      </div>
    </>
  );
}
