import {
  CheckCircle2,
  HeartHandshake,
  Search,
  Send,
} from "lucide-react";

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
      "Send a contact request without exposing private donor information publicly.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Donor Approves",
    description:
      "The donor reviews and accepts or rejects the request from their dashboard.",
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
      className="bg-[#F8FAFC] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#910102]">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl">
            A simple path from search to connection
          </h2>

          <p className="mt-4 text-slate-600">
            LifeLink keeps the process simple while protecting donor contact
            information until approval.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
              >
                <span className="absolute right-5 top-5 text-4xl font-black text-red-50">
                  {step.number}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#910102] transition group-hover:bg-[#910102] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#102A43]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}