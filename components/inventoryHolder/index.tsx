"use client";
import ItemsTable from "@/components/ItemsTable";
import { AddItem } from "@/components/AddItem";
import SearchBar from "@/components/SearchBar";
import { item } from "@/types/supabase";
import { useState, useEffect } from "react";

export function InventoryHolder({ data }: { data: item[] }) {
  const [items, setItems] = useState<item[]>([]);
  const [search, setSearch] = useState<string>("");

  const getItems = async () => {
    if (search === "") {
      setItems(data as item[]);
    } else {
      setItems(
        data?.filter((item) =>
          item.name.toLowerCase().includes(search)
        ) as item[]
      );
    }
  };
  useEffect(() => {
    getItems();
  }, [search]);
  return (
    <div>
      <div className="flex flex-row gap-10">
        <div className="w-[450px] flex-grow">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className="flex flex-row gap-4">
          <div className="text-purple flex flex-row items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Stocks</span>
          </div>
          <div className="text-graysubtitle flex flex-row items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Category</span>
          </div>
        </div>
        <AddItem />
      </div>
      <div className="flex items-center justify-center mt-10">
        <ItemsTable data={items} />
      </div>
    </div>
  );
}
