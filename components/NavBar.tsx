import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function NavBar({hasLogin}:{hasLogin: boolean}) {
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
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b p-12 bg-gray">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <div className="flex">
          <Image src="/img/logo.svg" alt="Logo" width={70} height={70} />
          {hasLogin && <div className="flex flex-col leading-2 justify-center">
            <span>Automated Inventory</span>
            {<span>Management System</span>}
          </div>}
        </div>
        {hasLogin && isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
};