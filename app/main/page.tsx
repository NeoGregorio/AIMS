import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default async function Main({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar hasLogin={true} hasFullName={false} />
        {searchParams && searchParams.message && <p>{searchParams.message}</p>}
      </div>
      <div className="absolute top-4 left-4 m-1">
        <Link
          href="/inventory"
          className="btn-generic whitespace-nowrap text-xxs sm:text-sm"
        >
          Go to Inventory
        </Link>
      </div>
    </>
  );
}
