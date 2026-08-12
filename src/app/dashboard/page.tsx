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
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import BloodRequestModal from "@/components/blood/BloodRequestModal";
import ContactRequestsSection from "@/components/dashboard/ContactRequestsSection";
import EditProfileModal from "@/components/dashboard/EditProfileModal";
import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";

import type {
  ApiBloodGroup,
  ApiDonor,
} from "@/types/donor";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
};

type UserResponse = {
  success: boolean;
  message: string;

  data: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    status: string;
    createdAt: string;

    donorProfile?: ApiDonor | null;
  };
};

type BloodRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

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
  status: BloodRequestStatus;
  createdAt: string;
};

type BloodRequestResponse = {
  success: boolean;
  message: string;
  data: BloodRequest[];
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<StoredUser | null>(null);

  const [profile, setProfile] =
    useState<UserResponse["data"] | null>(
      null
    );

  const [
    bloodRequests,
    setBloodRequests,
  ] = useState<BloodRequest[]>([]);

  const [
    isBloodRequestModalOpen,
    setIsBloodRequestModalOpen,
  ] = useState(false);

  const [
    isEditProfileOpen,
    setIsEditProfileOpen,
  ] = useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboardData =
    async (
      token: string,
      currentUser: StoredUser
    ) => {
      const profileResponse =
        await apiRequest<UserResponse>(
          `/api/users/${currentUser.id}`,
          {
            token,
          }
        );

      setProfile(
        profileResponse.data
      );

      const bloodResponse =
        await apiRequest<BloodRequestResponse>(
          "/api/blood-requests",
          {
            token,
          }
        );

      const myRequests =
        bloodResponse.data.filter(
          (request) =>
            request.userId ===
            currentUser.id
        );

      setBloodRequests(
        myRequests
      );
    };

  useEffect(() => {
    const loadDashboard =
      async () => {
        const token =
          localStorage.getItem(
            "lifelink_token"
          );

        const storedUser =
          localStorage.getItem(
            "lifelink_user"
          );

        if (
          !token ||
          !storedUser
        ) {
          router.replace(
            "/login"
          );

          return;
        }

        try {
          const parsedUser =
            JSON.parse(
              storedUser
            ) as StoredUser;

          if (
            parsedUser.role ===
            "ADMIN"
          ) {
            router.replace(
              "/admin"
            );

            return;
          }

          setUser(parsedUser);

          await loadDashboardData(
            token,
            parsedUser
          );
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load dashboard"
          );
        } finally {
          setIsLoading(
            false
          );
        }
      };

    loadDashboard();
  }, [router]);

  const donorProfile =
    useMemo(() => {
      return (
        profile?.donorProfile ??
        null
      );
    }, [profile]);

  const handleBloodRequestSuccess =
    async () => {
      const token =
        localStorage.getItem(
          "lifelink_token"
        );

      if (
        !token ||
        !user
      ) {
        return;
      }

      try {
        await loadDashboardData(
          token,
          user
        );
      } catch {
        // Request is already submitted.
      }
    };

  if (isLoading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] text-[#910102]">
        <HeartLoader
          text="Loading your dashboard..."
          size={34}
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-xl font-bold text-red-700">
            Could not load dashboard
          </h1>

          <p className="mt-2 text-red-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (
    !user ||
    !profile
  ) {
    return null;
  }

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="mb-8 rounded-3xl bg-gradient-to-r from-[#910102] to-[#660000] p-7 text-white shadow-lg sm:p-9">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-extrabold backdrop-blur">
                  {getInitials(
                    profile.name
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-white/70">
                    Welcome back
                  </p>

                  <h1 className="mt-1 text-3xl font-bold">
                    {profile.name}
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <ShieldCheck
                      size={16}
                    />

                    {profile.role}{" "}
                    Account
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {!donorProfile && (
                  <Link
                    href="/become-donor"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#910102] transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Become a Donor
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setIsBloodRequestModalOpen(
                      true
                    )
                  }
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Request Blood
                </button>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={
                <UserRound size={23} />
              }
              label="Account Status"
              value={profile.status}
            />

            <StatCard
              icon={
                <HeartHandshake
                  size={23}
                />
              }
              label="Donor Status"
              value={
                donorProfile
                  ? "Registered"
                  : "Not Registered"
              }
            />

            <StatCard
              icon={
                <Droplets size={23} />
              }
              label="Blood Requests"
              value={String(
                bloodRequests.length
              )}
            />

            <StatCard
              icon={
                <Activity size={23} />
              }
              label="Role"
              value={profile.role}
            />
          </section>

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left Side */}
            <div className="space-y-8">
              {/* My Profile */}
              <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#910102]">
                      Account
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
                      My Profile
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setIsEditProfileOpen(
                        true
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2 text-sm font-bold text-[#910102] transition hover:bg-red-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                </div>

                <div className="space-y-5">
                  <ProfileRow
                    icon={
                      <UserRound
                        size={19}
                      />
                    }
                    label="Full Name"
                    value={profile.name}
                  />

                  <ProfileRow
                    icon={
                      <Mail size={19} />
                    }
                    label="Email"
                    value={profile.email}
                  />

                  <ProfileRow
                    icon={
                      <Phone size={19} />
                    }
                    label="Phone"
                    value={
                      profile.phone ||
                      "Not provided"
                    }
                  />

                  <ProfileRow
                    icon={
                      <ShieldCheck
                        size={19}
                      />
                    }
                    label="Account Status"
                    value={profile.status}
                  />
                </div>
              </section>

              {/* Donor Profile */}
              <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#910102]">
                  Donation
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
                  My Donor Profile
                </h2>

                {!donorProfile ? (
                  <div className="mt-6 rounded-2xl bg-red-50 p-6">
                    <HeartHandshake
                      size={32}
                      className="text-[#910102]"
                    />

                    <h3 className="mt-4 font-bold text-[#102A43]">
                      You are not
                      registered as a
                      donor yet
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                      Create a donor
                      profile to become
                      searchable by
                      people who need
                      blood.
                    </p>

                    <Link
                      href="/become-donor"
                      className="mt-5 inline-flex rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B42318]"
                    >
                      Become a Donor
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between rounded-2xl bg-[#FFF4F3] p-5">
                      <div>
                        <p className="text-sm text-[#64748B]">
                          Blood Group
                        </p>

                        <p className="mt-1 text-3xl font-black text-[#910102]">
                          {
                            bloodGroupToLabel[
                              donorProfile.bloodGroup
                            ]
                          }
                        </p>
                      </div>

                      <Droplets
                        size={38}
                        className="text-[#910102]"
                      />
                    </div>

                    <ProfileRow
                      icon={
                        <MapPin
                          size={19}
                        />
                      }
                      label="Location"
                      value={`${
                        donorProfile.area
                          ? `${donorProfile.area}, `
                          : ""
                      }${donorProfile.district}`}
                    />

                    <ProfileRow
                      icon={
                        <CalendarDays
                          size={19}
                        />
                      }
                      label="Last Donation"
                      value={
                        donorProfile.lastDonation
                          ? new Date(
                              donorProfile.lastDonation
                            ).toLocaleDateString()
                          : "Not provided"
                      }
                    />

                    <div className="flex items-center justify-between rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                      <span className="text-sm font-semibold text-green-800">
                        Availability
                      </span>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        {donorProfile.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* My Blood Requests */}
            <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#910102]">
                    Activity
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
                    My Blood Requests
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIsBloodRequestModalOpen(
                      true
                    )
                  }
                  className="rounded-xl bg-[#910102] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#B42318]"
                >
                  New Request
                </button>
              </div>

              {bloodRequests.length ===
              0 ? (
                <div className="rounded-2xl border border-dashed border-[#D7DEE7] py-14 text-center">
                  <Droplets
                    size={40}
                    className="mx-auto text-[#910102]"
                  />

                  <h3 className="mt-4 font-bold text-[#102A43]">
                    No blood requests yet
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    Your submitted
                    blood requests will
                    appear here.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setIsBloodRequestModalOpen(
                        true
                      )
                    }
                    className="mt-5 rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B42318]"
                  >
                    Create Request
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bloodRequests.map(
                    (request) => (
                      <BloodRequestCard
                        key={request.id}
                        request={request}
                      />
                    )
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Contact Requests */}
          <div className="mt-8">
            <ContactRequestsSection />
          </div>
        </div>
      </main>

      {/* Blood Request Modal */}
      <BloodRequestModal
        isOpen={
          isBloodRequestModalOpen
        }
        onClose={() =>
          setIsBloodRequestModalOpen(
            false
          )
        }
        onSuccess={
          handleBloodRequestSuccess
        }
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={
          isEditProfileOpen
        }
        profile={profile}
        onClose={() =>
          setIsEditProfileOpen(
            false
          )
        }
        onUpdated={(
          updatedProfile
        ) => {
          setProfile(
            (current) =>
              current
                ? {
                    ...current,
                    ...updatedProfile,
                  }
                : current
          );

          setUser(
            (current) =>
              current
                ? {
                    ...current,
                    name:
                      updatedProfile.name,
                    phone:
                      updatedProfile.phone,
                  }
                : current
          );
        }}
      />
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
    <article className="rounded-2xl border border-[#E7E9EE] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
        {icon}
      </div>

      <p className="mt-4 text-sm text-[#64748B]">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-[#102A43]">
        {value}
      </p>
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
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F7] text-[#910102]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-[#64748B]">
          {label}
        </p>

        <p className="mt-1 break-all font-semibold text-[#102A43]">
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
  return (
    <article className="rounded-2xl border border-[#E7E9EE] p-5 transition hover:border-red-200 hover:shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-[#102A43]">
              {request.patientName}
            </h3>

            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#910102]">
              {
                bloodGroupToLabel[
                  request.bloodGroup
                ]
              }
            </span>
          </div>

          <p className="mt-3 text-sm font-semibold text-[#49607C]">
            {request.hospital}
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748B]">
            <MapPin size={15} />
            {request.district}
          </p>
        </div>

        <RequestStatus
          status={request.status}
        />
      </div>

      {request.message && (
        <p className="mt-4 rounded-xl bg-[#F8FAFC] p-3 text-sm leading-6 text-[#64748B]">
          {request.message}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-xs text-[#64748B]">
        <span>
          Required:{" "}
          {new Date(
            request.requiredDate
          ).toLocaleDateString()}
        </span>

        <span>
          Created:{" "}
          {new Date(
            request.createdAt
          ).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
}

function RequestStatus({
  status,
}: {
  status: BloodRequestStatus;
}) {
  const classes =
    status === "APPROVED"
      ? "bg-green-50 text-green-700"
      : status === "REJECTED"
        ? "bg-red-50 text-red-700"
        : status === "COMPLETED"
          ? "bg-blue-50 text-blue-700"
          : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`self-start rounded-full px-3 py-1.5 text-xs font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

function getInitials(
  name: string
) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}