"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Hospital,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

type BloodRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: unknown;
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
];

export default function BloodRequestModal({
  isOpen,
  onClose,
  onSuccess,
}: BloodRequestModalProps) {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow =
      "hidden";

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
  }, [isOpen, onClose]);

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
        "Please login before submitting a blood request."
      );

      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    try {
      const response =
        await apiRequest<ApiResponse>(
          "/api/blood-requests",
          {
            method: "POST",
            token,

            body: JSON.stringify({
              patientName: String(
                formData.get(
                  "patientName"
                ) || ""
              ).trim(),

              bloodGroup: String(
                formData.get(
                  "bloodGroup"
                ) || ""
              ),

              hospital: String(
                formData.get(
                  "hospital"
                ) || ""
              ).trim(),

              district: String(
                formData.get(
                  "district"
                ) || ""
              ).trim(),

              requiredDate: String(
                formData.get(
                  "requiredDate"
                ) || ""
              ),

              phone: String(
                formData.get(
                  "phone"
                ) || ""
              ).trim(),

              message:
                String(
                  formData.get(
                    "message"
                  ) || ""
                ).trim() ||
                undefined,
            }),
          }
        );

      setSuccess(
        response.message ||
          "Blood request submitted successfully."
      );

      form.reset();

      onSuccess?.();

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1200);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit blood request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-red-100 bg-white px-6 py-5 sm:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#910102]">
              <AlertCircle size={15} />
              Emergency Request
            </span>

            <h2 className="mt-3 text-2xl font-black text-[#102A43]">
              Request Blood
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Submit accurate patient
              information for admin review.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close blood request form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F5F7] text-[#64748B] transition hover:bg-red-50 hover:text-[#910102]"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6 sm:p-8"
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

          <FormField
            icon={
              <UserRound size={18} />
            }
            label="Patient Name"
          >
            <input
              name="patientName"
              type="text"
              required
              placeholder="Patient full name"
              className={inputClass}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Blood Group
              </label>

              <select
                name="bloodGroup"
                defaultValue=""
                required
                className={inputClass}
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
                      key={group.value}
                      value={group.value}
                    >
                      {group.label}
                    </option>
                  )
                )}
              </select>
            </div>

            <FormField
              icon={<Phone size={18} />}
              label="Contact Number"
            >
              <input
                name="phone"
                type="tel"
                required
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </FormField>
          </div>

          <FormField
            icon={
              <Hospital size={18} />
            }
            label="Hospital"
          >
            <input
              name="hospital"
              type="text"
              required
              placeholder="Hospital name"
              className={inputClass}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              icon={<MapPin size={18} />}
              label="District"
            >
              <input
                name="district"
                type="text"
                required
                placeholder="e.g. Dhaka"
                className={inputClass}
              />
            </FormField>

            <FormField
              icon={
                <CalendarDays
                  size={18}
                />
              }
              label="Required Date"
            >
              <input
                name="requiredDate"
                type="date"
                required
                className={inputClass}
              />
            </FormField>
          </div>

          <div>
            <label className={labelClass}>
              Additional Message
            </label>

            <textarea
              name="message"
              rows={4}
              placeholder="Any additional information for donors..."
              className="w-full resize-none rounded-xl border border-[#D7DEE7] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            />
          </div>

          <div className="rounded-xl bg-[#FFF7F6] p-4 text-sm leading-6 text-[#70413B]">
            Your request will first be
            reviewed by an administrator.
            Once approved, it will appear
            publicly in Blood Requests.
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
              className="flex min-w-[175px] items-center justify-center rounded-xl bg-[#A90000] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#910102] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <HeartLoader
                  text="Submitting..."
                  size={18}
                />
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-[#D7DEE7] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#102A43]";

function FormField({
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
      <label
        className={`${labelClass} flex items-center gap-2`}
      >
        <span className="text-[#910102]">
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}