import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Index() {
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
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b p-20">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div className="flex">
            <Image src="/img/logo.svg" alt="Logo" width={70} height={70} />
            <div className="flex flex-col leading-2 justify-center">
              <span>Automated Inventory</span>
              <span>Management System</span>
            </div>
          </div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div>
        <Image
          src="/img/illus-landing-page.svg"
          alt="Woman carrying a box"
          width={400}
          height={600}
        />
        <h1>Streamline your business operations with AIMS.</h1>
        <h2>
          Keep track of products, know when to restock, know when to order more,
          and know when products will expire.
        </h2>
      </div>
    </div>
  );
}
