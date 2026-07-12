"use client";

import {
  FormEvent,
  useState,
} from "react";
import {
  Search,
} from "lucide-react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

const districts = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

type SortOption =
  | "recent"
  | "newest"
  | "donations";

const sortOptions: {
  label: string;
  value: SortOption;
}[] = [
  {
    label: "Recently Confirmed",
    value: "recent",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Most Donations",
    value: "donations",
  },
];

export default function DonorFilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") ?? ""
  );

  const [district, setDistrict] = useState(
    searchParams.get("district") ?? ""
  );

  const [availability, setAvailability] = useState(
    searchParams.get("available") === "true"
      ? "available"
      : searchParams.get("availability") ?? ""
  );

  const [sortBy, setSortBy] =
    useState<SortOption>(
      (searchParams.get("sort") as SortOption) ??
        "recent"
    );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (bloodGroup) {
      params.set("bloodGroup", bloodGroup);
    }

    if (district) {
      params.set("district", district);
    }

    if (availability === "available") {
      params.set("available", "true");
    }

    if (availability === "recent") {
      params.set("availability", "recent");
    }

    params.set("sort", sortBy);

    router.push(`/donors?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearch("");
    setBloodGroup("");
    setDistrict("");
    setAvailability("");
    setSortBy("recent");

    router.push("/donors");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-[#E3BEB8] bg-white p-6 shadow-sm"
    >
      {/* Main filters */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="space-y-2">
          <label
            htmlFor="donorSearch"
            className="block text-sm font-semibold text-[#102A43]"
          >
            Search
          </label>

          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A403C]"
            />

            <input
              id="donorSearch"
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Name, District, or Area"
              className="h-12 w-full rounded-[10px] border border-[#8F706B] bg-white pl-10 pr-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
            />
          </div>
        </div>

        {/* Blood group */}
        <div className="space-y-2">
          <label
            htmlFor="bloodGroup"
            className="block text-sm font-semibold text-[#102A43]"
          >
            Blood Group
          </label>

          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(event) =>
              setBloodGroup(event.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-[10px] border border-[#8F706B] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          >
            <option value="">
              All Blood Groups
            </option>

            {bloodGroups.map((group) => (
              <option
                key={group}
                value={group}
              >
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="space-y-2">
          <label
            htmlFor="district"
            className="block text-sm font-semibold text-[#102A43]"
          >
            District
          </label>

          <select
            id="district"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-[10px] border border-[#8F706B] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          >
            <option value="">
              All Districts
            </option>

            {districts.map((districtName) => (
              <option
                key={districtName}
                value={districtName}
              >
                {districtName}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <label
            htmlFor="availability"
            className="block text-sm font-semibold text-[#102A43]"
          >
            Availability
          </label>

          <select
            id="availability"
            value={availability}
            onChange={(event) =>
              setAvailability(event.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-[10px] border border-[#8F706B] bg-white px-4 outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
          >
            <option value="">
              All Availability
            </option>

            <option value="available">
              Available Now
            </option>

            <option value="recent">
              Recently Confirmed
            </option>
          </select>
        </div>
      </div>

      {/* Sorting and actions */}
      <div className="mt-6 flex flex-col gap-6 border-t border-[#E3BEB8] pt-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="text-sm font-semibold text-[#102A43]">
            Sort by:
          </span>

          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => {
              const isActive =
                sortBy === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setSortBy(option.value)
                  }
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "border-[#910102] bg-[#910102]/5 text-[#910102]"
                      : "border-[#8F706B] text-[#5A403C] hover:bg-[#F2F4F6]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleClearFilters}
            className="rounded-[10px] px-6 py-3 text-sm font-semibold text-[#5A403C] transition hover:bg-[#F2F4F6]"
          >
            Clear Filters
          </button>

          <button
            type="submit"
            className="rounded-[10px] bg-[#910102] px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#B42318] active:scale-[0.98]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
}
