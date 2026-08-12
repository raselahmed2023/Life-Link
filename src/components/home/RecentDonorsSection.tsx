"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";
import type { ApiDonor } from "@/types/donor";
import HeartLoader from "@/components/ui/HeartLoader";

type DonorResponse = {
  success: boolean;
  message: string;
  data: ApiDonor[];
};

export default function RecentDonorsSection() {
  const [donors, setDonors] = useState<
    ApiDonor[]
  >([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchRecentDonors = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response =
          await apiRequest<DonorResponse>(
            "/api/donors"
          );

        setDonors(
          response.data.slice(0, 4)
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load donors"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentDonors();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#910102]">
            Available Donors
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#102A43]">
            Recently available blood donors
          </h2>

          <p className="mt-2 max-w-xl text-[#49607C]">
            Real donor profiles from the LifeLink
            database.
          </p>
        </div>

        <Link
          href="/donors"
          className="inline-flex items-center gap-1 self-start text-sm font-semibold text-[#910102] transition hover:gap-2 hover:underline"
        >
          View All Donors
          <ArrowRight size={17} />
        </Link>
      </div>

      {isLoading && (
        <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-red-100 bg-white text-[#910102]">
          <HeartLoader
            text="Connecting with donors..."
            size={30}
          />
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {!isLoading &&
        !error &&
        donors.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#E3BEB8] bg-white px-6 py-14 text-center">
            <Heart
              size={40}
              className="mx-auto text-[#910102]"
            />

            <h3 className="mt-4 text-xl font-bold text-[#102A43]">
              No donors available yet
            </h3>

            <p className="mt-2 text-[#64748B]">
              Be the first person to join as a
              LifeLink donor.
            </p>

            <Link
              href="/become-donor"
              className="mt-6 inline-flex rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B42318]"
            >
              Become a Donor
            </Link>
          </div>
        )}

      {!isLoading &&
        !error &&
        donors.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {donors.map((donor) => (
              <RecentDonorCard
                key={donor.id}
                donor={donor}
              />
            ))}
          </div>
        )}
    </section>
  );
}

function RecentDonorCard({
  donor,
}: {
  donor: ApiDonor;
}) {
  const initials = donor.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const lastDonation =
    donor.lastDonation
      ? new Date(
          donor.lastDonation
        ).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "Not provided";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#E3BEB8] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#910102]/10 text-lg font-bold text-[#910102]">
          {initials || (
            <UserRound size={24} />
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Available
        </span>
      </div>

      <h3 className="text-xl font-bold text-[#102A43]">
        {donor.user.name}
      </h3>

      <p className="mt-1 flex items-center gap-1 text-sm text-[#49607C]">
        <MapPin size={15} />

        {donor.area
          ? `${donor.area}, `
          : ""}
        {donor.district}
      </p>

      <div className="my-6 flex items-center gap-3">
        <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-[#910102] px-2 text-sm font-bold text-white">
          {
            bloodGroupToLabel[
              donor.bloodGroup
            ]
          }
        </div>

        <div className="text-xs text-[#49607C]">
          <p className="font-bold text-green-700">
            Available now
          </p>

          <p className="mt-1">
            Contact details protected
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-[#E3BEB8] pt-4">
        <p className="mb-4 text-xs italic text-[#49607C]">
          Last donated: {lastDonation}
        </p>

        <Link
          href="/donors"
          className="flex w-full items-center justify-center rounded-lg border border-[#910102] px-4 py-2.5 text-sm font-bold text-[#910102] transition hover:bg-[#910102] hover:text-white"
        >
          Request Contact
        </Link>
      </div>
    </article>
  );
}