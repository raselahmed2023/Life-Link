
"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
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
  "AB+",
  "AB-",
  "O+",
  "O-",
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

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setBloodGroup(searchParams.get("bloodGroup") ?? "");
    setDistrict(searchParams.get("district") ?? "");
  }, [searchParams]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const params = new URLSearchParams();

    const cleanSearch = search.trim();
    const cleanDistrict = district.trim();

    if (cleanSearch) {
      params.set("search", cleanSearch);
    }

    if (bloodGroup) {
      params.set("bloodGroup", bloodGroup);
    }

    if (cleanDistrict) {
      params.set("district", cleanDistrict);
    }

    const query = params.toString();

    router.push(
      query ? `/donors?${query}` : "/donors",
      { scroll: false }
    );
  };

  const handleReset = () => {
    setSearch("");
    setBloodGroup("");
    setDistrict("");

    router.push("/donors", {
      scroll: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#E7E9EE] bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={20}
            className="text-[#910102]"
          />

          <h2 className="text-xl font-bold text-[#102A43]">
            Find Blood Donors
          </h2>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#910102]"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label
            htmlFor="donor-search"
            className="mb-2 block text-sm font-semibold text-[#102A43]"
          >
            Search
          </label>

          <input
            id="donor-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Name or location"
            maxLength={100}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-1 focus:ring-[#910102]"
          />
        </div>

        <div>
          <label
            htmlFor="donor-blood-group"
            className="mb-2 block text-sm font-semibold text-[#102A43]"
          >
            Blood Group
          </label>

          <select
            id="donor-blood-group"
            value={bloodGroup}
            onChange={(event) =>
              setBloodGroup(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-1 focus:ring-[#910102]"
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

        <div>
          <label
            htmlFor="donor-district"
            className="mb-2 block text-sm font-semibold text-[#102A43]"
          >
            District
          </label>

          <input
            id="donor-district"
            type="search"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value)
            }
            placeholder="Enter district"
            maxLength={100}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#910102] focus:ring-1 focus:ring-[#910102]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#910102] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#B42318]"
        >
          <Search size={17} />
          Search Donors
        </button>
      </div>
    </form>
  );
}
