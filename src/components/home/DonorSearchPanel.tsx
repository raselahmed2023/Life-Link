// "use client";

// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";

// const bloodGroups = [
//   "A+",
//   "A-",
//   "B+",
//   "B-",
//   "O+",
//   "O-",
//   "AB+",
//   "AB-",
// ];

// const districts = [
//   "Dhaka",
//   "Chattogram",
//   "Sylhet",
//   "Rajshahi",
//   "Khulna",
//   "Barishal",
//   "Rangpur",
//   "Mymensingh",
// ];

// export default function DonorSearchPanel() {
//   const router = useRouter();

//   const [bloodGroup, setBloodGroup] = useState("");
//   const [district, setDistrict] = useState("");
//   const [availableOnly, setAvailableOnly] = useState(true);

//   const handleSearch = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const searchParams = new URLSearchParams();

//     if (bloodGroup) {
//       searchParams.set("bloodGroup", bloodGroup);
//     }

//     if (district) {
//       searchParams.set("district", district);
//     }

//     if (availableOnly) {
//       searchParams.set("available", "true");
//     }

//     const queryString = searchParams.toString();

//     router.push(
//       queryString
//         ? `/donors?${queryString}`
//         : "/donors"
//     );
//   };

//   return (
//     <section className="relative z-20 -mt-16 px-4 sm:px-6 md:-mt-20 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <form
//           onSubmit={handleSearch}
//           className="rounded-2xl border border-[#E3BEB8] bg-white p-6 shadow-xl md:p-8"
//         >
//           <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2 lg:grid-cols-4">
//             {/* Blood group */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="bloodGroup"
//                 className="block text-sm font-semibold text-[#49607C]"
//               >
//                 Blood Group
//               </label>

//               <select
//                 id="bloodGroup"
//                 value={bloodGroup}
//                 onChange={(event) =>
//                   setBloodGroup(event.target.value)
//                 }
//                 className="h-12 w-full cursor-pointer rounded-[10px] border border-[#E3BEB8] bg-white px-4 text-[#191C1E] outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
//               >
//                 <option value="">Select Group</option>

//                 {bloodGroups.map((group) => (
//                   <option key={group} value={group}>
//                     {group}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* District */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="district"
//                 className="block text-sm font-semibold text-[#49607C]"
//               >
//                 District / Location
//               </label>

//               <select
//                 id="district"
//                 value={district}
//                 onChange={(event) =>
//                   setDistrict(event.target.value)
//                 }
//                 className="h-12 w-full cursor-pointer rounded-[10px] border border-[#E3BEB8] bg-white px-4 text-[#191C1E] outline-none transition focus:border-[#910102] focus:ring-2 focus:ring-[#910102]/20"
//               >
//                 <option value="">Select District</option>

//                 {districts.map((districtName) => (
//                   <option
//                     key={districtName}
//                     value={districtName}
//                   >
//                     {districtName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Available checkbox */}
//             <label className="flex h-12 cursor-pointer items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={availableOnly}
//                 onChange={(event) =>
//                   setAvailableOnly(event.target.checked)
//                 }
//                 className="h-5 w-5 cursor-pointer rounded border-[#E3BEB8] accent-[#910102]"
//               />

//               <span className="text-sm font-semibold text-[#49607C]">
//                 Available donors only
//               </span>
//             </label>

//             {/* Search button */}
//             <button
//               type="submit"
//               className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#910102] px-6 font-bold text-white transition hover:bg-[#B42318] hover:shadow-md active:scale-[0.98]"
//             >
//               <Search size={20} />
//               Search Donors
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }