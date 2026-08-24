import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  HeartHandshake,
  Info,
  Map,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import ContactRequestForm from "@/components/donors/ContactRequestForm";
import { API_URL } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";

import type { ApiDonor } from "@/types/donor";

type DonorDetailsPageProps = {
  params: Promise<{
    donorId: string;
  }>;
};

type DonorResponse = {
  success: boolean;
  message: string;
  data: ApiDonor;
};

async function getDonor(
  donorId: string
): Promise<ApiDonor | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/donors/${donorId}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const result =
      (await response.json()) as DonorResponse;

    return result.data;
  } catch {
    return null;
  }
}

export default async function DonorDetailsPage({
  params,
}: DonorDetailsPageProps) {
  const { donorId } = await params;

  const donor = await getDonor(
    donorId
  );

  if (!donor) {
    notFound();
  }

  const bloodGroupLabel =
    bloodGroupToLabel[
      donor.bloodGroup
    ];

  const location =
    donor.area
      ? `${donor.area}, ${donor.district}`
      : donor.district;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-[#49607C]"
        >
          <Link
            href="/donors"
            className="transition hover:text-[#910102]"
          >
            Find Donors
          </Link>

          <ChevronRight size={15} />

          <span>
            {donor.district}
          </span>

          <ChevronRight size={15} />

          <span className="font-semibold text-[#191C1E]">
            {donor.user.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-8">
            {/* Donor Header */}
            <section className="flex flex-col items-start gap-7 rounded-3xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-red-100 bg-red-50 text-3xl font-black text-[#910102] shadow-sm sm:h-32 sm:w-32">
                  {getInitials(
                    donor.user.name
                  )}
                </div>

                {donor.isAvailable && (
                  <span
                    title="Available donor"
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white"
                  >
                    <ShieldCheck
                      size={19}
                    />
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black text-[#191C1E] sm:text-4xl">
                    {donor.user.name}
                  </h1>

                  <span className="inline-flex items-center rounded-full bg-[#B42318] px-4 py-1.5 text-sm font-bold text-white">
                    {bloodGroupLabel}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#5A403C]">
                  <span className="flex items-center gap-1.5">
                    <MapPin
                      size={18}
                    />

                    {location}
                  </span>

                  <span
                    className={`flex items-center gap-1.5 font-semibold ${
                      donor.isAvailable
                        ? "text-green-700"
                        : "text-slate-500"
                    }`}
                  >
                    <CheckCircle2
                      size={18}
                    />

                    {donor.isAvailable
                      ? "Currently available"
                      : "Currently unavailable"}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    Community Donor
                  </span>

                  {donor.isAvailable && (
                    <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                      Available
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <article className="flex items-center gap-4 rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
                  <CalendarDays
                    size={24}
                  />
                </span>

                <div>
                  <p className="text-xs font-medium text-[#5A403C]">
                    Last Donation
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#191C1E]">
                    {donor.lastDonation
                      ? formatDate(
                          donor.lastDonation
                        )
                      : "Not provided"}
                  </p>
                </div>
              </article>

              <article className="flex items-center gap-4 rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#49607C]">
                  <HeartHandshake
                    size={24}
                  />
                </span>

                <div>
                  <p className="text-xs font-medium text-[#5A403C]">
                    Donor Status
                  </p>

                  <p
                    className={`mt-1 text-lg font-bold ${
                      donor.isAvailable
                        ? "text-green-700"
                        : "text-slate-600"
                    }`}
                  >
                    {donor.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </p>
                </div>
              </article>
            </section>

            {/* Donor Details */}
            <section className="rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-[#191C1E]">
                Donor Information
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InformationRow
                  label="Blood Group"
                  value={
                    bloodGroupLabel
                  }
                />

                <InformationRow
                  label="District"
                  value={
                    donor.district
                  }
                />

                <InformationRow
                  label="Area"
                  value={
                    donor.area ||
                    "Not provided"
                  }
                />

                <InformationRow
                  label="Availability"
                  value={
                    donor.isAvailable
                      ? "Available"
                      : "Unavailable"
                  }
                  valueClassName={
                    donor.isAvailable
                      ? "text-green-700"
                      : "text-slate-600"
                  }
                />
              </div>

              {/* Medical Disclaimer */}
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4">
                <Info
                  size={22}
                  className="mt-0.5 shrink-0 text-[#BA1A1A]"
                />

                <div>
                  <h3 className="text-sm font-semibold text-[#BA1A1A]">
                    Medical Disclaimer
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#5A403C]">
                    LifeLink helps
                    users connect with
                    potential blood
                    donors but does not
                    perform medical
                    screening. Always
                    complete professional
                    blood compatibility,
                    cross-matching and
                    medical checks at a
                    certified hospital or
                    blood bank before
                    transfusion.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              {donor.isAvailable ? (
                <ContactRequestForm
                  donorId={donor.id}
                  donorName={
                    donor.user.name
                  }
                />
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                  <h2 className="text-xl font-bold text-[#191C1E]">
                    Donor Unavailable
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    This donor is
                    currently marked as
                    unavailable, so a
                    contact request
                    cannot be sent right
                    now.
                  </p>

                  <Link
                    href="/donors"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#910102] px-5 py-3 font-bold text-white transition hover:bg-[#B42318]"
                  >
                    Find Other Donors
                  </Link>
                </div>
              )}

              <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-[#E3BEB8]/30 bg-white p-6 text-center shadow-sm">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#910102]">
                  <Map size={31} />
                </span>

                <h3 className="mt-4 font-semibold text-[#191C1E]">
                  Located in{" "}
                  {donor.district}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#5A403C]">
                  {donor.area
                    ? `This donor is listed in ${donor.area}, ${donor.district}.`
                    : `This donor is listed in ${donor.district}.`}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

type InformationRowProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

function InformationRow({
  label,
  value,
  valueClassName = "text-[#191C1E]",
}: InformationRowProps) {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#F2F4F6] p-4 sm:flex-row sm:items-center">
      <span className="text-sm text-[#5A403C]">
        {label}
      </span>

      <span
        className={`text-sm font-semibold ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function getInitials(
  name: string
) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(
  date: string
) {
  return new Date(
    date
  ).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}