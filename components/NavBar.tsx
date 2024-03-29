import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function NavBar({
  hasLogin,
  hasFullName,
  hasLinks,
  currentActive,
}: {
  hasLogin: boolean;
  hasFullName: boolean;
  hasLinks: boolean;
  currentActive: string;
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
  const isActive = (page: string) => {
    return page === currentActive
      ? "underline underline-offset-4"
      : "text-black";
  };

  return (
    <nav className="border-b-foreground/10 bg-gray flex h-24 w-full flex-col justify-center border-b border-black-500/100">
      <div className="flex flex-row justify-center">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div className="flex gap-1">
            <Link href="/main">
              <Image src="/img/logo.svg" alt="Logo" width={70} height={70} />
            </Link>
            {hasFullName && (
              <div className="flex w-[200px] flex-col justify-center text-[18px] leading-4">
                <p className="hidden sm:flex">
                  Automated Inventory Management System
                </p>
                <p className="flex sm:hidden">AIMS</p>
              </div>
            )}
            {hasLinks && (
              <ul className="flex gap-4 flex-row justify-center items-center pl-5 text-lg">
                <li className={isActive("home")}>
                  <Link href="/main">Home</Link>
                </li>
                <li className={isActive("inventory")}>
                  <Link href="/inventory">Inventory</Link>
                </li>
              </ul>
            )}
          </div>
          {hasLogin && isSupabaseConnected && <AuthButton />}
        </div>
      </div>
    </nav>
  );
}
