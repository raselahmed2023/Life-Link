"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Droplet,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

export default function BloodGroupSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
              Blood Groups
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
              Find donors by blood group
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Choose a blood group to quickly browse
              matching donors.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {bloodGroups.map(
            (group, index) => (
              <Reveal
                key={group}
                delay={index * 0.05}
              >
                <motion.div
                  whileHover={{
                    y: -7,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Link
                    href={`/donors?bloodGroup=${encodeURIComponent(
                      group
                    )}`}
                    className="group block rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:border-red-200 hover:shadow-lg"
                  >
                    <motion.div
                      whileHover={{
                        rotate: -8,
                      }}
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#910102] transition group-hover:bg-[#910102] group-hover:text-white"
                    >
                      <Droplet
                        size={23}
                        fill="currentColor"
                      />
                    </motion.div>

                    <p className="mt-4 text-xl font-black text-[#102A43]">
                      {group}
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-[#910102]">
                      Find donors

                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}