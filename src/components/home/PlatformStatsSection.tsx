"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  Droplets,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const platformFeatures = [
  {
    title: "8 Blood Groups",
    description:
      "Search across all major ABO and Rh blood groups.",
    icon: Droplets,
  },
  {
    title: "24/7 Access",
    description:
      "Access donor search and blood request features whenever needed.",
    icon: Clock3,
  },
  {
    title: "Private Contact",
    description:
      "Donor contact information stays protected until approval.",
    icon: ShieldCheck,
  },
  {
    title: "Direct Connection",
    description:
      "Approved requests allow donors and requesters to connect directly.",
    icon: HeartHandshake,
  },
];

export default function PlatformStatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#102A43] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-red-900/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map(
            (feature, index) => {
              const Icon =
                feature.icon;

              return (
                <Reveal
                  key={
                    feature.title
                  }
                  delay={
                    index *
                    0.08
                  }
                >
                  <motion.article
                    whileHover={{
                      y: -7,
                      scale: 1.02,
                    }}
                    className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                  >
                    <motion.div
                      whileHover={{
                        rotate: -6,
                        scale: 1.1,
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-red-300"
                    >
                      <Icon
                        size={22}
                      />
                    </motion.div>

                    <h3 className="mt-5 text-xl font-black">
                      {
                        feature.title
                      }
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {
                        feature.description
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