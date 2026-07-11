import {
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Search Donors",
    description:
      "Enter the required blood group and location to see registered donors in that area.",
    icon: Search,
  },
  {
    id: 2,
    title: "Review Availability",
    description:
      "Check the last confirmed status to find donors who are most likely ready to help.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Request Contact",
    description:
      "Send a contact request. Once approved by the donor, you can receive their contact details.",
    icon: MessageCircle,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F7F9FB] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
            Simple Process
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl">
            How LifeLink works
          </h2>

          <p className="mt-4 leading-7 text-[#49607C]">
            Find an available blood donor safely through three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Desktop connecting line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden border-t-2 border-dashed border-[#E3BEB8] md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.id}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#E3BEB8] bg-white text-[#910102] shadow-lg">
                  <Icon size={34} />

                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#910102] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#102A43]">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-sm leading-7 text-[#49607C]">
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