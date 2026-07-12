import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import DonorFilterPanel from "@/components/donors/DonorFilterPanel";
import DonorResultsGrid from "@/components/donors/DonorResultsGrid";

export default function DonorsPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FB]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center gap-2 text-xs font-medium text-[#5A403C]"
          >
            <Link
              href="/"
              className="transition hover:text-[#910102]"
            >
              Home
            </Link>

            <ChevronRight size={15} />

            <span className="font-semibold text-[#910102]">
              Find Donors
            </span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl">
            Find a Blood Donor
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-[#5A403C]">
            Our donor directory is based on
            self-reported availability. Please
            confirm the donor&apos;s current status
            and health before making any urgent
            medical arrangements.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="mb-8 h-64 animate-pulse rounded-2xl bg-white" />
          }
        >
          <DonorFilterPanel />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-[390px] animate-pulse rounded-2xl bg-white"
                />
              ))}
            </div>
          }
        >
          <DonorResultsGrid />
        </Suspense>
      </div>
    </main>
  );
}