import Link from "next/link";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAm2-RU-E-brs91xy39k91_yY1O354YtueQ9avGmDVB3YRaCtgwbscL7w1BhVD-tWqm5eaNR4EF43UQq84N7qwgdMsULB6uvClKsGdVEzj4s_bscv40K3zjCtvNfw-izV5S51HUNOLPc1R04H1ANsv8PiIkrXyi2DpDB3CxZAJpd9bD01EK3pzvc1wpCQ0Y8bVS0c6PdzJCqRTKODlX5Ok92kN0eZNCPcPiDdTD-7RMldcA4PkjYO4";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FB] pb-28 pt-12 md:pb-36 md:pt-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-red-100/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[520px] grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left content */}
          <div className="relative z-10 text-center md:text-left">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-700">
              Connecting lives across Bangladesh
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#102A43] sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
              The right donor can make every{" "}
              <span className="text-[#910102]">second count</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#49607C] sm:text-lg md:mx-0">
              Find recently available blood donors by blood group and location
              while keeping donor contact information private and secure.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/donors"
                className="inline-flex min-h-14 items-center justify-center rounded-[10px] bg-[#B42318] px-8 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#910102] hover:shadow-lg active:scale-[0.98]"
              >
                Find a Donor
              </Link>

              <Link
                href="/register"
                className="inline-flex min-h-14 items-center justify-center rounded-[10px] border-2 border-[#102A43] px-8 py-4 text-sm font-bold text-[#102A43] transition hover:bg-[#102A43] hover:text-white active:scale-[0.98]"
              >
                Become a Donor
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden md:block">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-red-700/5 blur-3xl" />

            <div className="relative z-10 rounded-[28px] border border-[#E3BEB8] bg-white p-5 shadow-xl">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={heroImage}
                  alt="LifeLink community volunteers supporting one another"
                  className="h-[400px] w-full object-cover transition duration-700 hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
            </div>

            {/* Small floating card */}
            <div className="absolute -bottom-6 -left-8 z-20 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
              <p className="text-sm font-bold text-[#102A43]">
                Privacy protected
              </p>

              <p className="mt-1 text-xs text-[#49607C]">
                Contact details remain secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}