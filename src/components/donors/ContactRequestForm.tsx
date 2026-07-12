"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

type ContactRequestFormProps = {
  donorName: string;
};

type SubmitStatus =
  | "idle"
  | "sending"
  | "success";

export default function ContactRequestForm({
  donorName,
}: ContactRequestFormProps) {
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    setSubmitStatus("sending");

    // Temporary frontend simulation.
    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setSubmitStatus("success");
    form.reset();

    setTimeout(() => {
      setSubmitStatus("idle");
    }, 3000);
  };

  const isSending =
    submitStatus === "sending";

  const isSuccess =
    submitStatus === "success";

  return (
    <div className="rounded-2xl border border-[#E3BEB8]/50 bg-white p-6 shadow-sm lg:p-8">
      <h2 className="text-2xl font-bold text-[#191C1E]">
        Send Contact Request
      </h2>

      <p className="mt-3 leading-7 text-[#5A403C]">
        Request access to {donorName}&apos;s phone
        number and direct contact information.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div className="space-y-2">
          <label
            htmlFor="patientName"
            className="block text-sm font-semibold text-[#5A403C]"
          >
            Patient Name
          </label>

          <input
            id="patientName"
            name="patientName"
            type="text"
            required
            placeholder="Full name of patient"
            className="w-full rounded-xl border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="hospital"
            className="block text-sm font-semibold text-[#5A403C]"
          >
            Hospital / Location
          </label>

          <input
            id="hospital"
            name="hospital"
            type="text"
            required
            placeholder="e.g. Medical College Hospital"
            className="w-full rounded-xl border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="urgency"
            className="block text-sm font-semibold text-[#5A403C]"
          >
            Urgency Level
          </label>

          <select
            id="urgency"
            name="urgency"
            required
            defaultValue="normal"
            className="w-full cursor-pointer rounded-xl border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          >
            <option value="normal">
              Normal — Next 24 hours
            </option>

            <option value="urgent">
              Urgent — Within 6 hours
            </option>

            <option value="emergency">
              Emergency — Immediate
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSending || isSuccess}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed ${
            isSuccess
              ? "bg-[#15803D]"
              : "bg-[#910102] hover:bg-[#B42318]"
          }`}
        >
          {isSending && (
            <>
              <LoaderCircle
                size={20}
                className="animate-spin"
              />
              Sending Request...
            </>
          )}

          {isSuccess && (
            <>
              <CheckCircle2 size={20} />
              Request Sent!
            </>
          )}

          {submitStatus === "idle" && (
            <>
              <Send size={20} />
              Send Request
            </>
          )}
        </button>
      </form>

      <div className="mt-6 rounded-xl bg-[#F2F4F6] p-4">
        <p className="text-xs leading-5 text-[#5A403C]">
          Contact details will only be shared after
          the donor accepts your request.
        </p>
      </div>
    </div>
  );
}