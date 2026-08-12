"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import {
  bloodGroupToApi,
  bloodGroupToLabel,
} from "@/lib/bloodGroup";
import type { ApiDonor } from "@/types/donor";
import HeartLoader from "@/components/ui/HeartLoader";
import ContactRequestForm from "@/components/donors/ContactRequestForm";

type DonorResponse = {
  success: boolean;
  message: string;
  data: ApiDonor[];
};

export default function DonorResultsGrid() {
  const searchParams = useSearchParams();

  const [donors, setDonors] = useState<ApiDonor[]>([]);
  const [selectedDonor, setSelectedDonor] =
    useState<ApiDonor | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState("");

  const search =
    searchParams.get("search")?.toLowerCase() ?? "";

  const bloodGroup =
    searchParams.get("bloodGroup") ?? "";

  const district =
    searchParams.get("district") ?? "";

  useEffect(() => {
    const fetchDonors = async () => {
      setIsLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (bloodGroup) {
          const apiBloodGroup =
            bloodGroupToApi[bloodGroup];

          if (apiBloodGroup) {
            params.set(
              "bloodGroup",
              apiBloodGroup
            );
          }
        }

        if (district) {
          params.set("district", district);
        }

        const query = params.toString();

        const response =
          await apiRequest<DonorResponse>(
            `/api/donors${
              query ? `?${query}` : ""
            }`
          );

        setDonors(response.data);
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

    fetchDonors();
  }, [bloodGroup, district]);

  const filteredDonors =
    donors.filter((donor) => {
      if (!search) {
        return true;
      }

      const searchableText =
        `${donor.user.name} ${donor.district} ${
          donor.area ?? ""
        }`.toLowerCase();

      return searchableText.includes(search);
    });

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-red-100 bg-white">
        <div className="text-[#910102]">
          <HeartLoader
            text="Finding available donors..."
            size={32}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#102A43]">
            {filteredDonors.length}{" "}
            {filteredDonors.length === 1
              ? "donor"
              : "donors"}{" "}
            found
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            Showing currently available donor profiles.
          </p>
        </div>
      </section>

      {filteredDonors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E3BEB8] bg-white px-6 py-16 text-center">
          <Heart
            size={44}
            className="mx-auto mb-4 text-[#910102]"
          />

          <h3 className="text-xl font-bold text-[#102A43]">
            No donors found
          </h3>

          <p className="mt-2 text-[#49607C]">
            Try changing or clearing your filters.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onRequestContact={() =>
                setSelectedDonor(donor)
              }
            />
          ))}
        </section>
      )}

      {selectedDonor && (
        <ContactModal
          donor={selectedDonor}
          onClose={() =>
            setSelectedDonor(null)
          }
        />
      )}
    </>
  );
}

function DonorCard({
  donor,
  onRequestContact,
}: {
  donor: ApiDonor;
  onRequestContact: () => void;
}) {
  const lastDonation =
    donor.lastDonation
      ? new Date(
          donor.lastDonation
        ).toLocaleDateString()
      : "Not provided";

  const initials = donor.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#E3BEB8] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-[#910102]">
          {initials || (
            <UserRound size={26} />
          )}
        </div>

        <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-[#910102] px-3 text-sm font-extrabold text-white">
          {
            bloodGroupToLabel[
              donor.bloodGroup
            ]
          }
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#102A43]">
        {donor.user.name}
      </h3>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-[#5A403C]">
        <MapPin size={16} />

        <span>
          {donor.area
            ? `${donor.area}, `
            : ""}
          {donor.district}
        </span>
      </p>

      <div className="mt-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Available Now
        </span>
      </div>

      <div className="my-5 space-y-3 border-y border-slate-100 py-4 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-[#5A403C]">
            Last donation
          </span>

          <span className="text-right font-semibold text-[#102A43]">
            {lastDonation}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-[#5A403C]">
            Contact
          </span>

          <span className="flex items-center gap-1 font-semibold text-[#102A43]">
            <Phone size={14} />
            Protected
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onRequestContact}
        className="mt-auto flex w-full items-center justify-center rounded-[10px] border-2 border-[#910102] bg-white py-3 text-sm font-bold text-[#910102] transition hover:bg-[#910102] hover:text-white active:scale-[0.98]"
      >
        Request Contact
      </button>
    </article>
  );
}

function ContactModal({
  donor,
  onClose,
}: {
  donor: ApiDonor;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact request"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-md transition hover:bg-red-50 hover:text-[#910102]"
        >
          <X size={20} />
        </button>

        <div className="border-b border-slate-100 px-6 pb-5 pt-7 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#910102]">
            Donor Contact Request
          </span>

          <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
            Contact {donor.user.name}
          </h2>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-[#64748B]">
            <MapPin size={15} />

            {donor.area
              ? `${donor.area}, `
              : ""}
            {donor.district}
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <ContactRequestForm
            donorId={donor.id}
            donorName={donor.user.name}
          />
        </div>
      </div>
    </div>
  );
}