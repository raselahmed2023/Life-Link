import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type Donor = {
  id: number;
  initials: string;
  name: string;
  location: string;
  bloodGroup: string;
  confirmedAt: string;
  donations: number;
  lastDonated: string;
};

const donors: Donor[] = [
  {
    id: 1,
    initials: "NJ",
    name: "Nusrat Jahan",
    location: "Mirpur, Dhaka",
    bloodGroup: "O+",
    confirmedAt: "Confirmed 2 days ago",
    donations: 5,
    lastDonated: "18 March 2026",
  },
  {
    id: 2,
    initials: "RH",
    name: "Rafiqul Hassan",
    location: "Banani, Dhaka",
    bloodGroup: "B+",
    confirmedAt: "Confirmed today",
    donations: 12,
    lastDonated: "05 January 2026",
  },
  {
    id: 3,
    initials: "SM",
    name: "Sajid Mahmud",
    location: "Dhanmondi, Dhaka",
    bloodGroup: "A-",
    confirmedAt: "Confirmed 1 day ago",
    donations: 2,
    lastDonated: "22 February 2026",
  },
  {
    id: 4,
    initials: "FS",
    name: "Farhana Sultana",
    location: "Uttara, Dhaka",
    bloodGroup: "AB+",
    confirmedAt: "Confirmed 3 days ago",
    donations: 8,
    lastDonated: "10 December 2025",
  },
];

export default function RecentDonorsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section heading */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#102A43]">
            Donors who recently confirmed availability
          </h2>

          <p className="mt-2 text-[#49607C]">
            Real-time availability status for immediate response.
          </p>
        </div>

        <Link
          href="/donors"
          className="inline-flex items-center gap-1 self-start text-sm font-semibold text-[#910102] hover:underline"
        >
          View All Donors
          <ArrowRight size={17} />
        </Link>
      </div>

      {/* Donor cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {donors.map((donor) => (
          <article
            key={donor.id}
            className="flex h-full flex-col rounded-2xl border border-[#E3BEB8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Initials and status */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#910102]/10 text-xl font-bold text-[#910102]">
                {donor.initials}
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#15803D]/10 px-3 py-1 text-xs font-bold text-[#15803D]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#15803D]" />
                Available
              </span>
            </div>

            {/* Name and location */}
            <h3 className="text-xl font-bold text-[#102A43]">
              {donor.name}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-sm text-[#49607C]">
              <MapPin size={15} />
              {donor.location}
            </p>

            {/* Blood information */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#910102] text-sm font-bold text-white">
                {donor.bloodGroup}
              </div>

              <div className="text-xs text-[#49607C]">
                <p className="font-bold text-[#15803D]">
                  {donor.confirmedAt}
                </p>

                <p className="mt-1">
                  Donations: {donor.donations}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-[#E3BEB8] pt-4">
              <p className="mb-4 text-xs italic text-[#49607C]">
                Last donated: {donor.lastDonated}
              </p>

              <Link
                href="/donors"
                className="flex w-full items-center justify-center rounded-lg border border-[#910102] px-4 py-2.5 text-sm font-bold text-[#910102] transition hover:bg-[#910102] hover:text-white"
              >
                Request Contact
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}