import {
  BedDouble,
  Droplets,
  Utensils,
} from "lucide-react";

const donationTips = [
  {
    title: "Eat a healthy meal before donating",
    icon: Utensils,
  },
  {
    title: "Drink plenty of water and fluids",
    icon: Droplets,
  },
  {
    title: "Ensure at least 8 hours of sleep",
    icon: BedDouble,
  },
];

const donationImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBUuDuCm6o-cZVU2ysw6ACuRhKZY3XlkposQf0_AeN84yH21XMIw3caceL84KyUpmcU2n1y4L3pHHMQdKmv-1O69fY0MOlIJu-2K3mcZkctNRjKynYqfKuRU9swQ5G5tLW0Udq6KnapoRWgFYQf28B_R-5ojgvcE--7vIMzEa0IR5ENqmGgSWfkkTDziNWppCokEv9KN1KN_xRe-kEN6TPT0MB3tJif8DixwMOHHBlVDPrN96B_Ig0";

export default function DonateResponsiblySection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-stretch overflow-hidden rounded-3xl bg-[#ECEEF0] md:flex-row">
          {/* Left content */}
          <div className="flex w-full flex-col justify-center p-8 sm:p-10 md:w-1/2 md:p-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
              Donor Safety
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl">
              Donate responsibly
            </h2>

            <p className="mt-6 leading-7 text-[#49607C]">
              Your health is as important as the life you are saving. Follow
              these simple guidelines to ensure a safe donation experience
              for everyone.
            </p>

            <div className="mt-8 space-y-4">
              {donationTips.map((tip) => {
                const Icon = tip.icon;

                return (
                  <div
                    key={tip.title}
                    className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#910102]/10 text-[#910102]">
                      <Icon size={22} />
                    </span>

                    <span className="font-semibold text-[#191C1E]">
                      {tip.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right image */}
          <div className="min-h-[360px] w-full md:min-h-[480px] md:w-1/2">
            <img
              src={donationImage}
              alt="Safe and responsible blood donation environment"
              className="h-full min-h-[360px] w-full object-cover md:min-h-[480px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}