
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  HeartHandshake,
  ShieldCheck,
  Users,
  Clock3,
  RefreshCw,
} from "lucide-react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import { getAuthToken, getStoredUser } from "@/lib/auth";
import { bloodGroupToLabel } from "@/lib/bloodGroup";
import type { ApiBloodGroup, ApiDonor } from "@/types/donor";

type Tab =
  | "overview"
  | "blood"
  | "users"
  | "donors"
  | "contacts";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
};

type BloodStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

type BloodRequest = {
  id: string;
  patientName: string;
  bloodGroup: ApiBloodGroup;
  hospital: string;
  district: string;
  requiredDate: string;
  phone: string;
  message: string | null;
  status: BloodStatus;
  createdAt: string;
};

type ContactRequest = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string | null;
  createdAt: string;

  requester: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };

  donor: {
    id: string;
    bloodGroup: ApiBloodGroup;
    district: string;
    area: string | null;

    user: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
    };
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "blood", label: "Blood Requests" },
  { key: "users", label: "Users" },
  { key: "donors", label: "Donors" },
  { key: "contacts", label: "Contacts" },
];

export default function AdminPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [users, setUsers] = useState<User[]>([]);
  const [donors, setDonors] = useState<ApiDonor[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = useCallback(async (authToken: string) => {
    setError("");

    const [
      usersResponse,
      donorsResponse,
      bloodResponse,
      contactsResponse,
    ] = await Promise.all([
      apiRequest<ApiResponse<User[]>>(
        "/api/users",
        { token: authToken }
      ),

      apiRequest<ApiResponse<ApiDonor[]>>(
        "/api/donors/admin/all",
        { token: authToken }
      ),

      apiRequest<ApiResponse<BloodRequest[]>>(
        "/api/blood-requests/admin/all",
        { token: authToken }
      ),

      apiRequest<ApiResponse<ContactRequest[]>>(
        "/api/contact-requests",
        { token: authToken }
      ),
    ]);

    setUsers(usersResponse.data);
    setDonors(donorsResponse.data);
    setBloodRequests(bloodResponse.data);
    setContactRequests(contactsResponse.data);
  }, []);

  useEffect(() => {
    const initialise = async () => {
      const storedToken = getAuthToken();
      const storedUser = getStoredUser();

      if (!storedToken || !storedUser) {
        router.replace("/login");
        return;
      }

      if (storedUser.role !== "ADMIN") {
        router.replace("/dashboard");
        return;
      }

      setToken(storedToken);
      setAdmin({
        ...storedUser,
        phone: storedUser.phone ?? null,
        status: storedUser.status as User["status"],
        createdAt: "",
      });

      try {
        await loadData(storedToken);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load admin dashboard"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void initialise();
  }, [router, loadData]);

  const stats = useMemo(
    () => ({
      users: users.length,
      activeDonors: donors.filter((donor) => donor.isAvailable).length,
      pendingBlood: bloodRequests.filter(
        (request) => request.status === "PENDING"
      ).length,
      contacts: contactRequests.length,
      blockedUsers: users.filter(
        (user) => user.status === "BLOCKED"
      ).length,
    }),
    [users, donors, bloodRequests, contactRequests]
  );

  const updateBloodStatus = async (
    id: string,
    status: BloodStatus
  ) => {
    if (!token) return;

    setUpdatingId(id);
    setError("");
    setSuccess("");

    try {
      await apiRequest(
        `/api/blood-requests/${id}/status`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({ status }),
        }
      );

      setBloodRequests((current) =>
        current.map((request) =>
          request.id === id
            ? { ...request, status }
            : request
        )
      );

      setSuccess("Blood request status updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update blood request"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const updateUserStatus = async (
    id: string,
    status: User["status"]
  ) => {
    if (!token || id === admin?.id) return;

    setUpdatingId(id);
    setError("");
    setSuccess("");

    try {
      await apiRequest(
        `/api/users/${id}/status`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({ status }),
        }
      );

      setUsers((current) =>
        current.map((user) =>
          user.id === id
            ? { ...user, status }
            : user
        )
      );

      setSuccess("User status updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update user"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deactivateDonor = async (id: string) => {
    if (!token) return;

    const confirmed = window.confirm(
      "Deactivate this donor profile?"
    );

    if (!confirmed) return;

    setUpdatingId(id);
    setError("");
    setSuccess("");

    try {
      await apiRequest(
        `/api/donors/${id}`,
        {
          method: "DELETE",
          token,
        }
      );

      setDonors((current) =>
        current.filter((donor) => donor.id !== id)
      );

      setSuccess("Donor profile deactivated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to deactivate donor"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const refresh = async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await loadData(token);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Refresh failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] text-[#910102]">
        <HeartLoader
          text="Loading admin dashboard..."
          size={34}
        />
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl bg-gradient-to-r from-[#700000] to-[#A90000] p-7 text-white shadow-lg sm:p-9">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-white/75">
                <ShieldCheck size={19} />
                ADMIN CONTROL CENTER
              </div>

              <h1 className="mt-3 text-3xl font-black">
                LifeLink Administration
              </h1>

              <p className="mt-2 text-white/75">
                Manage users, donors, blood requests and contact requests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3">
                <p className="text-xs text-white/65">Administrator</p>
                <p className="mt-1 font-bold">{admin.name}</p>
              </div>

              <button
                type="button"
                onClick={() => void refresh()}
                title="Refresh data"
                className="rounded-xl border border-white/20 bg-white/10 p-3 hover:bg-white/20"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </header>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users size={22} />}
            title="Users"
            value={stats.users}
          />

          <StatCard
            icon={<HeartHandshake size={22} />}
            title="Available Donors"
            value={stats.activeDonors}
          />

          <StatCard
            icon={<Clock3 size={22} />}
            title="Pending Blood"
            value={stats.pendingBlood}
          />

          <StatCard
            icon={<Activity size={22} />}
            title="Contact Requests"
            value={stats.contacts}
          />
        </section>

        <nav className="mt-7 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                activeTab === tab.key
                  ? "bg-[#910102] text-white"
                  : "text-slate-600 hover:bg-red-50 hover:text-[#910102]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {success}
          </div>
        )}

        <div className="mt-7">
          {activeTab === "overview" && (
            <section className="grid gap-6 lg:grid-cols-2">
              <Panel title="Platform Overview">
                <div className="space-y-4 text-sm">
                  <InfoLine label="Total Users" value={stats.users} />
                  <InfoLine label="Available Donors" value={stats.activeDonors} />
                  <InfoLine label="Blocked Users" value={stats.blockedUsers} />
                  <InfoLine label="Contact Requests" value={stats.contacts} />
                </div>
              </Panel>

              <Panel title="Blood Request Overview">
                <div className="space-y-4 text-sm">
                  {(["PENDING", "APPROVED", "REJECTED", "COMPLETED"] as const)
                    .map((status) => (
                      <InfoLine
                        key={status}
                        label={status}
                        value={
                          bloodRequests.filter(
                            (request) => request.status === status
                          ).length
                        }
                      />
                    ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("blood")}
                  className="mt-6 text-sm font-bold text-[#910102] hover:underline"
                >
                  Manage Blood Requests
                </button>
              </Panel>
            </section>
          )}

          {activeTab === "blood" && (
            <Panel title={`Blood Requests (${bloodRequests.length})`}>
              {bloodRequests.length === 0 ? (
                <EmptyState text="No blood requests found." />
              ) : (
                <div className="space-y-4">
                  {bloodRequests.map((request) => (
                    <article
                      key={request.id}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
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

                          <div className="mt-4 space-y-1 text-sm text-slate-600">
                            <p>District: {request.district}</p>
                            <p>
                              Required:{" "}
                              {new Date(
                                request.requiredDate
                              ).toLocaleString()}
                            </p>
                            <p>Contact: {request.phone}</p>

                            {request.message && (
                              <p className="whitespace-pre-wrap break-words">
                                {request.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <StatusBadge status={request.status} />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {request.status === "PENDING" && (
                          <>
                            <ActionButton
                              label="Approve"
                              disabled={updatingId === request.id}
                              onClick={() =>
                                void updateBloodStatus(
                                  request.id,
                                  "APPROVED"
                                )
                              }
                            />

                            <ActionButton
                              label="Reject"
                              secondary
                              disabled={updatingId === request.id}
                              onClick={() =>
                                void updateBloodStatus(
                                  request.id,
                                  "REJECTED"
                                )
                              }
                            />
                          </>
                        )}

                        {request.status === "APPROVED" && (
                          <ActionButton
                            label="Mark Completed"
                            disabled={updatingId === request.id}
                            onClick={() =>
                              void updateBloodStatus(
                                request.id,
                                "COMPLETED"
                              )
                            }
                          />
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </Panel>
          )}

          {activeTab === "users" && (
            <Panel title={`Users (${users.length})`}>
              {users.length === 0 ? (
                <EmptyState text="No users found." />
              ) : (
                <div className="space-y-3">
                  {users.map((user) => (
                    <article
                      key={user.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#102A43]">
                          {user.name}
                        </h3>

                        <p className="break-all text-sm text-slate-600">
                          {user.email}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {user.role} • {user.phone || "No phone"}
                        </p>

                        <div className="mt-2">
                          <StatusBadge status={user.status} />
                        </div>
                      </div>

                      {user.id !== admin.id &&
                        user.role !== "ADMIN" && (
                          <ActionButton
                            label={
                              user.status === "ACTIVE"
                                ? "Block User"
                                : "Unblock User"
                            }
                            secondary={user.status === "ACTIVE"}
                            disabled={updatingId === user.id}
                            onClick={() =>
                              void updateUserStatus(
                                user.id,
                                user.status === "ACTIVE"
                                  ? "BLOCKED"
                                  : "ACTIVE"
                              )
                            }
                          />
                        )}
                    </article>
                  ))}
                </div>
              )}
            </Panel>
          )}

          {activeTab === "donors" && (
            <Panel title={`Donor Profiles (${donors.length})`}>
              {donors.length === 0 ? (
                <EmptyState text="No donor profiles found." />
              ) : (
                <div className="space-y-3">
                  {donors.map((donor) => (
                    <article
                      key={donor.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="rounded-xl bg-[#910102] px-3 py-2 font-black text-white">
                            {bloodGroupToLabel[donor.bloodGroup]}
                          </span>

                          <div>
                            <h3 className="font-bold text-[#102A43]">
                              {donor.user.name}
                            </h3>

                            <p className="text-sm text-slate-600">
                              {donor.area
                                ? `${donor.area}, `
                                : ""}
                              {donor.district}
                            </p>
                          </div>
                        </div>

                        <p className="mt-2 text-xs font-semibold text-slate-500">
                          {donor.isAvailable
                            ? "Available (self-reported)"
                            : "Unavailable"}
                        </p>
                      </div>

                      <ActionButton
                        label="Deactivate"
                        secondary
                        disabled={updatingId === donor.id}
                        onClick={() => void deactivateDonor(donor.id)}
                      />
                    </article>
                  ))}
                </div>
              )}
            </Panel>
          )}

          {activeTab === "contacts" && (
            <Panel title={`Contact Requests (${contactRequests.length})`}>
              {contactRequests.length === 0 ? (
                <EmptyState text="No contact requests found." />
              ) : (
                <div className="space-y-4">
                  {contactRequests.map((request) => (
                    <article
                      key={request.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-[#102A43]">
                            {request.requester.name}
                            {" → "}
                            {request.donor.user.name}
                          </h3>

                          <p className="mt-2 text-sm text-slate-600">
                            Blood Group:{" "}
                            {bloodGroupToLabel[request.donor.bloodGroup]}
                          </p>

                          <p className="text-sm text-slate-600">
                            District: {request.donor.district}
                          </p>

                          <p className="mt-2 text-sm text-slate-600">
                            Requester: {request.requester.email}
                          </p>

                          <p className="text-sm text-slate-600">
                            Donor: {request.donor.user.email}
                          </p>

                          {request.message && (
                            <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                              {request.message}
                            </p>
                          )}
                        </div>

                        <StatusBadge status={request.status} />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </Panel>
          )}
        </div>
      </div>
    </main>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-[#102A43]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <article className="rounded-2xl border border-[#E7E9EE] bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
        {icon}
      </div>

      <p className="mt-4 text-sm text-[#64748B]">{title}</p>
      <p className="mt-1 text-2xl font-black text-[#102A43]">
        {value}
      </p>
    </article>
  );
}

function InfoLine({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
      <span className="font-medium text-slate-600">{label}</span>
      <span className="font-bold text-[#102A43]">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "APPROVED" || status === "ACTIVE"
      ? "bg-green-50 text-green-700"
      : status === "PENDING"
        ? "bg-amber-50 text-amber-700"
        : status === "REJECTED" || status === "BLOCKED"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${color}`}
    >
      {status}
    </span>
  );
}

function ActionButton({
  label,
  onClick,
  disabled = false,
  secondary = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        secondary
          ? "border border-red-200 bg-white text-[#910102] hover:bg-red-50"
          : "bg-[#910102] text-white hover:bg-[#B42318]"
      }`}
    >
      {disabled ? "Updating..." : label}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
      {text}
    </div>
  );
}
