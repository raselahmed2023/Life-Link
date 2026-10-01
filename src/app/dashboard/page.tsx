
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  CalendarDays,
  Droplets,
  HeartHandshake,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BloodRequestModal from "@/components/blood/BloodRequestModal";
import ContactRequestsSection from "@/components/dashboard/ContactRequestsSection";
import DonorAvailabilityToggle from "@/components/dashboard/DonorAvailabilityToggle";
import EditDonorProfileModal from "@/components/dashboard/EditDonorProfileModal";
import EditProfileModal from "@/components/dashboard/EditProfileModal";
import HeartLoader from "@/components/ui/HeartLoader";

import { apiRequest } from "@/lib/api";
import { getAuthToken, getStoredUser } from "@/lib/auth";
import { bloodGroupToLabel } from "@/lib/bloodGroup";
import type { ApiBloodGroup, ApiDonor } from "@/types/donor";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  createdAt: string;
  donorProfile?: ApiDonor | null;
};

type BloodRequest = {
  id: string;
  userId: string;
  patientName: string;
  bloodGroup: ApiBloodGroup;
  hospital: string;
  district: string;
  requiredDate: string;
  phone: string;
  message: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isBloodRequestModalOpen, setIsBloodRequestModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditDonorProfileOpen, setIsEditDonorProfileOpen] = useState(false);

  const loadDashboard = useCallback(async () => {
    const token = getAuthToken();
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    if (storedUser.role === "ADMIN") {
      router.replace("/admin");
      return;
    }

    setError("");

    try {
      const [profileResponse, bloodResponse] = await Promise.all([
        apiRequest<ApiResponse<UserProfile>>(
          `/api/users/${storedUser.id}`,
          { token }
        ),
        apiRequest<ApiResponse<BloodRequest[]>>(
          "/api/blood-requests/my",
          { token }
        ),
      ]);

      setProfile(profileResponse.data);
      setBloodRequests(bloodResponse.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load dashboard"
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleDonorUpdated = (updatedDonor: ApiDonor) => {
    setProfile((current) =>
      current
        ? { ...current, donorProfile: updatedDonor }
        : current
    );
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] text-[#910102]">
        <HeartLoader text="Loading dashboard..." size={34} />
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-red-700">
          {error || "Unable to load your profile."}
        </p>

        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            void loadDashboard();
          }}
          className="mt-4 rounded-xl bg-[#910102] px-5 py-3 font-bold text-white"
        >
          Retry
        </button>
      </main>
    );
  }

  const donorProfile =
    profile.donorProfile && !profile.donorProfile.isDeleted
      ? profile.donorProfile
      : null;

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-3xl bg-gradient-to-r from-[#910102] to-[#660000] p-7 text-white shadow-lg sm:p-9">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-extrabold">
                  {initials}
                </div>

                <div>
                  <p className="text-sm font-semibold text-white/70">
                    Welcome back
                  </p>

                  <h1 className="mt-1 text-3xl font-bold">
                    {profile.name}
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <ShieldCheck size={16} />
                    {profile.role} Account
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {!donorProfile && (
                  <Link
                    href="/become-donor"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#910102]"
                  >
                    Become a Donor
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => setIsBloodRequestModalOpen(true)}
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white"
                >
                  Request Blood
                </button>
              </div>
            </div>
          </header>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<UserRound size={22} />}
              label="Account Status"
              value={profile.status}
            />

            <StatCard
              icon={<HeartHandshake size={22} />}
              label="Donor Status"
              value={
                donorProfile
                  ? donorProfile.isAvailable
                    ? "Available"
                    : "Unavailable"
                  : "Not Registered"
              }
            />

            <StatCard
              icon={<Droplets size={22} />}
              label="Blood Requests"
              value={String(bloodRequests.length)}
            />

            <StatCard
              icon={<Activity size={22} />}
              label="Role"
              value={profile.role}
            />
          </section>

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-8">
              <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#102A43]">
                    My Profile
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-[#910102]"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                </div>

                <div className="space-y-5">
                  <ProfileRow
                    icon={<UserRound size={19} />}
                    label="Full Name"
                    value={profile.name}
                  />

                  <ProfileRow
                    icon={<Mail size={19} />}
                    label="Email"
                    value={profile.email}
                  />

                  <ProfileRow
                    icon={<Phone size={19} />}
                    label="Phone"
                    value={profile.phone || "Not provided"}
                  />

                  <ProfileRow
                    icon={<ShieldCheck size={19} />}
                    label="Account Status"
                    value={profile.status}
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#102A43]">
                    Donor Profile
                  </h2>

                  {donorProfile && (
                    <button
                      type="button"
                      onClick={() => setIsEditDonorProfileOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-[#910102]"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  )}
                </div>

                {!donorProfile ? (
                  <div>
                    <p className="text-sm text-slate-600">
                      You have not created a donor profile yet.
                    </p>

                    <Link
                      href="/become-donor"
                      className="mt-5 inline-block rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white"
                    >
                      Become a Donor
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <ProfileRow
                      icon={<Droplets size={19} />}
                      label="Blood Group"
                      value={bloodGroupToLabel[donorProfile.bloodGroup]}
                    />

                    <ProfileRow
                      icon={<MapPin size={19} />}
                      label="District"
                      value={donorProfile.district}
                    />

                    <ProfileRow
                      icon={<MapPin size={19} />}
                      label="Area"
                      value={donorProfile.area || "Not provided"}
                    />

                    <ProfileRow
                      icon={<CalendarDays size={19} />}
                      label="Last Donation"
                      value={
                        donorProfile.lastDonation
                          ? new Date(
                              donorProfile.lastDonation
                            ).toLocaleDateString()
                          : "Not provided"
                      }
                    />

                    <DonorAvailabilityToggle
                      donor={donorProfile}
                      onUpdated={handleDonorUpdated}
                    />
                  </div>
                )}
              </section>
            </div>

            <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-[#102A43]">
                  My Blood Requests
                </h2>

                <button
                  type="button"
                  onClick={() => setIsBloodRequestModalOpen(true)}
                  className="rounded-xl bg-[#910102] px-4 py-2.5 text-sm font-bold text-white"
                >
                  New Request
                </button>
              </div>

              {bloodRequests.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
                  You have not submitted any blood requests.
                </div>
              ) : (
                <div className="space-y-4">
                  {bloodRequests.map((request) => (
                    <BloodRequestCard
                      key={request.id}
                      request={request}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="mt-8">
            <ContactRequestsSection />
          </div>
        </div>
      </main>

      <BloodRequestModal
        isOpen={isBloodRequestModalOpen}
        onClose={() => setIsBloodRequestModalOpen(false)}
        onSuccess={loadDashboard}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        profile={profile}
        onClose={() => setIsEditProfileOpen(false)}
        onUpdated={(updatedProfile) => {
          setProfile((current) =>
            current
              ? { ...current, ...updatedProfile }
              : current
          );

          const stored = getStoredUser();

          if (stored) {
            localStorage.setItem(
              "lifelink_user",
              JSON.stringify({
                ...stored,
                name: updatedProfile.name,
                phone: updatedProfile.phone,
              })
            );
          }
        }}
      />

      {donorProfile && (
        <EditDonorProfileModal
          isOpen={isEditDonorProfileOpen}
          donor={donorProfile}
          onClose={() => setIsEditDonorProfileOpen(false)}
          onUpdated={handleDonorUpdated}
        />
      )}
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-[#E7E9EE] bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
        {icon}
      </div>

      <p className="mt-4 text-sm text-[#64748B]">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#102A43]">{value}</p>
    </article>
  );
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#64748B]">{label}</p>
        <p className="mt-1 break-words font-semibold text-[#102A43]">
          {value}
        </p>
      </div>
    </div>
  );
}

function BloodRequestCard({
  request,
}: {
  request: BloodRequest;
}) {
  const statusClass: Record<BloodRequest["status"], string> = {
    PENDING: "bg-amber-50 text-amber-700",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
    COMPLETED: "bg-slate-100 text-slate-700",
  };

  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-[#910102] px-3 py-2 font-black text-white">
            {bloodGroupToLabel[request.bloodGroup]}
          </span>

          <div>
            <h3 className="font-bold text-[#102A43]">
              {request.patientName}
            </h3>

            <p className="text-sm text-slate-500">
              {request.hospital}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            statusClass[request.status]
          }`}
        >
          {request.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <MapPin size={15} />
          {request.district}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays size={15} />
          {new Date(request.requiredDate).toLocaleDateString()}
        </p>

        {request.message && (
          <p className="whitespace-pre-wrap break-words">
            {request.message}
          </p>
        )}
      </div>
    </article>
  );
}
