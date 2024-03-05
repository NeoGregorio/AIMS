import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="flex w-full items-center bg-gray rounded-md px-4 py-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 mr-2 text-black-500/50"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="Quickly find your product!"
        className="flex-grow bg-transparent text-sm text-black-600/50 outline-none"
      />
    </div>
  );
}
