"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import {
  useState,
} from "react";

import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    question:
      "Is donor contact information public?",
    answer:
      "No. Donor phone and email information is not shown publicly. Contact details become available only after the donor approves a contact request.",
  },
  {
    question:
      "Who can create a blood request?",
    answer:
      "A registered and logged-in user can submit a blood request. The request remains pending until an administrator reviews it.",
  },
  {
    question:
      "Can a donor change their availability?",
    answer:
      "Yes. Donors can turn their availability on or off from their dashboard whenever needed.",
  },
  {
    question:
      "Who approves donor contact requests?",
    answer:
      "The donor receiving the contact request decides whether to approve or reject it. Administrators monitor activity but do not approve requests on behalf of donors.",
  },
  {
    question:
      "What happens after a donor approves my request?",
    answer:
      "Once approved, the donor's approved contact information becomes available so you can communicate directly.",
  },
];

export default function FaqSection() {
  const [
    openIndex,
    setOpenIndex,
  ] =
    useState<number | null>(
      0
    );

  return (
    <section
      id="faq"
      className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center">
            <motion.div
              whileHover={{
                rotate: -8,
                scale: 1.08,
              }}
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#910102]"
            >
              <HelpCircle
                size={23}
              />
            </motion.div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
              Questions about LifeLink
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Learn how blood requests,
              donor availability and
              contact approvals work.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map(
            (faq, index) => {
              const isOpen =
                openIndex ===
                index;

              return (
                <Reveal
                  key={
                    faq.question
                  }
                  delay={
                    index *
                    0.05
                  }
                >
                  <motion.article
                    layout
                    className={`overflow-hidden rounded-2xl border bg-white transition ${
                      isOpen
                        ? "border-red-200 shadow-md"
                        : "border-slate-200 shadow-sm"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex(
                          isOpen
                            ? null
                            : index
                        )
                      }
                      aria-expanded={
                        isOpen
                      }
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="font-bold text-[#102A43]">
                        {
                          faq.question
                        }
                      </span>

                      <motion.div
                        animate={{
                          rotate:
                            isOpen
                              ? 180
                              : 0,
                        }}
                        transition={{
                          duration:
                            0.25,
                        }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isOpen
                            ? "bg-[#910102] text-white"
                            : "bg-red-50 text-[#910102]"
                        }`}
                      >
                        <ChevronDown
                          size={18}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence
                      initial={
                        false
                      }
                    >
                      {isOpen && (
                        <motion.div
                          initial={{
                            height:
                              0,
                            opacity:
                              0,
                          }}
                          animate={{
                            height:
                              "auto",
                            opacity:
                              1,
                          }}
                          exit={{
                            height:
                              0,
                            opacity:
                              0,
                          }}
                          transition={{
                            duration:
                              0.3,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6">
                            {
                              faq.answer
                            }
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                </Reveal>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}