type PlatformStat = {
  value: string;
  label: string;
};

const platformStats: PlatformStat[] = [
  {
    value: "12.5k+",
    label: "Registered Donors",
  },
  {
    value: "3.2k",
    label: "Currently Available",
  },
  {
    value: "450",
    label: "Active Requests",
  },
  {
    value: "8.9k",
    label: "Fulfilled Requests",
  },
];

export default function PlatformStatsSection() {
  return (
    <section className="bg-[#102A43] px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 text-center lg:grid-cols-4">
        {platformStats.map((stat) => (
          <article key={stat.label}>
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">
              {stat.value}
            </p>

            <p className="mt-3 text-sm font-semibold text-[#B0C9E8] sm:text-base">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}