import { item } from "@/types/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart } from "@/components/PieChart";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { PurchaseSalesHistory } from "./PurchaseSalesHistory";

export default async function SalesChart({ data }: { data: any[] }) {
  const categories = data.map((item) => item.cat).slice(0, 3);
  const supabase = createClient();
  const { data: topsales, error } = await supabase
    .from("items")
    .select("id,name")
    .order("sales", { ascending: false })
    .limit(3);
  return (
    <Card className="shadow-lg w-1/4">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 font-normal ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#6C63FF"
            className="w-5 h-5"
          >
            <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
          </svg>
          Sales
        </CardTitle>
        <CardDescription style={{ color: "#5F5F5F" }}>
          Take a look at your store's statistics!
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        <PieChart data={data} />
        <Separator
          className="border m-3"
          style={{
            height: "0.25px",
            width: "300px",
            color: "#5F5F5F",
          }}
        />

        <div className="flex space-x-4">
          <div>
            <p className="mb-0.25">Top Sales</p>
            <p className="text-xs mb-3 " style={{ color: "#5F5F5F" }}>
              Customers love these items!
            </p>

            <ol>
              {topsales?.map((item, index) => (
                <li key={index}>
                  {index + 1}.{" "}
                  <PurchaseSalesHistory
                    itemID={item.id}
                    itemName={item.name}
                    dashboard={true}
                  />
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="mb-0.25">Top Categories</p>
            <p className="text-xs mb-3 " style={{ color: "#5F5F5F" }}>
              These types sell out most!
            </p>

            <ol>
              {categories.map((item, index) => (
                <li key={index}>
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
