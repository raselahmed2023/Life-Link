"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  ArrowRight,
  Droplet,
  Eye,
  EyeOff,
  Heart,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

const loginBackground =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAm15R-k29kaj1FZvOlPbGDILtqwFyvBdv7W4pMZuDWRsRUfLMF5jwripChix8dXh9mig987yUmNe-C9VZmMWyLJs23AmhpA4JdPn8r5VaAUGtftlDjb0h2v9HcUI-8ErIMeIEnMSaC-aLkAPhmTEyE4414Or8FB3WBSPGnMjPK5WhZ_i3BxSdd2sWe9BSQnVF83kyA44LGRyAzZ_yxyjBIu4dET4zIpl5UixKxRZ9cnsXVeHwE2SU";

const donorOne =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBlcgtNrnm8hNFkLJ5-8khOnBcL-ST97NBmRq795CWhgtbSmHQr2JfT_e76trKolYdKfVBj0Z-g0JPg5dImhbvbOVv2796Dcyl83X-V6DblGMSo9wQ6U_VqUrPA94_jzgadjiDLxJkvw4vynwk1F5AxSlswdlRu68oHfYuXVphL4g4FPjrvRBEUOOiLgPmH3MG9P9rUAn3F71UUn-in9FfLf_cyvBrF__TyNdNAnoPjd2-IDkBTkc8";

const donorTwo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8I9u20BZPvyEEGcG7woBONZwMAq3KHghpHiELgNBTxAZGX8Csy2jqttESaM0xS0d1Y6cdfQsWEYRHGCNPniEZX-rHnECGBM4g8dueKNRtWUTZfaVORjziTjutQa3wkSrwdr34WYxhxKL8OSCqCDYUkqialS9VM2txsFposbUcBcFcLn4S1m_rMQtjTVqYTGgL0sNiBzXq9AelNCF9r7m7mca_IW8GoveMfMD441xUSipRmxqpvTE";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Temporary frontend interaction.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 md:p-8">
      <div className="flex min-h-[640px] w-full max-w-[1100px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
        {/* Left section */}
        <section className="relative flex min-h-[320px] w-full flex-col justify-end overflow-hidden bg-[#910102] p-8 md:min-h-full md:w-1/2">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${loginBackground}")`,
            }}
          />

          <div className="absolute inset-0 bg-[#910102]/65" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#700000] via-[#910102]/45 to-transparent" />

          <div className="relative z-10 text-white">
            <div className="mb-6">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <Heart size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Save Lives
                </span>
              </span>

              <h1 className="max-w-md text-4xl font-bold leading-tight md:text-5xl">
                Welcome back to LifeLink.
              </h1>
            </div>

            <p className="max-w-md text-lg leading-7 text-white/90">
              Your contribution helps save lives across Bangladesh. Log in to
              manage your requests and connect with donors.
            </p>

            <div className="mt-12 flex items-center gap-4 border-t border-white/20 pt-8">
              <div className="flex -space-x-3">
                <img
                  src={donorOne}
                  alt="LifeLink donor"
                  className="h-10 w-10 rounded-full border-2 border-[#910102] object-cover"
                />

                <img
                  src={donorTwo}
                  alt="LifeLink donor"
                  className="h-10 w-10 rounded-full border-2 border-[#910102] object-cover"
                />

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#910102] bg-white text-xs font-bold text-[#B42318]">
                  +1k
                </div>
              </div>

              <p className="text-sm font-semibold">
                Join 5,000+ active donors today.
              </p>
            </div>
          </div>
        </section>

        {/* Right section */}
        <section className="flex w-full items-center bg-white p-8 md:w-1/2 md:p-16">
          <div className="mx-auto w-full max-w-[400px]">
            <div className="mb-10">
              <Link
                href="/"
                className="mb-3 inline-flex items-center gap-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#910102] text-white">
                  <Droplet size={21} fill="currentColor" />
                </span>

                <span className="text-2xl font-bold text-[#910102]">
                  LifeLink
                </span>
              </Link>

              <h2 className="text-3xl font-bold text-[#191C1E]">
                Account Login
              </h2>

              <p className="mt-2 text-base text-[#49607C]">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#191C1E]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#49607C]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full rounded-[10px] border border-[#E3BEB8] bg-white py-3 pl-10 pr-4 text-base outline-none transition focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#191C1E]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-[#910102] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#49607C]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-[10px] border border-[#E3BEB8] bg-white py-3 pl-10 pr-12 text-base outline-none transition focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#49607C] transition hover:text-[#910102]"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#E3BEB8] text-[#910102] focus:ring-[#910102]"
                />

                <span className="text-base text-[#49607C]">
                  Remember me for 30 days
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#A90000] py-4 font-bold text-white transition hover:bg-[#910102] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={21} className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={21} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-10 text-center text-base text-[#49607C]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#910102] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}