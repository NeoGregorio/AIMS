import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Main({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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
          currentActive={"home"}
        />
        <p>Dashboard page under construction.</p>
      </div>
    );
  } else {
    return redirect("/");
  }
}
