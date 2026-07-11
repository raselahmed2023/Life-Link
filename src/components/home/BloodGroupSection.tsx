import Link from "next/link";
import { Droplet } from "lucide-react";

type BloodGroup = {
  name: string;
  donors: string;
};

const bloodGroups: BloodGroup[] = [
  {
    name: "A+",
    donors: "1.2k Donors",
  },
  {
    name: "A-",
    donors: "450 Donors",
  },
  {
    name: "B+",
    donors: "980 Donors",
  },
  {
    name: "B-",
    donors: "210 Donors",
  },
  {
    name: "O+",
    donors: "2.5k Donors",
  },
  {
    name: "O-",
    donors: "180 Donors",
  },
  {
    name: "AB+",
    donors: "560 Donors",
  },
  {
    name: "AB-",
    donors: "95 Donors",
  },
];

export default function BloodGroupSection() {
  return (
    <section className="bg-[#F2F4F6] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#102A43]">
          Find donors by blood group
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {bloodGroups.map((group) => (
            <Link
              key={group.name}
              href={`/donors?bloodGroup=${encodeURIComponent(group.name)}`}
              className="group rounded-2xl border border-[#E3BEB8] bg-white p-6 text-center transition hover:-translate-y-1 hover:border-[#910102] hover:shadow-lg"
            >
              <Droplet
                size={32}
                fill="currentColor"
                className="mx-auto mb-3 text-[#910102] transition-transform group-hover:scale-110"
              />

              <p className="text-xl font-bold text-[#102A43]">
                {group.name}
              </p>

              <p className="mt-1 text-xs text-[#49607C]">
                {group.donors}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}