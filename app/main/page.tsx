import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";

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
      <nav className="border-b-foreground/10 flex h-[90px] w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <Image
            src="/static/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      {searchParams?.message && (
        <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
