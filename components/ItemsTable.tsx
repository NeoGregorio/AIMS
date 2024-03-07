"use client";

type ItemProps = {
  id: string;
  name: string;
  quantity: number;
  sales: number;
  expiryDate: string;
  price: number;
  category: string;
};

export default function ItemsTable({
  id,
  name,
  quantity,
  sales,
  expiryDate,
  price,
  category,
}: ItemProps) {
  return (
    <>
      <div className="flex justify-between">
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{sales}</td>
        <td>{expiryDate ?? "N/A"} </td>
        <td>{price}</td>
        <td>{category}</td>
      </div>
    </>
  );
}
