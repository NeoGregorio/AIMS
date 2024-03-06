import { createClient } from "@/utils/supabase/server";
import NavBar from "@/components/NavBar";
import ItemsTable from "@/components/ItemsTable";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AddItem } from "@/components/AddItem";
import SearchBar from "@/components/SearchBar";

async function GetItems() {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select();
  if (error) {
    console.log(error);
  }
  return { data, error };
}

export default async function Main({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const { data, error } = await GetItems();
  if (error) {
    if (error.message == "fetch failed") {
      return redirect("/inventory?message=Database connection not found.");
    }
    return redirect("/inventory?message=" + error.message);
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar
          hasLogin={true}
          hasFullName={false}
          hasLinks={true}
          currentActive={"inventory"}
        />
        <div className="flex flex-row gap-10">
          <div className="w-[450px] flex-grow">
            <SearchBar />
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-graysubtitle flex flex-row items-center gap-2">
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
            <div className="text-purple flex flex-row items-center gap-2">
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
        <div className="flex items-center justify-center">
          <table className="divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50">
              <tr className="flex justify-between">
                <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500">
                  Sales
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-6 py-3 text-left font-medium tracking-wider text-gray-500">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((item) => (
                <ItemsTable
                  key={item.id}
                  expiryDate={item.expiry ?? "N/A"}
                  {...item}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return redirect("/");
  }
}
