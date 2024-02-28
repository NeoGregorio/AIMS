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
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message == "fetch failed") {
        return redirect("/signup?message=Database connection not found.");
      }
      return redirect("/signup?message=" + error.message);
    }

    return redirect("/main?message=Account created!");
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
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

      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action={signUp}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="text-foreground mb-2 rounded-md bg-white px-4 py-2 text-black">
          Sign Up
        </button>
        <p className="text-center">
          {" "}
          Already have an account?
          <Link href="/login" className="text-blue-500">
            {" "}
            Sign In
          </Link>
        </p>
        {searchParams?.message && (
          <p className="text-foreground mt-4 bg-red-100 p-4 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
