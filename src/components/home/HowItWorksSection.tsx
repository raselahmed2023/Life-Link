"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  HeartHandshake,
  Search,
  Send,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Donor",
    description:
      "Search donors by blood group and location to find the most relevant matches.",
  },
  {
    number: "02",
    icon: Send,
    title: "Send Contact Request",
    description:
      "Send a request without exposing private donor contact information publicly.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Donor Approves",
    description:
      "The donor reviews the request and decides whether to accept or reject it.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Connect Directly",
    description:
      "After approval, contact information becomes available so both sides can connect.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
              A simple path from search to connection
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              LifeLink keeps the process simple while
              protecting donor contact information until approval.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-6 hidden border-t border-dashed border-red-200 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal
                key={step.number}
                delay={index * 0.08}
              >
                <motion.article
                  whileHover={{
                    y: -7,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="group relative z-10 h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-red-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      whileHover={{
                        rotate: -5,
                        scale: 1.08,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#910102] transition group-hover:bg-[#910102] group-hover:text-white"
                    >
                      <Icon size={23} />
                    </motion.div>

                    <span className="text-4xl font-black leading-none text-red-50 transition group-hover:text-red-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#102A43]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>

                  <div className="mt-6 h-1 w-10 rounded-full bg-red-100 transition-all duration-300 group-hover:w-16 group-hover:bg-[#910102]" />
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}