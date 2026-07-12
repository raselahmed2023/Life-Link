"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Droplet, Menu, UserCircle, X,
} from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  isLoggedIn?: boolean;
};

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Find Donors",
    href: "/donors",
  }
];

export default function Navbar({ isLoggedIn = false, }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-100 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="LifeLink homepage"
          className="inline-flex items-center transition-transform hover:scale-105 gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#910102] text-white">
            <Droplet size={23} fill="currentColor" />
          </span>

          <span className="text-2xl font-bold text-[#910102]"> LifeLink </span>
        </Link>


        {/* Desktop navigation */}
        <div className="hidden h-full items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = isActiveRoute(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-full items-center border-b-2 text-sm font-semibold transition-colors ${isActive
                  ? "border-red-700 text-red-700"
                  : "border-transparent text-slate-700 hover:border-red-300 hover:text-red-700"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>


        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                aria-label="View notifications"
                className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-red-700"
              >
                <Bell size={21} />
              </button>

              <Link
                href="/dashboard/donor-profile"
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${pathname.startsWith("/dashboard/donor-profile")
                  ? "border-red-700 bg-red-50 text-red-700"
                  : "border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-700"
                  }`}
              >
                <UserCircle size={21} />
                Profile
              </Link>
            </>
          ) : (

            <Link
              href="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
            >
              Login
            </Link>
          )}
        </div>


        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setIsMenuOpen((previousState) => !previousState)
          }
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>


      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = isActiveRoute(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive
                    ? "bg-red-50 text-red-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-red-700"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="my-3 border-t border-slate-200" />

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/donor-profile"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
                >
                  <UserCircle size={20} />
                  My Donor Profile
                </Link>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-red-700"
                >
                  <Bell size={20} />
                  Notifications
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}


    </header>
  );
}