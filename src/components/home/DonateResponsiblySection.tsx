"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BedDouble,
  Droplets,
  ShieldCheck,
  Utensils,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const donationTips = [
  {
    title:
      "Eat a healthy meal before donating",
    description:
      "Avoid donating on an empty stomach and choose a balanced meal beforehand.",
    icon: Utensils,
  },
  {
    title:
      "Stay properly hydrated",
    description:
      "Drink enough water before and after donation to help your body recover.",
    icon: Droplets,
  },
  {
    title:
      "Get enough rest",
    description:
      "A good night of sleep can help you feel more comfortable during donation.",
    icon: BedDouble,
  },
];

export default function DonateResponsiblySection() {
  return (
    <section
      id="why-donate"
      className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-[#F8FAFC] shadow-sm lg:grid-cols-2">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <Reveal>
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#910102]">
                <ShieldCheck
                  size={17}
                />
                Donor Safety
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
                Donate responsibly
                and safely
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                Blood donation should
                always be approached
                responsibly. Simple
                preparation can make
                the experience safer
                and more comfortable.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {donationTips.map(
                (tip, index) => {
                  const Icon =
                    tip.icon;

                  return (
                    <Reveal
                      key={
                        tip.title
                      }
                      delay={
                        index *
                        0.08
                      }
                    >
                      <motion.article
                        whileHover={{
                          x: 5,
                        }}
                        className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-red-200 hover:shadow-md"
                      >
                        <motion.div
                          whileHover={{
                            rotate:
                              -5,
                          }}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#910102] transition group-hover:bg-[#910102] group-hover:text-white"
                        >
                          <Icon
                            size={
                              21
                            }
                          />
                        </motion.div>

                        <div>
                          <h3 className="font-bold text-[#102A43]">
                            {
                              tip.title
                            }
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {
                              tip.description
                            }
                          </p>
                        </div>
                      </motion.article>
                    </Reveal>
                  );
                }
              )}
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              Always follow instructions
              provided by qualified
              healthcare professionals
              and the donation center.
            </p>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]"
          >
            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.6,
              }}
              className="absolute inset-0"
            >
              <Image
                src="/images/donate-responsibly.jpg"
                alt="Safe blood donation environment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.35,
              }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/30 p-5 text-white backdrop-blur-md"
            >
              <p className="text-sm font-semibold text-white/70">
                Healthy donor
              </p>

              <p className="mt-1 text-lg font-bold">
                Your wellbeing matters too.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}