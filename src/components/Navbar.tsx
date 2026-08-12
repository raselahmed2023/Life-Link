"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  LogOut,
  Menu,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import Logo from "@/components/Logo";

type NavLink = {
  label: string;
  href: string;
};

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
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
  {
    label: "Blood Requests",
    href: "/blood-requests",
  },
  {
    label: "Become Donor",
    href: "/become-donor",
  },
  {
    label: "Request Blood",
    href: "/blood-request",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [user, setUser] =
    useState<StoredUser | null>(null);

  const [isMounted, setIsMounted] =
    useState(false);

  useEffect(() => {
    setIsMounted(true);

    const storedToken =
      localStorage.getItem(
        "lifelink_token"
      );

    const storedUser =
      localStorage.getItem(
        "lifelink_user"
      );

    if (storedToken && storedUser) {
      try {
        const parsedUser =
          JSON.parse(
            storedUser
          ) as StoredUser;

        setUser(parsedUser);
      } catch {
        localStorage.removeItem(
          "lifelink_token"
        );

        localStorage.removeItem(
          "lifelink_user"
        );

        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]);

  const isLoggedIn =
    isMounted && user !== null;

  const isActiveRoute = (
    href: string
  ) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(
      href
    );
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "lifelink_token"
    );

    localStorage.removeItem(
      "lifelink_user"
    );

    setUser(null);

    closeMenu();

    router.push("/login");
    router.refresh();
  };

  const accountDestination =
    user?.role === "ADMIN"
      ? "/admin"
      : "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-100 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[72px] max-w-7xl flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Logo onClick={closeMenu} />

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={() =>
            setIsMenuOpen(
              (previous) =>
                !previous
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

        {/* Navigation Content */}
        <div
          className={`order-3 w-full flex-col gap-1 border-t border-slate-100 py-4 md:order-none md:ml-8 md:flex md:w-auto md:flex-1 md:flex-row md:items-center md:justify-between md:border-0 md:py-0 ${
            isMenuOpen
              ? "flex"
              : "hidden"
          }`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col gap-1 md:h-[72px] md:flex-row md:items-center md:gap-6">
            {navLinks.map((link) => {
              const isActive =
                isActiveRoute(
                  link.href
                );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
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

          {/* Auth Area */}
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 md:mt-0 md:flex-row md:items-center md:border-0 md:pt-0">
            {isLoggedIn ? (
              <>
                {/* Notification */}
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-red-700 md:rounded-full md:p-2"
                >
                  <Bell size={20} />

                  <span className="md:hidden">
                    Notifications
                  </span>
                </button>

                {/* User / Admin account button */}
                <Link
                  href={
                    accountDestination
                  }
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 md:rounded-full md:px-3 md:py-2"
                >
                  <UserCircle
                    size={20}
                  />

                  <span>
                    {user.name
                      .split(
                        " "
                      )[0]}
                  </span>

                  {user.role ===
                    "ADMIN" && (
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#910102]">
                      Admin
                    </span>
                  )}
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#910102] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#B42318] md:py-2.5"
                >
                  <LogOut
                    size={18}
                  />

                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-red-700 transition hover:bg-red-50 md:px-4 md:py-2.5"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-[#910102] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#B42318] md:px-5 md:py-2.5"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}