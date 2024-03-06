import { createClient } from "@/utils/supabase/server";
import NavBar from "@/components/NavBar";
import ItemsTable from "@/components/ItemsTable";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddItem from "@/components/AddItem";

async function GetItems() {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select();
  if (error) {
    console.log(error);
  }
  return { data, error };
}

export default async function Inventory({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // const canInitSupabaseClient = () => {
  //   try {
  //     createClient();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };
  // const isSupabaseConnected = canInitSupabaseClient();
  // if (!isSupabaseConnected) return <h1>Supabase not connected</h1>;

  const { data, error } = await GetItems();
  if (error) {
    if (error.message == "fetch failed") {
      return redirect("/inventory?message=Database connection not found.");
    }
    return redirect("/inventory?message=" + error.message);
  }

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar hasLogin={true} hasFullName={false} />
        {searchParams && searchParams.message && <p>{searchParams.message}</p>}
      </div>

      <div className="absolute top-4 left-4 m-1">
        <Link
          href="/main"
          className="btn-generic whitespace-nowrap text-xxs sm:text-sm"
        >
          Go Back to Home
        </Link>
      </div>
      <AddItem />
      <div className="flex justify-center items-center h-screen">
        <table className="divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr className="flex justify-between">
              <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                Sales
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
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
      {/*JSON.stringify(data, null, 2)*/}
    </>
  );
}
