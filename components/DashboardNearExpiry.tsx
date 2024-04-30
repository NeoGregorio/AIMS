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

function getNumberOfDaysUntilExpiry(expiry: string) {
  const expiryDate = new Date(expiry);
  const today = new Date();
  const timeDifference = expiryDate.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference < 0) {
    return "Expired!";
  } else if (daysDifference == 0) {
    return "Today!";
  } else if (daysDifference == 1) {
    return "Tomorrow!";
  } else {
    return `In ${daysDifference} days`;
  }
}

export default async function NearExpiryTable() {
  const supabase = createClient();

  //get all items that are expiring 1 month from now
  const monthFromNow = new Date();
  monthFromNow.setMonth(monthFromNow.getMonth() + 1);
  const monthFromNowString = monthFromNow.toISOString();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .lte("expiry", monthFromNowString)
    .order("expiry", { ascending: true });
  if (error) {
    throw error;
  }

  return (
    <Card className="shadow-lg w-1/4.5" style={{ borderColor: "#5F5F5F" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1 font-normal ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#6C63FF"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              clipRule="evenodd"
            />
          </svg>
          Items nearing expiry
        </CardTitle>
        <CardDescription style={{ color: "#5F5F5F" }}>
          Sell these items as soon as possible!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader style={{ color: "#5F5F5F" }}>
            <TableRow>
              <TableHead className="w-1/3">Item</TableHead>
              <TableHead className="w-1/3">Expiry Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="w-full bg-white" style={{ color: "#5F5F5F" }}>
            {data?.map((item) => (
              <TableRow key="item.id">
                <TableCell className="w-1/3 text-black">{item.name}</TableCell>
                <TableCell className="w-1/3 text-black">
                  {item.expiry} <br />
                  <span className="text-red-500">
                    {getNumberOfDaysUntilExpiry(item.expiry)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
