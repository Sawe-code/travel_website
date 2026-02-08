"use client";
import { NAV_LINKS } from "../constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  // Handler for both buttons
  const handleAuthClick = () => {
    if (session) {
      signOut({ callbackUrl: "/" }); // Logout
    } else {
      signIn(); // Login
    }
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-4 lg:py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/hilink-logo.svg" alt="logo" width={80} height={32} />
      </Link>

      {/* Desktop nav links */}
      <ul className="hidden h-full items-center gap-10 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-90 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      {/* Desktop login/logout button */}
      <div className="hidden lg:flex items-center">
        <Button
          type="button"
          title={session ? "Logout" : "Login"}
          icon="/user.svg"
          variant="btn_dark_green"
          onClick={handleAuthClick}
        />
      </div>

      {/* Mobile menu icon */}
      <Image
        src="/menu.svg"
        alt="menu"
        width={28}
        height={28}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      />

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden">
          <ul className="flex flex-col gap-4 p-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="regular-16 text-gray-90 cursor-pointer hover:font-bold"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile login/logout button */}
            <Button
              type="button"
              title={session ? "Logout" : "Login"}
              icon="/user.svg"
              variant="btn_dark_green"
              onClick={handleAuthClick}
            />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
