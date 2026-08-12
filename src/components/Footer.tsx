import Link from "next/link";
import {
  HeartHandshake,
  Mail,
  MapPin,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

import Logo from "@/components/Logo";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

const footerLinks = {
  platform: [
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
  ],

  resources: [
    {
      label: "How It Works",
      href: "/#how-it-works",
    },
    {
      label: "Success Stories",
      href: "/#success-stories",
    },
    {
      label: "FAQs",
      href: "/#faq",
    },
  ],

  legal: [
    {
      label: "Privacy Policy",
      href: "/",
    },
    {
      label: "Terms of Service",
      href: "/",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#E9D0CC] bg-[#F8FAFC]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />

          <p className="mt-5 max-w-sm text-sm leading-7 text-[#49607C]">
            Connecting blood donors with people in need
            across Bangladesh through a safer, faster,
            and privacy-focused platform.
          </p>

          <div className="mt-5 space-y-3 text-sm text-[#49607C]">
            <div className="flex items-center gap-2">
              <MapPin
                size={17}
                className="text-[#910102]"
              />
              Bangladesh
            </div>

            <div className="flex items-center gap-2">
              <HeartHandshake
                size={17}
                className="text-[#910102]"
              />
              Built to connect and save lives
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LifeLink Facebook page"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#910102] shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-[#910102] hover:text-white"
            >
              <FaFacebookF size={17} />
            </a>

            <a
              href="mailto:support@lifelink.com"
              aria-label="Email LifeLink"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#910102] shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-[#910102] hover:text-white"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <FooterColumn
          title="Platform"
          links={footerLinks.platform}
        />

        <FooterColumn
          title="Resources"
          links={footerLinks.resources}
        />

        <FooterColumn
          title="Legal"
          links={footerLinks.legal}
        />
      </div>

      <div className="border-t border-[#E9D0CC]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-[#64748B] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} LifeLink.
            All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Made with
            <span className="text-[#A90000]">♥</span>
            for communities across Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-5 font-bold text-[#102A43]">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#49607C] transition hover:text-[#910102]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}