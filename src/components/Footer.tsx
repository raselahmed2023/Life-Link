import Link from "next/link";
import {
  Facebook,
  Mail,
} from "lucide-react";

import Logo from "@/components/Logo";

const platformLinks = [
  {
    label: "Find Donors",
    href: "/donors",
  },
  {
    label: "Become a Donor",
    href: "/become-donor",
  },
  {
    label: "Blood Requests",
    href: "/blood-requests",
  },
];

const resourceLinks = [
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
    label: "Why Donate",
    href: "/#why-donate",
  },
  {
    label: "FAQ",
    href: "/#faq",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
  },
];

export default function Footer() {
  const year =
    new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              LifeLink helps connect
              blood donors with people
              who need blood, making
              donor discovery and
              communication simpler.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LifeLink Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-[#910102]"
              >
                <Facebook size={18} />
              </a>

              <a
                href="mailto:support@lifelink.com"
                aria-label="Email LifeLink"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-[#910102]"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <FooterColumn
            title="Platform"
            links={platformLinks}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />

          {/* Legal */}
          <FooterColumn
            title="Legal"
            links={legalLinks}
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} LifeLink.
            All rights reserved.
          </p>

          <p>
            Connecting people.
            Saving lives.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h3 className="font-bold text-[#102A43]">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-600 transition hover:text-[#910102]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}