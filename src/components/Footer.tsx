import Link from "next/link";
import { Droplet, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

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
      href: "/register",
    },
    {
      label: "Success Stories",
      href: "/",
    },
  ],

  resources: [
    {
      label: "About LifeLink",
      href: "/",
    },
    {
      label: "How It Works",
      href: "/",
    },
    {
      label: "FAQs",
      href: "/",
    },
    {
      label: "Contact Us",
      href: "/",
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
    <footer className="border-t border-[#E3BEB8] bg-[#F2F4F6]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand section */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#910102] text-white">
              <Droplet size={23} fill="currentColor" />
            </span>

            <span className="text-2xl font-bold text-[#910102]">
              LifeLink
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-[#49607C]">
            Connecting heroes with those in need across Bangladesh. A platform
            built on trust, privacy, and community.
          </p>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LifeLink Facebook page"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6E8EA] text-[#910102] transition hover:bg-[#910102] hover:text-white"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="mailto:support@lifelink.com"
              aria-label="Email LifeLink"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6E8EA] text-[#910102] transition hover:bg-[#910102] hover:text-white"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>

        {/* Platform links */}
        <FooterColumn
          title="Platform"
          links={footerLinks.platform}
        />

        {/* Resource links */}
        <FooterColumn
          title="Resources"
          links={footerLinks.resources}
        />

        {/* Legal links */}
        <FooterColumn
          title="Legal"
          links={footerLinks.legal}
        />
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-[#E3BEB8]">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 md:text-left lg:px-8">
          <p className="text-sm text-[#49607C]">
            © {new Date().getFullYear()} LifeLink. All rights reserved.
            Connecting heroes with those in need across Bangladesh.
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
              className="text-sm text-[#49607C] transition hover:text-[#910102] hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}