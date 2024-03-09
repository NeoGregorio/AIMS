import { createClient } from "@/utils/supabase/server";
import NavBar from "@/components/NavBar";
import ItemsTable from "@/components/ItemsTable";
import { redirect } from "next/navigation";
import { AddItem } from "@/components/AddItem";
import SearchBar from "@/components/SearchBar";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function GetEarliestExpiry(itemID: number) {
  "use server";
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("purchaserecord")
      .select("expiry")
      .eq("item_id", itemID)
      .order("expiry", { ascending: true })
      .limit(1);

    if (error) {
      console.log(error);
      throw error;
    }

    const earliestExpiry = data[0]?.expiry;
    return earliestExpiry ?? "N/A";
  } catch (error) {
    return null;
  }
}

async function GetItems() {
  "use server";
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("items").select().order("name");
    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  } catch (error) {
    return null;
  }
}

// For Testing: To create sample items in the inventory
async function CreateSample(name: string, category: string = "Food") {
  "use server";
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await supabase.from("items").insert([
    {
      name,
      category,
      quantity: 0,
      sales: 0,
      price: 23,
      user_id: user?.id,
    },
  ]);
}

// Main
export default async function Main({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // CreateSample("Coke", "Beverage");
  // CreateSample("Sprite", "Beverage");
  // CreateSample("Red Horse", "Beverage");
  // CreateSample("Pringles");
  // CreateSample("Spam");
  // CreateSample("Soju", "Beverage");
  const data = await GetItems();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-10 mb-10">
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
        <div className="flex items-center justify-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Earliest Expiry Date</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {data?.map((item) => (
                <ItemsTable expiryDate={GetEarliestExpiry(item.id)} {...item} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  } else {
    return redirect("/");
  }
}
