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
    <div className="relative w-full h-screen">
      <NavBar hasLogin={false} hasFullName={true} hasLinks={false} currentActive={""}/>
      <div className="w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="animate-in text-foreground flex w-full flex-1 flex-col justify-center"
          action={signUp}
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
          <div className="flex flex-col items-center gap-2 my-14">
            <Image src="/img/logo.svg" alt="Logo" width={130} height={130} />
            <h2>Welcome to AIMS!</h2>
          </div>
          <input
            className="mb-2 rounded-lg px-4 py-3 bg-gray"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="mb-2 rounded-lg px-4 py-3 bg-gray"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button className="btn-generic mt-8 mb-3 py-2 px-4 flex items-center justify-center text-center">
            Sign Up
          </button>
          <p className="text-center">
            {" "}
            Already have an account?{" "}
            <Link href="/login" className="redirect-login-signup">
              Log in now!
            </Link>
          </p>
          {searchParams?.message && (
            <p className="error-message">{searchParams.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
