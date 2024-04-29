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

export default function NearExpiryTable() {
  // { data }: { data: item[] })
  const sampleItems = ["Red Horse", "San Miguel Apple", "Jack Daniels"];

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
            {sampleItems.map((item) => (
              <TableRow>
                <TableCell className="w-1/3 text-black">{item}</TableCell>
                <TableCell className="w-1/3 text-black">
                  2025-05-1 <br />
                  <span className="text-red-500">Tomorrow!</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
