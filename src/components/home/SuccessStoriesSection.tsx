import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  initials: string;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anisur Rahman",
    role: "Family Member, Dhaka",
    initials: "AR",
    message:
      "I was in desperate need of AB- blood for my mother's surgery. Within 15 minutes of posting a request on LifeLink, three confirmed donors responded. The process was seamless and literally life-saving.",
  },
  {
    id: 2,
    name: "Laila Ahmed",
    role: "Registered Donor, Sylhet",
    initials: "LA",
    message:
      "As a regular donor, I love that LifeLink respects my privacy. I only get contact requests when I have confirmed that I am available.",
  },
  {
    id: 3,
    name: "Dr. K. Mahbub",
    role: "Medical Professional, Chattogram",
    initials: "KM",
    message:
      "The availability confirmation feature is a game changer. Instead of calling outdated numbers, people can focus on recently confirmed donors.",
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="bg-[#F7F9FB] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#910102]">
            Community Impact
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#102A43] sm:text-4xl">
            Success Stories
          </h2>

          <p className="mt-4 leading-7 text-[#49607C]">
            Real experiences from donors, families and healthcare
            professionals.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex h-full flex-col rounded-2xl border border-[#E3BEB8] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Rating */}
              <div
                className="mb-6 flex items-center gap-1 text-[#910102]"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Testimonial */}
              <blockquote className="flex-1 italic leading-7 text-[#49607C]">
                &ldquo;{testimonial.message}&rdquo;
              </blockquote>

              {/* User information */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#910102]/10 font-bold text-[#910102]">
                  {testimonial.initials}
                </div>

                <div>
                  <p className="font-bold text-[#191C1E]">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs text-[#49607C]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}