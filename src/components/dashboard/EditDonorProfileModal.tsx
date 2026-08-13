"use client";

import type { FormEvent } from "react";
import {
  useEffect,
  useState,
} from "react";
import {
  CalendarDays,
  Droplets,
  MapPin,
  Save,
  X,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import type {
  ApiBloodGroup,
  ApiDonor,
} from "@/types/donor";

type Props = {
  isOpen: boolean;
  donor: ApiDonor;
  onClose: () => void;
  onUpdated: (
    donor: ApiDonor
  ) => void;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiDonor;
};

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
] as const;

export default function EditDonorProfileModal({
  isOpen,
  donor,
  onClose,
  onUpdated,
}: Props) {
  const [
    bloodGroup,
    setBloodGroup,
  ] = useState<ApiBloodGroup>(
    donor.bloodGroup
  );

  const [
    district,
    setDistrict,
  ] = useState(
    donor.district
  );

  const [area, setArea] =
    useState(
      donor.area || ""
    );

  const [
    lastDonation,
    setLastDonation,
  ] = useState("");

  const [
    isAvailable,
    setIsAvailable,
  ] = useState(
    donor.isAvailable
  );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setBloodGroup(
      donor.bloodGroup
    );

    setDistrict(
      donor.district
    );

    setArea(
      donor.area || ""
    );

    setIsAvailable(
      donor.isAvailable
    );

    if (
      donor.lastDonation
    ) {
      const date =
        new Date(
          donor.lastDonation
        );

      setLastDonation(
        date
          .toISOString()
          .split("T")[0]
      );
    } else {
      setLastDonation("");
    }

    setError("");
    setSuccess("");
  }, [
    isOpen,
    donor,
  ]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    isOpen,
    onClose,
  ]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

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

    if (!district.trim()) {
      setError(
        "District is required."
      );

      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response =
        await apiRequest<ApiResponse>(
          `/api/donors/${donor.id}`,
          {
            method: "PATCH",
            token,

            body: JSON.stringify({
              bloodGroup,
              district:
                district.trim(),

              area:
                area.trim() ||
                null,

              lastDonation:
                lastDonation ||
                null,

              isAvailable,
            }),
          }
        );

      onUpdated(
        response.data
      );

      setSuccess(
        response.message ||
          "Donor profile updated successfully."
      );

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 900);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update donor profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(
        event
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#910102]">
              Donor Settings
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#102A43]">
              Edit Donor Profile
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Update your donor
              information and
              availability.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F5F7] text-[#64748B] transition hover:bg-red-50 hover:text-[#910102]"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5 p-6"
        >
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {success}
            </div>
          )}

          {/* Blood Group */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <Droplets
                size={18}
                className="text-[#910102]"
              />

              Blood Group
            </label>

            <select
              value={
                bloodGroup
              }
              onChange={(
                event
              ) =>
                setBloodGroup(
                  event.target
                    .value as ApiBloodGroup
                )
              }
              className="h-12 w-full rounded-xl border border-[#D7DEE7] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            >
              {bloodGroups.map(
                (
                  group
                ) => (
                  <option
                    key={
                      group.value
                    }
                    value={
                      group.value
                    }
                  >
                    {
                      group.label
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <MapPin
                size={18}
                className="text-[#910102]"
              />

              District
            </label>

            <input
              type="text"
              value={
                district
              }
              onChange={(
                event
              ) =>
                setDistrict(
                  event.target
                    .value
                )
              }
              required
              placeholder="e.g. Dhaka"
              className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            />
          </div>

          {/* Area */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <MapPin
                size={18}
                className="text-[#910102]"
              />

              Area
            </label>

            <input
              type="text"
              value={area}
              onChange={(
                event
              ) =>
                setArea(
                  event.target
                    .value
                )
              }
              placeholder="e.g. Dhanmondi"
              className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            />
          </div>

          {/* Last Donation */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <CalendarDays
                size={18}
                className="text-[#910102]"
              />

              Last Donation
            </label>

            <input
              type="date"
              value={
                lastDonation
              }
              onChange={(
                event
              ) =>
                setLastDonation(
                  event.target
                    .value
                )
              }
              className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            />
          </div>

          {/* Availability */}
          <div className="rounded-2xl border border-[#E7E9EE] bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#102A43]">
                  Available for Donation
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Turn this off if
                  you are temporarily
                  unable to donate.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsAvailable(
                    (
                      current
                    ) =>
                      !current
                  )
                }
                aria-pressed={
                  isAvailable
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  isAvailable
                    ? "bg-green-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    isAvailable
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-[#D7DEE7] px-5 py-3 text-sm font-bold text-[#49607C] transition hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-[165px] items-center justify-center gap-2 rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B42318] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <HeartLoader
                  text="Saving..."
                  size={17}
                />
              ) : (
                <>
                  <Save
                    size={17}
                  />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}