"use client";

import { motion } from "framer-motion";
import {
  EyeOff,
  HeartHandshake,
  MapPin,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const benefits = [
  {
    icon: MapPin,
    title:
      "Location-Based Search",
    description:
      "Find donors using blood group and location information to narrow down relevant matches.",
  },
  {
    icon: EyeOff,
    title:
      "Contact Privacy",
    description:
      "Phone numbers and email addresses are not exposed in the public donor directory.",
  },
  {
    icon: HeartHandshake,
    title:
      "Approval-Based Connection",
    description:
      "Donors decide whether to accept or reject contact requests before their contact details are shared.",
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
              Why LifeLink
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
              Simpler and safer donor connections
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              LifeLink focuses on
              donor discovery, privacy
              and controlled
              communication.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map(
            (benefit, index) => {
              const Icon =
                benefit.icon;

              return (
                <Reveal
                  key={
                    benefit.title
                  }
                  delay={
                    index *
                    0.1
                  }
                >
                  <motion.article
                    whileHover={{
                      y: -8,
                      scale: 1.01,
                    }}
                    className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-red-200 hover:shadow-lg"
                  >
                    <motion.div
                      whileHover={{
                        rotate: -6,
                        scale: 1.1,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#910102] transition group-hover:bg-[#910102] group-hover:text-white"
                    >
                      <Icon
                        size={23}
                      />
                    </motion.div>

                    <h3 className="mt-6 text-xl font-black text-[#102A43]">
                      {
                        benefit.title
                      }
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {
                        benefit.description
                      }
                    </p>
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