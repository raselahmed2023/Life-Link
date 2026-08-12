"use client";

import type { FormEvent } from "react";
import { useState } from "react";
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

    const query = params.toString();

    router.push(
      query ? `/donors?${query}` : "/donors"
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setBloodGroup("");
    setDistrict("");

    router.push("/donors");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-[#E9D0CC] bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-[#910102]"
            />

            <h2 className="text-lg font-bold text-[#102A43]">
              Search Donors
            </h2>
          </div>

          <p className="mt-1 text-sm text-[#64748B]">
            Find donors by name, blood group, or location.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearFilters}
          className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-[#64748B] transition hover:bg-red-50 hover:text-[#910102] sm:self-auto"
        >
          <RotateCcw size={16} />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
        <div>
          <label
            htmlFor="donorSearch"
            className="mb-2 block text-sm font-semibold text-[#102A43]"
          >
            Search
          </label>

          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />

            <input
              id="donorSearch"
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Name, district or area"
              className="h-12 w-full rounded-xl border border-[#D7DEE7] bg-[#FBFCFD] pl-10 pr-4 text-sm text-[#102A43] outline-none transition placeholder:text-[#94A3B8] focus:border-[#B42318] focus:bg-white focus:ring-2 focus:ring-[#B42318]/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="bloodGroup"
            className="mb-2 block text-sm font-semibold text-[#102A43]"
          >
            Blood Group
          </label>

          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(event) =>
              setBloodGroup(event.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-xl border border-[#D7DEE7] bg-[#FBFCFD] px-4 text-sm text-[#102A43] outline-none transition focus:border-[#B42318] focus:bg-white focus:ring-2 focus:ring-[#B42318]/10"
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
            htmlFor="district"
            className="mb-2 block text-sm font-semibold text-[#102A43]"
          >
            District
          </label>

          <select
            id="district"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value)
            }
            className="h-12 w-full cursor-pointer rounded-xl border border-[#D7DEE7] bg-[#FBFCFD] px-4 text-sm text-[#102A43] outline-none transition focus:border-[#B42318] focus:bg-white focus:ring-2 focus:ring-[#B42318]/10"
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

        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#A90000] px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#910102] hover:shadow-md active:translate-y-0 lg:w-auto"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}