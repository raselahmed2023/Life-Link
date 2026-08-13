"use client";

import {
  CheckCircle2,
  Power,
} from "lucide-react";

import { useState } from "react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

import type {
  ApiDonor,
} from "@/types/donor";

type Props = {
  donor: ApiDonor;

  onUpdated: (
    donor: ApiDonor
  ) => void;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiDonor;
};

export default function DonorAvailabilityToggle({
  donor,
  onUpdated,
}: Props) {
  const [
    isUpdating,
    setIsUpdating,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const handleToggle = async () => {
    const token =
      localStorage.getItem(
        "lifelink_token"
      );

    if (!token) {
      setError(
        "Please login again."
      );
      return;
    }

    const nextAvailability =
      !donor.isAvailable;

    setIsUpdating(true);
    setError("");

    try {
      const response =
        await apiRequest<ApiResponse>(
          `/api/donors/${donor.id}`,
          {
            method: "PATCH",
            token,

            body: JSON.stringify({
              isAvailable:
                nextAvailability,
            }),
          }
        );

      onUpdated(
        response.data
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update availability."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div
        className={`rounded-2xl border p-4 transition ${
          donor.isAvailable
            ? "border-green-200 bg-green-50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                donor.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {donor.isAvailable ? (
                <CheckCircle2
                  size={20}
                />
              ) : (
                <Power
                  size={20}
                />
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-[#102A43]">
                Donor Availability
              </p>

              <p
                className={`mt-0.5 text-xs font-semibold ${
                  donor.isAvailable
                    ? "text-green-700"
                    : "text-slate-500"
                }`}
              >
                {donor.isAvailable
                  ? "You are currently visible as an available donor."
                  : "You are currently marked as unavailable."}
              </p>
            </div>
          </div>

          {isUpdating ? (
            <div className="shrink-0 text-[#910102]">
              <HeartLoader
                size={17}
                text=""
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={
                handleToggle
              }
              aria-label="Toggle donor availability"
              aria-pressed={
                donor.isAvailable
              }
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                donor.isAvailable
                  ? "bg-green-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                  donor.isAvailable
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}