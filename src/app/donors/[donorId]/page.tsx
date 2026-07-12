import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ContactRound,
  HeartHandshake,
  Info,
  Map,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import ContactRequestForm from "@/components/donors/ContactRequestForm";
import Footer from "@/components/Footer";
import { donors } from "@/data/donors";

type DonorDetailsPageProps = {
  params: Promise<{
    donorId: string;
  }>;
};

export function generateStaticParams() {
  return donors.map((donor) => ({
    donorId: donor.id,
  }));
}

export default async function DonorDetailsPage({
  params,
}: DonorDetailsPageProps) {
  const { donorId } = await params;

  const donor = donors.find(
    (currentDonor) =>
      currentDonor.id === donorId
  );

  if (!donor) {
    notFound();
  }

  const bloodGroupLabel =
    donor.bloodGroup.endsWith("+")
      ? `${donor.bloodGroup} Positive`
      : `${donor.bloodGroup} Negative`;

  const preferredContact =
    donor.preferredContact ??
    "WhatsApp / Phone";

  const availabilityTime =
    donor.availabilityTime ??
    "8:00 AM - 10:00 PM";

  const weight =
    donor.weight ??
    "Not publicly shared";

  const healthStatus =
    donor.healthStatus ??
    "Self-reported healthy";

  const isAvailable =
    donor.status === "available";

  return (
    <>
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

            <span>{donor.district}</span>

            <ChevronRight size={15} />

            <span className="font-semibold text-[#191C1E]">
              {donor.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Main content */}
            <div className="space-y-6 lg:col-span-8">
              {/* Donor header */}
              <section className="flex flex-col items-start gap-8 rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center">
                <div className="relative shrink-0">
                  <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#FFB4A8] bg-[#F2F4F6] shadow-md">
                    <img
                      src={donor.image}
                      alt={`${donor.name} donor profile`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {donor.verified && (
                    <span
                      title="Verified donor"
                      className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#15803D] text-white"
                    >
                      <ShieldCheck
                        size={20}
                        fill="currentColor"
                      />
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold text-[#191C1E] sm:text-4xl">
                      {donor.name}
                    </h1>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B42318] px-4 py-1.5 text-sm font-semibold text-white">
                      {bloodGroupLabel}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-[#5A403C]">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={18} />

                      {donor.area},{" "}
                      {donor.district}
                    </span>

                    <span
                      className={`flex items-center gap-1.5 ${
                        isAvailable
                          ? "text-[#15803D]"
                          : "text-[#49607C]"
                      }`}
                    >
                      <CheckCircle2 size={18} />

                      Last confirmed:{" "}
                      {donor.confirmedText}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-[#D1E4FF] px-3 py-1.5 text-xs font-semibold text-[#011D35]">
                      Community Donor
                    </span>

                    {donor.donations >= 5 && (
                      <span className="rounded-lg bg-[#D1E4FF] px-3 py-1.5 text-xs font-semibold text-[#011D35]">
                        Regular Donor
                      </span>
                    )}

                    {isAvailable && (
                      <span className="rounded-lg bg-[#95F8A7] px-3 py-1.5 text-xs font-semibold text-[#00210A]">
                        Emergency Ready
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Stats */}
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <article className="flex items-center gap-4 rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFDAD5] text-[#910102]">
                    <CalendarDays size={24} />
                  </span>

                  <div>
                    <p className="text-xs font-medium text-[#5A403C]">
                      Last Donation
                    </p>

                    <p className="mt-1 text-xl font-semibold text-[#191C1E]">
                      {donor.lastDonation}
                    </p>
                  </div>
                </article>

                <article className="flex items-center gap-4 rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D1E4FF] text-[#49607C]">
                    <HeartHandshake size={24} />
                  </span>

                  <div>
                    <p className="text-xs font-medium text-[#5A403C]">
                      Total Donations
                    </p>

                    <p className="mt-1 text-xl font-semibold text-[#191C1E]">
                      {donor.donations}{" "}
                      {donor.donations === 1
                        ? "Time"
                        : "Times"}
                    </p>
                  </div>
                </article>
              </section>

              {/* Details */}
              <section className="space-y-8 rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  {/* Contact preference */}
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-[#191C1E]">
                      <ContactRound
                        size={23}
                        className="text-[#910102]"
                      />

                      Preferred Contact
                    </h2>

                    <div className="mt-5 space-y-3">
                      <InformationRow
                        label="Primary Method"
                        value={preferredContact}
                      />

                      <InformationRow
                        label="Availability Time"
                        value={availabilityTime}
                      />
                    </div>
                  </div>

                  {/* Medical profile */}
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-semibold text-[#191C1E]">
                      <Stethoscope
                        size={23}
                        className="text-[#910102]"
                      />

                      Medical Profile
                    </h2>

                    <div className="mt-5 space-y-3">
                      <InformationRow
                        label="Weight"
                        value={weight}
                      />

                      <InformationRow
                        label="Health Status"
                        value={healthStatus}
                        valueClassName="text-[#15803D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 rounded-xl border border-[#BA1A1A]/10 bg-[#FFDAD6]/30 p-4">
                  <Info
                    size={22}
                    className="mt-0.5 shrink-0 text-[#BA1A1A]"
                  />

                  <div>
                    <h3 className="text-sm font-semibold text-[#BA1A1A]">
                      Medical Disclaimer
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#5A403C]">
                      This donor has self-reported
                      being healthy. LifeLink
                      facilitates connections but
                      does not conduct medical
                      screenings. Always complete
                      professional cross-matching and
                      testing at a certified hospital
                      or blood bank before any
                      transfusion.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <ContactRequestForm
                  donorName={donor.name}
                />

                <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-[#E3BEB8]/30 bg-[#E0E3E5]/50 p-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0E3E5] text-[#910102]">
                    <Map size={31} />
                  </span>

                  <h3 className="mt-4 font-semibold text-[#191C1E]">
                    Located in {donor.district}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#5A403C]">
                    This donor generally serves
                    hospitals around {donor.area} and
                    nearby areas.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
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
    <div className="flex flex-col justify-between gap-2 rounded-lg bg-[#F2F4F6] p-4 sm:flex-row sm:items-center">
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