"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";
import { donors } from "@/data/donors";
import type {
  Donor,
  DonorStatus,
} from "@/types/donor";

export default function DonorResultsGrid() {
  const searchParams = useSearchParams();

  const search =
    searchParams.get("search")?.toLowerCase() ?? "";

  const bloodGroup =
    searchParams.get("bloodGroup") ?? "";

  const district =
    searchParams.get("district") ?? "";

  const availableOnly =
    searchParams.get("available") === "true";

  const availability =
    searchParams.get("availability") ?? "";

  const sortBy =
    searchParams.get("sort") ?? "recent";

  const filteredDonors = donors
    .filter((donor) => {
      const searchableText =
        `${donor.name} ${donor.area} ${donor.district}`.toLowerCase();

      const matchesSearch =
        !search || searchableText.includes(search);

      const matchesBloodGroup =
        !bloodGroup ||
        donor.bloodGroup === bloodGroup;

      const matchesDistrict =
        !district ||
        donor.district === district;

      const matchesAvailable =
        !availableOnly ||
        donor.status === "available";

      const matchesRecent =
        availability !== "recent" ||
        donor.status === "available" ||
        donor.status === "recent";

      return (
        matchesSearch &&
        matchesBloodGroup &&
        matchesDistrict &&
        matchesAvailable &&
        matchesRecent
      );
    })
    .sort((firstDonor, secondDonor) => {
      if (sortBy === "donations") {
        return (
          secondDonor.donations -
          firstDonor.donations
        );
      }

      if (sortBy === "newest") {
        return (
          secondDonor.joinedRank -
          firstDonor.joinedRank
        );
      }

      return (
        firstDonor.confirmedRank -
        secondDonor.confirmedRank
      );
    });

  const activeFilters = [
    bloodGroup
      ? `Blood Group: ${bloodGroup}`
      : null,
    district
      ? `Location: ${district}`
      : null,
    availableOnly
      ? "Available Now"
      : null,
    availability === "recent"
      ? "Recently Confirmed"
      : null,
    search
      ? `Search: ${searchParams.get("search")}`
      : null,
  ].filter(Boolean) as string[];

  return (
    <>
      {/* Results summary */}
      <section className="mb-6 flex flex-wrap items-center gap-3">
        <h2 className="mr-2 text-2xl font-bold text-[#102A43]">
          {filteredDonors.length}{" "}
          {filteredDonors.length === 1
            ? "donor"
            : "donors"}{" "}
          found
        </h2>

        {activeFilters.map((filter) => (
          <span
            key={filter}
            className="inline-flex items-center gap-2 rounded-full bg-[#C7DFFF] px-3 py-1.5 text-xs font-semibold text-[#314863]"
          >
            {filter}
            <X size={14} />
          </span>
        ))}
      </section>

      {/* No results */}
      {filteredDonors.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#E3BEB8] bg-white px-6 py-16 text-center">
          <h3 className="text-xl font-bold text-[#102A43]">
            No donors found
          </h3>

          <p className="mt-2 text-[#49607C]">
            Try changing or clearing your filters.
          </p>
        </div>
      )}

      {/* Donor grid */}
      {filteredDonors.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
            />
          ))}
        </section>
      )}
    </>
  );
}

type DonorCardProps = {
  donor: Donor;
};

function DonorCard({
  donor,
}: DonorCardProps) {
  const status = getStatusDetails(
    donor.status
  );

  const StatusIcon = status.icon;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-[#E3BEB8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        donor.status === "pending"
          ? "opacity-75"
          : ""
      }`}
    >
      {/* Photo and blood group */}
      <div className="mb-4 flex items-start justify-between">
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#ECEEF0] bg-[#F2F4F6]">
          <img
            src={donor.image}
            alt={`${donor.name} donor profile`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#910102] text-base font-bold text-white shadow-sm">
          {donor.bloodGroup}
        </div>
      </div>

      {/* Name */}
      <div className="mb-1 flex items-center gap-1.5">
        <h3 className="text-lg font-bold text-[#102A43]">
          {donor.name}
        </h3>

        {donor.verified && (
          <ShieldCheck
            size={18}
            fill="currentColor"
            className="text-[#15803D]"
            aria-label="Verified donor"
          />
        )}
      </div>

      {/* Location */}
      <p className="mb-4 flex items-center gap-1 text-xs text-[#5A403C]">
        <MapPin size={15} />

        {donor.area}, {donor.district}
      </p>

      {/* Status */}
      <div
        className={`mb-4 flex items-center gap-2 text-sm font-semibold ${status.color}`}
      >
        <StatusIcon
          size={20}
          fill={
            donor.status === "available"
              ? "currentColor"
              : "none"
          }
        />

        {status.label}
      </div>

      {/* Details */}
      <div className="mb-6 grid flex-grow grid-cols-2 gap-x-2 gap-y-2 text-xs">
        <span className="text-[#5A403C]">
          Confirmed:
        </span>

        <span className="font-medium text-[#102A43]">
          {donor.confirmedText}
        </span>

        <span className="text-[#5A403C]">
          Donations:
        </span>

        <span className="font-medium text-[#102A43]">
          {donor.donations}{" "}
          {donor.donations === 1
            ? "Time"
            : "Times"}
        </span>

        <span className="text-[#5A403C]">
          Last Donation:
        </span>

        <span className="font-medium text-[#102A43]">
          {donor.lastDonation}
        </span>
      </div>

      <Link
        href={`/donors/${donor.id}`}
        className="flex w-full items-center justify-center rounded-[10px] border-2 border-[#910102] bg-white py-3 text-sm font-bold text-[#910102] transition hover:bg-[#910102]/5 active:scale-[0.98]"
      >
        View Details
      </Link>
    </article>
  );
}

type StatusDetails = {
  label: string;
  color: string;
  icon: typeof CheckCircle2;
};

function getStatusDetails(
  status: DonorStatus
): StatusDetails {
  if (status === "available") {
    return {
      label: "Available Now",
      color: "text-[#15803D]",
      icon: CheckCircle2,
    };
  }

  if (status === "recent") {
    return {
      label: "Recently Active",
      color: "text-[#49607C]",
      icon: Info,
    };
  }

  return {
    label: "Update Pending",
    color: "text-[#B45309]",
    icon: AlertTriangle,
  };
}