import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

import DonorFilterPanel from "@/components/donors/DonorFilterPanel";
import DonorResultsGrid from "@/components/donors/DonorResultsGrid";
import HeartLoader from "@/components/ui/HeartLoader";

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
            Search for available blood donors by blood group
            and location. Donor contact information remains
            protected until a valid contact request is made.
          </p>
        </header>

        {/* Donor filter */}
        <Suspense
          fallback={
            <div className="mb-8 flex min-h-[220px] items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
              <div className="text-[#910102]">
                <HeartLoader
                  text="Preparing donor search..."
                  size={30}
                />
              </div>
            </div>
          }
        >
          <DonorFilterPanel />
        </Suspense>

        {/* Donor results */}
        <Suspense
          fallback={
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
              <div className="text-[#910102]">
                <HeartLoader
                  text="Finding available donors..."
                  size={34}
                />
              </div>
            </div>
          }
        >
          <DonorResultsGrid />
        </Suspense>
      </div>
    </main>
  );
}