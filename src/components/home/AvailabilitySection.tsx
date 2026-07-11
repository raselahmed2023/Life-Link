import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Save critical time by contacting active donors first.",
  "Reduce donor fatigue from outdated request calls.",
  "Ensure your request reaches someone ready to act.",
];

export default function AvailabilitySection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Donor status comparison */}
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Recently confirmed donor */}
            <article className="relative overflow-hidden rounded-2xl border-2 border-[#15803D] bg-white p-6 shadow-lg">
              <span className="absolute right-0 top-0 rounded-bl-lg bg-[#15803D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Optimal
              </span>

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#910102]/10 text-sm font-bold text-[#910102]">
                  AB+
                </div>

                <span className="rounded-full bg-[#15803D]/10 px-3 py-1 text-xs font-bold text-[#15803D]">
                  Available
                </span>
              </div>

              <p className="mb-2 text-sm font-bold text-[#15803D]">
                Confirmed Today
              </p>

              <p className="text-xs leading-5 text-[#49607C]">
                Highest probability of immediate response and donation
                readiness.
              </p>
            </article>

            {/* Old confirmation donor */}
            <article className="rounded-2xl border border-[#E3BEB8] bg-white p-6 opacity-60 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#910102]/10 text-sm font-bold text-[#910102]">
                  B-
                </div>

                <span className="rounded-full bg-[#E6E8EA] px-3 py-1 text-xs font-bold text-[#49607C]">
                  Unconfirmed
                </span>
              </div>

              <p className="mb-2 text-sm font-bold text-[#49607C]">
                Last confirmed 45 days ago
              </p>

              <p className="text-xs leading-5 text-[#49607C]">
                Availability may have changed. Please verify before counting
                on this donor.
              </p>
            </article>
          </div>
        </div>

        {/* Text content */}
        <div className="order-1 lg:order-2">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
            Updated Availability
          </p>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#102A43] sm:text-4xl">
            Availability changes, so confirmation matters
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#49607C]">
            Most platforms show thousands of donors, but many have not updated
            their status in months. LifeLink prioritizes donors who actively
            confirm their availability every few weeks.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-[#191C1E]"
              >
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-[#15803D]"
                  fill="currentColor"
                />

                <span className="leading-7">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}