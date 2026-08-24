"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import Reveal from "@/components/ui/Reveal";
import { apiRequest } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";

import type { ApiDonor } from "@/types/donor";

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
    const loadDonors = async () => {
      try {
        const response =
          await apiRequest<DonorResponse>(
            "/api/donors"
          );

        setDonors(
          response.data
            .filter(
              (donor) =>
                donor.isAvailable &&
                !donor.isDeleted
            )
            .slice(0, 4)
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
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-red-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
                Recent Donors
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
                Available donors near you
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Browse available donors and find someone
                who may be able to help.
              </p>
            </div>

            <Link
              href="/donors"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#910102]"
            >
              View all donors

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        {isLoading && (
          <div className="flex min-h-[300px] items-center justify-center text-[#910102]">
            <HeartLoader
              text="Finding donors..."
              size={30}
            />
          </div>
        )}

        {!isLoading &&
          error && (
            <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center">
              <HeartHandshake
                size={38}
                className="mx-auto text-red-600"
              />

              <p className="mt-4 font-semibold text-red-700">
                {error}
              </p>
            </div>
          )}

        {!isLoading &&
          !error &&
          donors.length === 0 && (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
                <HeartHandshake
                  size={42}
                  className="mx-auto text-[#910102]"
                />

                <h3 className="mt-4 text-lg font-bold text-[#102A43]">
                  No available donors right now
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Available donor profiles will appear here.
                </p>
              </div>
            </Reveal>
          )}

        {!isLoading &&
          !error &&
          donors.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {donors.map(
                (donor, index) => (
                  <Reveal
                    key={donor.id}
                    delay={index * 0.08}
                  >
                    <motion.article
                      whileHover={{
                        y: -8,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:border-red-200 hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                          }}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-sm font-black text-[#910102]"
                        >
                          {getInitials(
                            donor.user.name
                          )}
                        </motion.div>

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                            rotate: 3,
                          }}
                          className="flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#910102] px-2 text-sm font-black text-white shadow-sm"
                        >
                          {
                            bloodGroupToLabel[
                              donor.bloodGroup
                            ]
                          }
                        </motion.div>
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-[#102A43]">
                        {donor.user.name}
                      </h3>

                      <div className="mt-4 flex-1 space-y-3">
                        <div className="flex items-start gap-2.5 text-sm text-slate-600">
                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-[#910102]"
                          />

                          <span>
                            {donor.area
                              ? `${donor.area}, `
                              : ""}

                            {donor.district}
                          </span>
                        </div>

                        <div className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CalendarDays
                            size={16}
                            className="mt-0.5 shrink-0 text-[#910102]"
                          />

                          <span>
                            {donor.lastDonation
                              ? `Last donated ${formatDate(
                                  donor.lastDonation
                                )}`
                              : "Last donation not provided"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                          <motion.span
                            animate={{
                              scale: [
                                1,
                                1.4,
                                1,
                              ],
                            }}
                            transition={{
                              duration: 1.8,
                              repeat:
                                Infinity,
                            }}
                            className="h-1.5 w-1.5 rounded-full bg-green-500"
                          />

                          Available
                        </span>

                        <Link
                          href={`/donors/${donor.id}`}
                          className="text-xs font-bold text-[#910102] hover:underline"
                        >
                          View donor
                        </Link>
                      </div>
                    </motion.article>
                  </Reveal>
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