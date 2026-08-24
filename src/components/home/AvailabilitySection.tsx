"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  ToggleRight,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const benefits = [
  "Focus on donors who are currently marked as available.",
  "Donors can update availability directly from their dashboard.",
  "Unavailable donors can avoid unnecessary contact requests.",
];

export default function AvailabilitySection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <motion.article
                whileHover={{
                  y: -6,
                }}
                className="relative overflow-hidden rounded-3xl border-2 border-green-500 bg-white p-6 shadow-md"
              >
                <motion.span
                  animate={{
                    scale: [
                      1,
                      1.5,
                      1,
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-green-500"
                />

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-sm font-black text-[#910102]">
                  O+
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-green-700">
                  Donor Status
                </p>

                <h3 className="mt-2 text-xl font-black text-[#102A43]">
                  Available
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This donor is currently open to
                  receiving contact requests.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  <ToggleRight
                    size={16}
                  />
                  Availability On
                </div>
              </motion.article>

              <motion.article
                whileHover={{
                  y: -4,
                }}
                className="rounded-3xl border border-slate-200 bg-white p-6 opacity-70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-500">
                  B-
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Donor Status
                </p>

                <h3 className="mt-2 text-xl font-black text-[#102A43]">
                  Unavailable
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This donor has temporarily turned
                  off their availability.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  <Clock3
                    size={15}
                  />
                  Not available
                </div>
              </motion.article>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
              Donor Availability
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#102A43] sm:text-4xl">
              Find donors who are ready to help
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              LifeLink allows donors to control their
              availability so users can focus on donors
              who are more likely to respond.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map(
                (benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{
                      opacity: 0,
                      x: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay:
                        index *
                        0.08,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <span className="leading-7 text-[#102A43]">
                      {benefit}
                    </span>
                  </motion.li>
                )
              )}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}