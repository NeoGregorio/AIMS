import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function NavBar({
  hasLogin,
  hasFullName,
}: {
  hasLogin: boolean;
  hasFullName: boolean;
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
    <nav className="border-b-foreground/10 bg-gray flex h-24 w-full flex-col justify-center border-b">
      <div className="flex flex-row justify-center">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div className="flex gap-1">
            <Image src="/img/logo.svg" alt="Logo" width={70} height={70} />
            {hasFullName && (
              <div className="flex flex-col justify-center w-[200px] leading-4 text-[18px]">
                <p>Automated Inventory Management System</p>
              </div>
            )}
          </div>
          {hasLogin && isSupabaseConnected && <AuthButton />}
        </div>
      </div>
    </nav>
  );
}
