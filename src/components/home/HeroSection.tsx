"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartHandshake,
  Search,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F7] via-white to-[#F8FAFC]">
      {/* Background decorations */}
      <motion.div
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-red-100/40 blur-3xl"
        animate={{
          x: [0, 18, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-red-200/30 blur-3xl"
        animate={{
          x: [0, -18, 0],
          y: [0, 14, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Left */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-bold text-[#910102] shadow-sm">
              <HeartHandshake size={17} />
              Connecting donors with people in need
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#102A43] sm:text-5xl lg:text-6xl">
              Find the right blood donor
              <span className="text-[#A90000]">
                {" "}
                when every moment matters.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              LifeLink makes it easier to find available blood donors,
              request blood, and connect safely through a simple
              approval-based contact system.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  href="/donors"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#910102] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#B42318] hover:shadow-lg sm:w-auto"
                >
                  <Search size={18} />
                  Find Donors
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  href="/blood-requests"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3.5 text-sm font-bold text-[#910102] transition hover:border-red-300 hover:bg-red-50 sm:w-auto"
                >
                  Blood Requests
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <MiniStat
                value="8"
                label="Blood Groups"
              />

              <MiniStat
                value="24/7"
                label="Access"
              />

              <MiniStat
                value="Direct"
                label="Connection"
              />
            </div>
          </Reveal>
        </div>

        {/* Right */}
        <motion.div
          initial={{
            opacity: 0,
            x: 45,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="relative"
        >
          <div className="relative mx-auto max-w-[560px]">
            <motion.div
              className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-red-100 to-red-50 blur-xl"
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white bg-white p-3 shadow-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/lifelink-hero.jpg"
                  alt="Blood donor helping someone in need"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-6 pt-20">
                  <p className="text-sm font-semibold text-white/80">
                    One connection can save a life
                  </p>

                  <p className="mt-1 text-xl font-black text-white">
                    Be available when someone needs you.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.5,
              }}
              className="absolute -bottom-5 -left-4 rounded-2xl border border-red-100 bg-white px-4 py-3 shadow-lg sm:left-2"
            >
              <p className="text-xs font-semibold text-slate-500">
                Donor Search
              </p>

              <p className="mt-1 font-bold text-[#102A43]">
                Blood group + location
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-red-100 bg-white/80 p-4 backdrop-blur"
    >
      <p className="text-xl font-black text-[#910102]">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-500">
        {label}
      </p>
    </motion.div>
  );
}