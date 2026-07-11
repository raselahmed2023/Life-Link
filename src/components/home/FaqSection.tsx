"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    id: 1,
    question: "How do I request contact information?",
    answer:
      'When you find a donor, click the "Request Contact" button. The donor will receive your request. After approval, you will be able to access their contact information.',
  },
  {
    id: 2,
    question: "Is my data safe on LifeLink?",
    answer:
      "Yes. Donor phone numbers are not displayed publicly. Contact information is shared only after the donor approves a valid contact request.",
  },
  {
    id: 3,
    question: "How often can I donate blood?",
    answer:
      "Donation eligibility and timing depend on your health and medical guidance. Always consult a qualified healthcare professional before donating blood.",
  },
];

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const handleToggle = (faqId: number) => {
    setOpenFaqId((currentId) =>
      currentId === faqId ? null : faqId
    );
  };

  return (
    <section
      id="faq"
      className="px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
            Need Help?
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 leading-7 text-[#49607C]">
            Learn how donor discovery, privacy and contact requests work.
          </p>
        </div>

        {/* FAQ items */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <article
                key={faq.id}
                className="overflow-hidden rounded-xl border border-[#E3BEB8] bg-white"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-[#F2F4F6]"
                >
                  <span className="font-bold text-[#102A43]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-[#49607C] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="border-t border-[#E3BEB8] bg-[#F8FAFC] p-6"
                  >
                    <p className="leading-7 text-[#49607C]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}