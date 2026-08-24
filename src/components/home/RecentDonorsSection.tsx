"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";

import type {
  ApiDonor,
} from "@/types/donor";

type DonorResponse = {
  success: boolean;
  message: string;
  data: ApiDonor[];
};

export default function RecentDonorsSection() {
  const [donors, setDonors] =
    useState<ApiDonor[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadDonors =
      async () => {
        try {
          const response =
            await apiRequest<DonorResponse>(
              "/api/donors"
            );

          const availableDonors =
            response.data
              .filter(
                (donor) =>
                  donor.isAvailable
              )
              .slice(0, 4);

          setDonors(
            availableDonors
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

    loadDonors();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#910102]">
              Recent Donors
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
              Available donors
              near you
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Browse recently added
              donors and find someone
              who may be able to help.
            </p>
          </div>

          <Link
            href="/donors"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#910102] transition hover:gap-3"
          >
            View all donors
            <ArrowRight
              size={17}
            />
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-[280px] items-center justify-center text-[#910102]">
            <HeartLoader
              text="Finding donors..."
              size={30}
            />
          </div>
        )}

        {/* Error */}
        {!isLoading &&
          error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

        {/* Empty */}
        {!isLoading &&
          !error &&
          donors.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <HeartHandshake
                size={42}
                className="mx-auto text-[#910102]"
              />

              <h3 className="mt-4 text-lg font-bold text-[#102A43]">
                No available donors
                right now
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                New donor profiles
                will appear here.
              </p>
            </div>
          )}

        {/* Donor Cards */}
        {!isLoading &&
          !error &&
          donors.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {donors.map(
                (donor) => (
                  <article
                    key={donor.id}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-sm font-black text-[#910102]">
                        {getInitials(
                          donor.user
                            .name
                        )}
                      </div>

                      <div className="flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#910102] px-2 font-black text-white">
                        {
                          bloodGroupToLabel[
                            donor
                              .bloodGroup
                          ]
                        }
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-[#102A43]">
                      {
                        donor.user.name
                      }
                    </h3>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-[#910102]"
                        />

                        <span>
                          {donor.area
                            ? `${donor.area}, `
                            : ""}

                          {
                            donor.district
                          }
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <CalendarDays
                          size={16}
                          className="mt-0.5 shrink-0 text-[#910102]"
                        />

                        <span>
                          {donor.lastDonation
                            ? `Last donated ${new Date(
                                donor.lastDonation
                              ).toLocaleDateString()}`
                            : "Donation date not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        Available
                      </span>

                      <Link
                        href="/donors"
                        className="text-xs font-bold text-[#910102] transition group-hover:underline"
                      >
                        View donor
                      </Link>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
}

function getInitials(
  name: string
) {
  return name
    .split(" ")
    .filter(Boolean)
    .map(
      (part) => part[0]
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}