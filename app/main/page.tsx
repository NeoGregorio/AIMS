import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PieChart } from "@/components/PieChart";
import { Separator } from "@/components/ui/separator";

export default async function Main({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // Display Time
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get Sales Data
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: SalesData, error } = await supabase.rpc("sales_sum");
  if (error) throw error;

  if (user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar
          hasLogin={true}
          hasFullName={false}
          hasLinks={true}
          currentActive={"home"}
        />

        <div className="flex items-center gap-4 justify-center w-full">
          <span className="text-2xl">Hello, {user.email?.split("@")[0]}!</span>
          <Separator
            style={{
              height: "0.5px",
              width: "420px",
              backgroundColor: "#5F5F5F",
            }}
          />
          <span
            style={{ color: "#5F5F5F" }}
            className="flex items-center text-xs gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#6C63FF"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                clip-rule="evenodd"
              />
            </svg>
            Today is {date}, {time}
          </span>
        </div>

        <PieChart data={SalesData} />
      </div>
    );
  } else {
    return redirect("/");
  }
}
