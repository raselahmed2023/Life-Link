"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Droplet, Menu, UserCircle, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  isLoggedIn?: boolean;
};

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Find Donors",
    href: "/donors",
  },
];

export default function Navbar({
  isLoggedIn = false,
}: NavbarProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

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
        className="mx-auto flex min-h-[72px] max-w-7xl flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="LifeLink homepage"
          className="inline-flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#910102] text-white">
            <Droplet
              size={23}
              fill="currentColor"
            />
          </span>

          <span className="text-2xl font-bold text-[#910102]">
            LifeLink
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() =>
            setIsMenuOpen(
              (previousState) =>
                !previousState
            )
          }
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

        {/* One shared navigation */}
        <div
          id="main-navigation"
          className={`order-3 w-full flex-col gap-1 border-t border-slate-100 py-4 md:order-none md:ml-10 md:flex md:w-auto md:flex-1 md:flex-row md:items-center md:justify-between md:border-0 md:py-0 ${
            isMenuOpen
              ? "flex"
              : "hidden"
          }`}
        >
          {/* Navigation links */}
          <div className="flex flex-col gap-1 md:h-[72px] md:flex-row md:items-center md:gap-8">
            {navLinks.map((link) => {
              const isActive =
                isActiveRoute(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition md:flex md:h-full md:items-center md:rounded-none md:border-b-2 md:px-0 md:py-0 ${
                    isActive
                      ? "bg-red-50 text-red-700 md:border-red-700 md:bg-transparent"
                      : "text-slate-700 hover:bg-slate-50 hover:text-red-700 md:border-transparent md:hover:border-red-300 md:hover:bg-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Account actions */}
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 md:mt-0 md:flex-row md:items-center md:border-0 md:pt-0">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  aria-label="View notifications"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-red-700 md:rounded-full md:p-2"
                >
                  <Bell size={21} />

                  <span className="md:hidden">
                    Notifications
                  </span>
                </button>

                <Link
                  href="/dashboard/donor-profile"
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition md:rounded-full md:px-3 md:py-2 ${
                    pathname.startsWith(
                      "/dashboard/donor-profile"
                    )
                      ? "border-red-700 bg-red-50 text-red-700"
                      : "border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  }`}
                >
                  <UserCircle size={21} />

                  <span className="md:hidden">
                    My Donor Profile
                  </span>

                  <span className="hidden md:inline">
                    Profile
                  </span>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-red-700 transition hover:bg-red-50 md:px-4 md:py-2.5"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}