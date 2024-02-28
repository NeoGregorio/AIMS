import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import NavBar from "../../components/NavBar";


export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message == "fetch failed") {
        return redirect("/login?message=Database connection not found.");
      }
      return redirect("/login?message=" + error.message);
    }

    return redirect("/main?message=Signed in successfully");
  };

  return (
    <>
      <NavBar hasLogin={false} />
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center"
        action={signIn}
      >
        <Link
          href="/"
          className="text-foreground group flex items-center rounded-md px-4 py-2 text-sm no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <div className="flex flex-col items-center gap-2 my-10">
          <Image src="/img/logo.svg" alt="Logo" width={115} height={120} />
          <h2>Welcome back!</h2>
        </div>
        <input
          className="mb-2 rounded-lg px-4 py-2 bg-gray"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="mb-2 rounded-lg px-4 py-2 bg-gray"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="text-foreground mb-2 rounded-md bg-white px-4 py-2 text-black">
          Sign In
        </button>
        <p className="text-center">
          Not registered?
          <Link href="/signup" className="text-blue-500">
            {" "}
            Sign up now!
          </Link>
        </p>
        {searchParams?.message && (
          <p className="text-foreground mt-4 bg-red-100 p-4 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
    </>
  );
}
