import { item } from "@/types/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { PurchaseSalesHistory } from "./PurchaseSalesHistory";
export default async function LowStockTable() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .lte("quantity", 10)
    .order("quantity", { ascending: true });
  if (error) {
    throw error;
  }

  return (
    <Card className="shadow-lg w-2.5/12" style={{ borderColor: "#5F5F5F" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1 font-normal ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#6C63FF"
            className="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.47 15.28a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06L10 13.69 6.28 9.97a.75.75 0 0 0-1.06 1.06l4.25 4.25ZM5.22 6.03l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L10 8.69 6.28 4.97a.75.75 0 0 0-1.06 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
          Items low in stock
        </CardTitle>
        <CardDescription style={{ color: "#5F5F5F" }}>
          Restock these items from suppliers!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader style={{ color: "#5F5F5F" }}>
            <TableRow>
              <TableHead className="w-1/3">Item</TableHead>
              <TableHead className="w-1/3">Stocks</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="w-full bg-white" style={{ color: "#5F5F5F" }}>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-1/3 text-black">
                  <PurchaseSalesHistory
                    itemID={item.id}
                    itemName={item.name}
                    dashboard={true}
                  />
                </TableCell>
                <TableCell className="w-1/3 text-black">
                  {item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
