"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  CheckCircle2,
  Send,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

type ContactRequestFormProps = {
  donorId: string;
  donorName: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

export default function ContactRequestForm({
  donorId,
  donorName,
}: ContactRequestFormProps) {
  const [isSending, setIsSending] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

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
        "Please login before sending a contact request"
      );
      return;
    }

    const formData =
      new FormData(
        event.currentTarget
      );

    const message =
      String(
        formData.get("message") || ""
      ).trim();

    setError("");
    setSuccess("");
    setIsSending(true);

    try {
      const response =
        await apiRequest<ApiResponse>(
          "/api/contact-requests",
          {
            method: "POST",
            token,
            body: JSON.stringify({
              donorId,
              message:
                message || undefined,
            }),
          }
        );

      setSuccess(
        response.message ||
          "Contact request sent successfully"
      );

      event.currentTarget.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send request"
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#E3BEB8]/50 bg-white p-6 shadow-sm lg:p-8">
      <h2 className="text-2xl font-bold text-[#191C1E]">
        Request Contact
      </h2>

      <p className="mt-3 leading-7 text-[#5A403C]">
        Send a request to{" "}
        <strong>{donorName}</strong>.
        Their direct contact information remains
        protected until they accept.
      </p>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-5"
      >
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold text-[#5A403C]"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Explain briefly why you need to contact this donor..."
            className="w-full rounded-xl border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#910102] py-4 font-bold text-white transition hover:bg-[#B42318] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSending ? (
            <HeartLoader text="Sending request..." />
          ) : (
            <>
              <Send size={19} />
              Send Request
            </>
          )}
        </button>
      </form>

      <div className="mt-6 rounded-xl bg-[#F2F4F6] p-4">
        <p className="text-xs leading-5 text-[#5A403C]">
          LifeLink protects donor contact details
          until the donor approves your request.
        </p>
      </div>
    </div>
  );
}