"use client";
import { useState, useEffect } from "react";
//import { GetItems } from "../app/inventory/page";

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
  name,
  quantity,
  sales,
  expiryDate,
  price,
  category,
}: ItemProps) {
  // const [name, setName] = useState("");
  // const [items, setItems] = useState<Item[]>([]);
  // const getItems = async () => {
  //     setItems(data);
  // };
  // useEffect(() => {
  //   GetItems();
  // }, [name, quantity, sales, expiryDate, price, category]); // Add dependencies here
  return (
    <>
      <tr className="flex justify-between">
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{sales}</td>
        <td>{expiryDate}</td>
        <td>{price}</td>
        <td>{category}</td>
      </tr>
    </>
  );
}
