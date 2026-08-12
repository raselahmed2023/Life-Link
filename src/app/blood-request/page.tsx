"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Hospital,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

const bloodGroups = [
  ["A+", "A_POSITIVE"],
  ["A-", "A_NEGATIVE"],
  ["B+", "B_POSITIVE"],
  ["B-", "B_NEGATIVE"],
  ["AB+", "AB_POSITIVE"],
  ["AB-", "AB_NEGATIVE"],
  ["O+", "O_POSITIVE"],
  ["O-", "O_NEGATIVE"],
];

type ApiResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

export default function BloodRequestPage() {
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

    try {
      const response =
        await apiRequest<ApiResponse>(
          "/api/blood-requests",
          {
            method: "POST",
            token,
            body: JSON.stringify({
              patientName:
                String(
                  formData.get(
                    "patientName"
                  )
                ),
              bloodGroup:
                String(
                  formData.get(
                    "bloodGroup"
                  )
                ),
              hospital:
                String(
                  formData.get(
                    "hospital"
                  )
                ),
              district:
                String(
                  formData.get(
                    "district"
                  )
                ),
              requiredDate:
                String(
                  formData.get(
                    "requiredDate"
                  )
                ),
              phone:
                String(
                  formData.get(
                    "phone"
                  )
                ),
              message:
                String(
                  formData.get(
                    "message"
                  ) || ""
                ) || undefined,
            }),
          }
        );

      setSuccess(
        response.message ||
          "Blood request created successfully"
      );

      event.currentTarget.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create blood request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center text-[#910102]">
        <HeartLoader
          text="Preparing blood request..."
          size={32}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#A90000]">
            <AlertCircle size={29} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#102A43] sm:text-4xl">
            Request Blood
          </h1>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-[#64748B]">
            Submit accurate patient and hospital
            details so suitable donors can be found
            faster.
          </p>
        </div>

        <section className="rounded-3xl border border-[#E9D0CC] bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Field
              icon={<UserRound size={18} />}
              label="Patient Name"
            >
              <input
                name="patientName"
                required
                placeholder="Patient full name"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Blood Group
                </label>

                <select
                  name="bloodGroup"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select group
                  </option>

                  {bloodGroups.map(
                    ([label, value]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <Field
                icon={<Phone size={18} />}
                label="Contact Number"
              >
                <input
                  name="phone"
                  required
                  placeholder="01XXXXXXXXX"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              icon={<Hospital size={18} />}
              label="Hospital"
            >
              <input
                name="hospital"
                required
                placeholder="Hospital name"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                icon={<MapPin size={18} />}
                label="District"
              >
                <input
                  name="district"
                  required
                  placeholder="e.g. Dhaka"
                  className={inputClass}
                />
              </Field>

              <Field
                icon={
                  <CalendarDays size={18} />
                }
                label="Required Date"
              >
                <input
                  name="requiredDate"
                  type="date"
                  required
                  className={inputClass}
                />
              </Field>
            </div>

            <div>
              <label className={labelClass}>
                Additional Message
              </label>

              <textarea
                name="message"
                rows={4}
                placeholder="Any important information..."
                className={`${inputClass} h-auto py-3`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-xl bg-[#A90000] py-4 font-bold text-white transition hover:bg-[#910102] disabled:opacity-70"
            >
              {isSubmitting ? (
                <HeartLoader text="Submitting request..." />
              ) : (
                "Submit Blood Request"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-[#D7DEE7] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#102A43]";

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={`${labelClass} flex items-center gap-2`}>
        <span className="text-[#910102]">
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}