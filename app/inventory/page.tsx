import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import NavBar from "@/components/NavBar";
import { usePathname } from 'next/navigation'


export default function Main({
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

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <NavBar hasLogin={true} hasFullName={false} hasLinks={true} currentActive={"inventory"}/>
      <p>Inventory.</p>
    </div>
  );
}
