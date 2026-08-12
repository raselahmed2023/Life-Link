"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Save,
  UserRound,
  X,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
};

type EditProfileModalProps = {
  isOpen: boolean;
  profile: Profile;
  onClose: () => void;
  onUpdated: (profile: Profile) => void;
};

type UpdateProfileResponse = {
  success: boolean;
  message: string;
  data: Profile;
};

export default function EditProfileModal({
  isOpen,
  profile,
  onClose,
  onUpdated,
}: EditProfileModalProps) {
  const [name, setName] =
    useState(profile.name);

  const [phone, setPhone] =
    useState(profile.phone || "");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (isOpen) {
      setName(profile.name);
      setPhone(profile.phone || "");
      setError("");
      setSuccess("");
    }
  }, [isOpen, profile]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
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
        "Please login again."
      );
      return;
    }

    if (!name.trim()) {
      setError(
        "Name is required."
      );
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response =
        await apiRequest<UpdateProfileResponse>(
          `/api/users/${profile.id}`,
          {
            method: "PATCH",
            token,

            body: JSON.stringify({
              name: name.trim(),
              phone:
                phone.trim(),
            }),
          }
        );

      onUpdated(response.data);

      /*
        Update localStorage user
        so Navbar immediately gets
        the latest name.
      */
      const storedUser =
        localStorage.getItem(
          "lifelink_user"
        );

      if (storedUser) {
        try {
          const parsedUser =
            JSON.parse(
              storedUser
            );

          localStorage.setItem(
            "lifelink_user",
            JSON.stringify({
              ...parsedUser,
              name:
                response.data.name,
              phone:
                response.data.phone,
            })
          );
        } catch {
          // Ignore corrupted storage.
        }
      }

      setSuccess(
        response.message ||
          "Profile updated successfully."
      );

      setTimeout(() => {
        onClose();

        /*
          Makes Navbar reload stored
          user data cleanly.
        */
        window.location.reload();
      }, 800);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#910102]">
              Account Settings
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#102A43]">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Update your personal
              information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F5F7] text-[#64748B] transition hover:bg-red-50 hover:text-[#910102]"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
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

          {/* Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <UserRound
                size={18}
                className="text-[#910102]"
              />

              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              required
              placeholder="Your full name"
              className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            />
          </div>

          {/* Email - readonly */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <Mail
                size={18}
                className="text-[#910102]"
              />

              Email
            </label>

            <input
              type="email"
              value={profile.email}
              readOnly
              className="h-12 w-full cursor-not-allowed rounded-xl border border-[#E7E9EE] bg-[#F3F5F7] px-4 text-[#64748B]"
            />

            <p className="mt-1.5 text-xs text-[#94A3B8]">
              Email cannot be changed
              from profile settings.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#102A43]">
              <Phone
                size={18}
                className="text-[#910102]"
              />

              Phone
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
              placeholder="01XXXXXXXXX"
              className="h-12 w-full rounded-xl border border-[#D7DEE7] px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/10"
            />
          </div>

          {/* Fixed fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#F8FAFC] p-4">
              <p className="text-xs text-[#64748B]">
                Role
              </p>

              <p className="mt-1 text-sm font-bold text-[#102A43]">
                {profile.role}
              </p>
            </div>

            <div className="rounded-xl bg-[#F8FAFC] p-4">
              <p className="text-xs text-[#64748B]">
                Status
              </p>

              <p className="mt-1 text-sm font-bold text-green-700">
                {profile.status}
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-xl border border-[#D7DEE7] px-5 py-3 text-sm font-bold text-[#49607C] transition hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B42318] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <HeartLoader
                  text="Saving..."
                  size={17}
                />
              ) : (
                <>
                  <Save size={17} />
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