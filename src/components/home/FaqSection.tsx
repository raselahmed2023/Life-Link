"use client";

import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question:
      "Is donor contact information public?",
    answer:
      "No. Donor phone and email should only become available after the donor approves a contact request.",
  },
  {
    question:
      "Can anyone create a blood request?",
    answer:
      "A registered and logged-in user can submit a blood request. New requests remain pending until an administrator reviews them.",
  },
  {
    question:
      "Can donors stop appearing as available?",
    answer:
      "Yes. Donors can switch their availability on or off directly from their dashboard.",
  },
  {
    question:
      "Who approves contact requests?",
    answer:
      "The donor receiving the request decides whether to approve or reject it. Administrators only monitor contact request activity.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-[#F8FAFC] py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#910102]">
            <HelpCircle size={23} />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-[#910102]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#102A43] sm:text-4xl">
            Common questions about LifeLink
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      isOpen ? null : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-bold text-[#102A43]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#910102] transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}