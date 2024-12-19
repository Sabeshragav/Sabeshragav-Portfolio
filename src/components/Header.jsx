import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-black text-white flex items-center justify-between p-4 border-b border-b-gray-600">
      <Link href={"/"} title="NextJs Blogspot">
        <h1 className="text-3xl font-bold ">NextJs Blogspot</h1>
      </Link>

      <ul className="flex items-center justify-center gap-5 text-blue-500">
        <li className="transition hover:scale-125">
          <Link href={"/"} title="Home">
            Home
          </Link>
        </li>
        <li className="transition hover:scale-125">
          <Link href={"/about"} title="About">
            About
          </Link>
        </li>
        <li className="transition hover:scale-125">
          <Link href={"/contact"} title="Contact">
            Contact
          </Link>
        </li>
      </ul>
    </header>
  );
}
