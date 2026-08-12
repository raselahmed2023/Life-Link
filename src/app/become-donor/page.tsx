"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  HeartHandshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

const bloodGroups = [
  {
    label: "A+",
    value: "A_POSITIVE",
  },
  {
    label: "A-",
    value: "A_NEGATIVE",
  },
  {
    label: "B+",
    value: "B_POSITIVE",
  },
  {
    label: "B-",
    value: "B_NEGATIVE",
  },
  {
    label: "AB+",
    value: "AB_POSITIVE",
  },
  {
    label: "AB-",
    value: "AB_NEGATIVE",
  },
  {
    label: "O+",
    value: "O_POSITIVE",
  },
  {
    label: "O-",
    value: "O_NEGATIVE",
  },
];

type ApiResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

export default function BecomeDonorPage() {
  const router = useRouter();

  const [token, setToken] =
    useState<string | null>(null);

  const [isCheckingAuth, setIsCheckingAuth] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    const storedToken =
      localStorage.getItem(
        "lifelink_token"
      );

    if (!storedToken) {
      router.replace("/login");
      return;
    }

    setToken(storedToken);
    setIsCheckingAuth(false);
  }, [router]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formData =
      new FormData(
        event.currentTarget
      );

    const bloodGroup =
      String(
        formData.get(
          "bloodGroup"
        ) || ""
      );

    const district =
      String(
        formData.get(
          "district"
        ) || ""
      ).trim();

    const area =
      String(
        formData.get("area") || ""
      ).trim();

    const lastDonation =
      String(
        formData.get(
          "lastDonation"
        ) || ""
      );

    try {
      const response =
        await apiRequest<ApiResponse>(
          "/api/donors",
          {
            method: "POST",
            token,
            body: JSON.stringify({
              bloodGroup,
              district,
              area:
                area || undefined,
              lastDonation:
                lastDonation ||
                undefined,
              isAvailable: true,
            }),
          }
        );

      setSuccess(
        response.message ||
          "Donor profile created successfully"
      );

      setTimeout(() => {
        router.push("/donors");
      }, 1200);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create donor profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] text-[#910102]">
        <HeartLoader
          text="Preparing donor registration..."
          size={32}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#910102]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl bg-gradient-to-br from-[#910102] to-[#650000] p-8 text-white shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <HeartHandshake size={29} />
            </div>

            <h1 className="mt-7 text-3xl font-bold leading-tight">
              Become a LifeLink Donor
            </h1>

            <p className="mt-4 leading-7 text-white/85">
              Register your blood group and
              availability so people can find you
              when help is needed.
            </p>

            <div className="mt-10 space-y-5">
              <InfoRow
                icon={<ShieldCheck size={20} />}
                title="Privacy protected"
                text="Your direct contact details remain protected."
              />

              <InfoRow
                icon={<MapPin size={20} />}
                title="Location based search"
                text="People can find nearby available donors."
              />

              <InfoRow
                icon={<Droplets size={20} />}
                title="Real donor profile"
                text="Your profile is connected to your LifeLink account."
              />
            </div>
          </aside>

          <section className="rounded-3xl border border-[#E9D0CC] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#102A43]">
              Donor Information
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Please provide accurate information.
            </p>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-6"
            >
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="mb-2 block text-sm font-semibold text-[#102A43]"
                >
                  Blood Group
                </label>

                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  required
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-[#D7DEE7] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
                >
                  <option
                    value=""
                    disabled
                  >
                    Select blood group
                  </option>

                  {bloodGroups.map(
                    (group) => (
                      <option
                        key={
                          group.value
                        }
                        value={
                          group.value
                        }
                      >
                        {group.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="district"
                    className="mb-2 block text-sm font-semibold text-[#102A43]"
                  >
                    District
                  </label>

                  <input
                    id="district"
                    name="district"
                    required
                    placeholder="e.g. Dhaka"
                    className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="mb-2 block text-sm font-semibold text-[#102A43]"
                  >
                    Area
                  </label>

                  <input
                    id="area"
                    name="area"
                    placeholder="e.g. Dhanmondi"
                    className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastDonation"
                  className="mb-2 block text-sm font-semibold text-[#102A43]"
                >
                  Last Donation Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />

                  <input
                    id="lastDonation"
                    name="lastDonation"
                    type="date"
                    className="h-12 w-full rounded-xl border border-[#D7DEE7] pl-10 pr-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] p-4">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4"
                />

                <span className="text-sm leading-6 text-[#64748B]">
                  I confirm that the information
                  provided is accurate and I understand
                  that availability should be updated
                  responsibly.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-[#A90000] px-5 py-4 font-bold text-white transition hover:bg-[#910102] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <HeartLoader text="Creating donor profile..." />
                ) : (
                  "Become a Donor"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0 text-white">
        {icon}
      </div>

      <div>
        <h3 className="font-bold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-white/75">
          {text}
        </p>
      </div>
    </div>
  );
}