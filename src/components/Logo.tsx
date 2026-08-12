import Link from "next/link";
import { HeartPulse } from "lucide-react";

type LogoProps = {
  href?: string;
  compact?: boolean;
  onClick?: () => void;
};

export default function Logo({
  href = "/",
  compact = false,
  onClick,
}: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="LifeLink homepage"
      className="group inline-flex items-center gap-2.5"
    >
      <span className="relative flex h-11 w-11 items-center justify-center">
        <span className="absolute inset-0 rotate-45 rounded-[14px] bg-gradient-to-br from-[#B42318] to-[#7A0000] shadow-sm transition duration-300 group-hover:rotate-[50deg] group-hover:scale-105" />

        <HeartPulse
          size={23}
          strokeWidth={2.4}
          className="relative z-10 -rotate-45 text-white"
        />
      </span>

      {!compact && (
        <span className="flex items-baseline">
          <span className="text-[25px] font-extrabold tracking-[-0.04em] text-[#102A43]">
            Life
          </span>

          <span className="text-[25px] font-extrabold tracking-[-0.04em] text-[#A90000]">
            Link
          </span>
        </span>
      )}
    </Link>
  );
}