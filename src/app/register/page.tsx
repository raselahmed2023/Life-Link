"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  useMemo,
  useState,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Quote,
  ShieldCheck,
  Users,
} from "lucide-react";

import Logo from "@/components/Logo";
import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";

const registerImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMIx85LshmJpdQYv7O9k4Dcm82JjcOrVe4PGCcpPeMNbzMMGOJgdD6PYWuzcheymhmQY_5gpH-75jKc5lPtqN6Y_6yd2TOocgSiQB_wbeYuNjSGORtRdCR3EbbPjXU26jYkZYM-zmXyCDsuUQLvpJpkZyHFMzvt3P-6IhgoPffYwAe7OqwGUXcs8rtAhivgYn217ZgSeTxjRuY5hKrgEIIb3HJfbIuQkkpBnIALXphCPUvdg8BGpo";

type RegisterResponse = {
  success: boolean;
  message: string;

  data: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    status: string;
    createdAt: string;
  };
};

export default function RegisterPage() {
  const router = useRouter();

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const requirements = useMemo(
    () => ({
      minimumLength:
        password.length >= 8,

      number: /\d/.test(
        password
      ),

      specialCharacter:
        /[^A-Za-z0-9]/.test(
          password
        ),

      uppercase:
        /[A-Z]/.test(password),
    }),
    [password]
  );

  const passwordValid =
    Object.values(
      requirements
    ).every(Boolean);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const formData =
      new FormData(
        event.currentTarget
      );

    const name = String(
      formData.get("fullName") ||
        ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const password = String(
      formData.get("password") ||
        ""
    );

    const confirmPassword =
      String(
        formData.get(
          "confirmPassword"
        ) || ""
      );

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );

      return;
    }

    if (!passwordValid) {
      setError(
        "Please meet all password requirements"
      );

      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest<RegisterResponse>(
        "/api/auth/register",
        {
          method: "POST",

          body: JSON.stringify({
            name,
            email,
            phone:
              phone || undefined,
            password,
          }),
        }
      );

      router.push("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E]">
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left */}
          <section className="space-y-6 lg:col-span-5">
            <div className="group relative mb-6 h-64 overflow-hidden rounded-2xl lg:h-80">
              <img
                src={registerImage}
                alt="LifeLink community members supporting each other"
                className="h-full w-full object-cover grayscale-[20%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-[#910102]/10" />

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/40 bg-white/90 p-4 shadow-sm backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <Quote
                    size={25}
                    className="shrink-0 text-[#910102]"
                  />

                  <p className="italic leading-6 text-[#191C1E]">
                    “Connecting with a
                    donor through LifeLink
                    was a blessing during
                    our emergency.”
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl">
                Join the LifeLink
                Community.
              </h1>

              <p className="max-w-md text-lg leading-7 text-[#49607C]">
                Every donor brings hope
                to families in need. Your
                registration is the first
                step toward saving a
                life.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 rounded-full bg-[#C7DFFF] px-4 py-2 text-[#314863]">
                <ShieldCheck
                  size={17}
                />

                <span className="text-xs font-semibold uppercase tracking-wider">
                  Trusted
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#95F8A7] px-4 py-2 text-[#005323]">
                <Users size={17} />

                <span className="text-xs font-semibold uppercase tracking-wider">
                  Community Driven
                </span>
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="lg:col-start-7 lg:col-span-6">
            <div className="rounded-2xl border border-[#E3BEB8]/40 bg-white p-6 shadow-md sm:p-8 md:p-12">
              {/* Logo */}
              <div className="mb-7">
                <Logo />
              </div>

              <div className="mb-6">
                <h2 className="mb-2 text-3xl font-bold">
                  Create Account
                </h2>

                <p className="text-base text-[#49607C]">
                  Please fill in your
                  details to get started.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-[#5A403C]"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-[10px] border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#5A403C]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full rounded-[10px] border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-[#5A403C]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-[10px] border border-[#E3BEB8] bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#5A403C]"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        required
                        value={password}
                        onChange={(
                          event
                        ) =>
                          setPassword(
                            event.target
                              .value
                          )
                        }
                        placeholder="••••••••"
                        className="w-full rounded-[10px] border border-[#E3BEB8] bg-white px-4 py-3 pr-12 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (previous) =>
                              !previous
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#49607C] hover:text-[#910102]"
                      >
                        {showPassword ? (
                          <EyeOff
                            size={20}
                          />
                        ) : (
                          <Eye
                            size={20}
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-[#5A403C]"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        required
                        placeholder="••••••••"
                        className="w-full rounded-[10px] border border-[#E3BEB8] bg-white px-4 py-3 pr-12 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) =>
                              !previous
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#49607C] hover:text-[#910102]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff
                            size={20}
                          />
                        ) : (
                          <Eye
                            size={20}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="rounded-xl bg-[#F2F4F6] p-4">
                  <p className="mb-3 text-xs font-semibold text-[#5A403C]">
                    Password
                    Requirements:
                  </p>

                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <Requirement
                      completed={
                        requirements.minimumLength
                      }
                      label="Minimum 8 characters"
                    />

                    <Requirement
                      completed={
                        requirements.number
                      }
                      label="At least one number"
                    />

                    <Requirement
                      completed={
                        requirements.specialCharacter
                      }
                      label="One special character"
                    />

                    <Requirement
                      completed={
                        requirements.uppercase
                      }
                      label="Uppercase letter"
                    />
                  </ul>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-5 w-5 rounded border-[#E3BEB8] text-[#910102] focus:ring-[#910102]"
                  />

                  <span className="leading-6 text-[#49607C]">
                    I agree to
                    LifeLink&apos;s terms
                    and privacy policy.
                  </span>
                </label>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#A90000] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#910102] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <HeartLoader text="Creating Account..." />
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={21}
                      />
                    </>
                  )}
                </button>

                <p className="pt-2 text-center text-[#49607C]">
                  Already have an
                  account?{" "}

                  <Link
                    href="/login"
                    className="font-bold text-[#910102] hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

type RequirementProps = {
  completed: boolean;
  label: string;
};

function Requirement({
  completed,
  label,
}: RequirementProps) {
  return (
    <li className="flex items-center gap-2 text-xs font-medium text-[#49607C]">
      {completed ? (
        <CheckCircle2
          size={15}
          fill="currentColor"
          className="text-[#15803D]"
        />
      ) : (
        <Circle
          size={15}
          className="text-[#8F706B]"
        />
      )}

      {label}
    </li>
  );
}