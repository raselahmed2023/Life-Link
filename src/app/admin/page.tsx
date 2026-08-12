"use client";

import {
  Activity,
  Check,
  CheckCircle2,
  Clock3,
  Droplets,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";
import type {
  ApiBloodGroup,
  ApiDonor,
} from "@/types/donor";

type Tab =
  | "overview"
  | "blood"
  | "users"
  | "donors"
  | "contacts";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status:
    | "ACTIVE"
    | "BLOCKED";
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
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED";
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

export default function AdminPage() {
  const router = useRouter();

  const [admin, setAdmin] =
    useState<StoredUser | null>(
      null
    );

  const [token, setToken] =
    useState<string | null>(
      null
    );

  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

  const [users, setUsers] =
    useState<User[]>([]);

  const [donors, setDonors] =
    useState<ApiDonor[]>([]);

  const [
    bloodRequests,
    setBloodRequests,
  ] = useState<
    BloodRequest[]
  >([]);

  const [
    contactRequests,
    setContactRequests,
  ] = useState<
    ContactRequest[]
  >([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const loadData = useCallback(
    async (authToken: string) => {
      setError("");

      const [
        usersResponse,
        donorsResponse,
        bloodResponse,
        contactsResponse,
      ] = await Promise.all([
        apiRequest<
          ApiResponse<User[]>
        >("/api/users", {
          token: authToken,
        }),

        apiRequest<
          ApiResponse<ApiDonor[]>
        >("/api/donors"),

        apiRequest<
          ApiResponse<
            BloodRequest[]
          >
        >("/api/blood-requests"),

        apiRequest<
          ApiResponse<
            ContactRequest[]
          >
        >(
          "/api/contact-requests",
          {
            token: authToken,
          }
        ),
      ]);

      setUsers(
        usersResponse.data
      );

      setDonors(
        donorsResponse.data
      );

      setBloodRequests(
        bloodResponse.data
      );

      setContactRequests(
        contactsResponse.data
      );
    },
    []
  );

  useEffect(() => {
    const initialise =
      async () => {
        const storedToken =
          localStorage.getItem(
            "lifelink_token"
          );

        const storedUser =
          localStorage.getItem(
            "lifelink_user"
          );

        if (
          !storedToken ||
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
            parsedUser.role !==
            "ADMIN"
          ) {
            router.replace(
              "/dashboard"
            );
            return;
          }

          setToken(
            storedToken
          );

          setAdmin(
            parsedUser
          );

          await loadData(
            storedToken
          );
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load admin dashboard"
          );
        } finally {
          setIsLoading(
            false
          );
        }
      };

    initialise();
  }, [
    router,
    loadData,
  ]);

  const stats = useMemo(
    () => ({
      users: users.length,

      activeDonors:
        donors.filter(
          (donor) =>
            donor.isAvailable
        ).length,

      pendingBlood:
        bloodRequests.filter(
          (request) =>
            request.status ===
            "PENDING"
        ).length,

      contacts:
        contactRequests.length,

      blockedUsers:
        users.filter(
          (user) =>
            user.status ===
            "BLOCKED"
        ).length,
    }),
    [
      users,
      donors,
      bloodRequests,
      contactRequests,
    ]
  );

  const updateBloodStatus =
    async (
      id: string,
      status: BloodStatus
    ) => {
      if (!token) return;

      setUpdatingId(id);

      try {
        await apiRequest(
          `/api/blood-requests/${id}`,
          {
            method: "PATCH",
            token,

            body: JSON.stringify({
              status,
            }),
          }
        );

        setBloodRequests(
          (current) =>
            current.map(
              (request) =>
                request.id ===
                id
                  ? {
                      ...request,
                      status,
                    }
                  : request
            )
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Update failed"
        );
      } finally {
        setUpdatingId(null);
      }
    };

  const updateUserStatus =
    async (
      id: string,
      status:
        | "ACTIVE"
        | "BLOCKED"
    ) => {
      if (!token) return;

      setUpdatingId(id);

      try {
        await apiRequest(
          `/api/users/${id}/status`,
          {
            method: "PATCH",
            token,

            body: JSON.stringify({
              status,
            }),
          }
        );

        setUsers(
          (current) =>
            current.map(
              (user) =>
                user.id === id
                  ? {
                      ...user,
                      status,
                    }
                  : user
            )
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to update user"
        );
      } finally {
        setUpdatingId(null);
      }
    };

  const deactivateDonor =
    async (id: string) => {
      if (!token) return;

      const confirmed =
        window.confirm(
          "Deactivate this donor profile?"
        );

      if (!confirmed) {
        return;
      }

      setUpdatingId(id);

      try {
        await apiRequest(
          `/api/donors/${id}`,
          {
            method: "DELETE",
            token,
          }
        );

        setDonors(
          (current) =>
            current.filter(
              (donor) =>
                donor.id !== id
            )
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to deactivate donor"
        );
      } finally {
        setUpdatingId(null);
      }
    };

  if (isLoading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] text-[#910102]">
        <HeartLoader
          text="Loading admin control center..."
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
                <ShieldCheck
                  size={19}
                />
                ADMIN CONTROL
                CENTER
              </div>

              <h1 className="mt-3 text-3xl font-black">
                LifeLink
                Administration
              </h1>

              <p className="mt-2 text-white/75">
                Manage users,
                donors and blood
                requests while
                monitoring platform
                activity.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-xs text-white/65">
                Administrator
              </p>

              <p className="mt-1 font-bold">
                {admin.name}
              </p>
            </div>
          </div>
        </header>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={
              <Users
                size={22}
              />
            }
            title="Users"
            value={
              stats.users
            }
          />

          <StatCard
            icon={
              <HeartHandshake
                size={22}
              />
            }
            title="Active Donors"
            value={
              stats.activeDonors
            }
          />

          <StatCard
            icon={
              <Clock3
                size={22}
              />
            }
            title="Pending Blood"
            value={
              stats.pendingBlood
            }
          />

          <StatCard
            icon={
              <Activity
                size={22}
              />
            }
            title="Contact Requests"
            value={
              stats.contacts
            }
          />
        </section>

        <div className="mt-7 overflow-x-auto">
          <div className="inline-flex min-w-max gap-1 rounded-2xl border border-[#E7E9EE] bg-white p-1.5 shadow-sm">
            <AdminTab
              label="Overview"
              active={
                activeTab ===
                "overview"
              }
              onClick={() =>
                setActiveTab(
                  "overview"
                )
              }
            />

            <AdminTab
              label="Blood Requests"
              active={
                activeTab ===
                "blood"
              }
              onClick={() =>
                setActiveTab(
                  "blood"
                )
              }
            />

            <AdminTab
              label="Users"
              active={
                activeTab ===
                "users"
              }
              onClick={() =>
                setActiveTab(
                  "users"
                )
              }
            />

            <AdminTab
              label="Donors"
              active={
                activeTab ===
                "donors"
              }
              onClick={() =>
                setActiveTab(
                  "donors"
                )
              }
            />

            <AdminTab
              label="Contacts"
              active={
                activeTab ===
                "contacts"
              }
              onClick={() =>
                setActiveTab(
                  "contacts"
                )
              }
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-7">
          {activeTab ===
            "overview" && (
            <Overview
              stats={stats}
              requests={
                bloodRequests
              }
            />
          )}

          {activeTab ===
            "blood" && (
            <BloodRequestsTab
              requests={
                bloodRequests
              }
              updatingId={
                updatingId
              }
              onUpdate={
                updateBloodStatus
              }
            />
          )}

          {activeTab ===
            "users" && (
            <UsersTab
              users={users}
              updatingId={
                updatingId
              }
              adminId={
                admin.id
              }
              onStatusChange={
                updateUserStatus
              }
            />
          )}

          {activeTab ===
            "donors" && (
            <DonorsTab
              donors={donors}
              updatingId={
                updatingId
              }
              onDeactivate={
                deactivateDonor
              }
            />
          )}

          {activeTab ===
            "contacts" && (
            <ContactsTab
              requests={
                contactRequests
              }
            />
          )}
        </section>
      </div>
    </main>
  );
}

function Overview({
  stats,
  requests,
}: {
  stats: {
    users: number;
    activeDonors: number;
    pendingBlood: number;
    contacts: number;
    blockedUsers: number;
  };

  requests: BloodRequest[];
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
      <AdminPanel
        title="Recent Blood Requests"
      >
        {requests
          .slice(0, 5)
          .map(
            (request) => (
              <div
                key={
                  request.id
                }
                className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0"
              >
                <div>
                  <p className="font-bold text-[#102A43]">
                    {
                      request.patientName
                    }
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {
                      request.hospital
                    }{" "}
                    •{" "}
                    {
                      request.district
                    }
                  </p>
                </div>

                <StatusBadge
                  status={
                    request.status
                  }
                />
              </div>
            )
          )}
      </AdminPanel>

      <AdminPanel
        title="Platform Health"
      >
        <HealthRow
          label="Registered Users"
          value={
            stats.users
          }
        />

        <HealthRow
          label="Active Donors"
          value={
            stats.activeDonors
          }
        />

        <HealthRow
          label="Pending Blood Requests"
          value={
            stats.pendingBlood
          }
        />

        <HealthRow
          label="Blocked Users"
          value={
            stats.blockedUsers
          }
        />

        <HealthRow
          label="Contact Activity"
          value={
            stats.contacts
          }
        />
      </AdminPanel>
    </div>
  );
}

function BloodRequestsTab({
  requests,
  updatingId,
  onUpdate,
}: {
  requests: BloodRequest[];
  updatingId: string | null;

  onUpdate: (
    id: string,
    status: BloodStatus
  ) => void;
}) {
  return (
    <AdminPanel
      title="Blood Request Management"
    >
      <div className="space-y-4">
        {requests.map(
          (request) => (
            <article
              key={request.id}
              className="rounded-2xl border border-[#E7E9EE] p-5"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-[#102A43]">
                      {
                        request.patientName
                      }
                    </h3>

                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#910102]">
                      {
                        bloodGroupToLabel[
                          request
                            .bloodGroup
                        ]
                      }
                    </span>

                    <StatusBadge
                      status={
                        request.status
                      }
                    />
                  </div>

                  <p className="mt-3 text-sm text-[#64748B]">
                    {
                      request.hospital
                    }{" "}
                    •{" "}
                    {
                      request.district
                    }{" "}
                    •{" "}
                    {new Date(
                      request.requiredDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {updatingId ===
                  request.id ? (
                    <HeartLoader
                      text="Updating..."
                      size={18}
                    />
                  ) : (
                    <>
                      {request.status ===
                        "PENDING" && (
                        <>
                          <ActionButton
                            label="Approve"
                            type="approve"
                            onClick={() =>
                              onUpdate(
                                request.id,
                                "APPROVED"
                              )
                            }
                          />

                          <ActionButton
                            label="Reject"
                            type="reject"
                            onClick={() =>
                              onUpdate(
                                request.id,
                                "REJECTED"
                              )
                            }
                          />
                        </>
                      )}

                      {request.status ===
                        "APPROVED" && (
                        <ActionButton
                          label="Complete"
                          type="complete"
                          onClick={() =>
                            onUpdate(
                              request.id,
                              "COMPLETED"
                            )
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </AdminPanel>
  );
}

function UsersTab({
  users,
  updatingId,
  adminId,
  onStatusChange,
}: {
  users: User[];
  updatingId: string | null;
  adminId: string;

  onStatusChange: (
    id: string,
    status:
      | "ACTIVE"
      | "BLOCKED"
  ) => void;
}) {
  return (
    <AdminPanel title="User Management">
      <div className="space-y-3">
        {users.map(
          (user) => (
            <div
              key={user.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E7E9EE] p-5 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
                  <UserRound
                    size={22}
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#102A43]">
                      {
                        user.name
                      }
                    </h3>

                    {user.role ===
                      "ADMIN" && (
                      <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                        ADMIN
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {
                      user.email
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge
                  status={
                    user.status
                  }
                />

                {user.id !==
                  adminId &&
                  user.role !==
                    "ADMIN" && (
                    <button
                      type="button"
                      disabled={
                        updatingId ===
                        user.id
                      }
                      onClick={() =>
                        onStatusChange(
                          user.id,
                          user.status ===
                            "ACTIVE"
                            ? "BLOCKED"
                            : "ACTIVE"
                        )
                      }
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                        user.status ===
                        "ACTIVE"
                          ? "bg-red-50 text-red-700 hover:bg-red-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {updatingId ===
                      user.id
                        ? "Updating..."
                        : user.status ===
                            "ACTIVE"
                          ? "Block"
                          : "Unblock"}
                    </button>
                  )}
              </div>
            </div>
          )
        )}
      </div>
    </AdminPanel>
  );
}

function DonorsTab({
  donors,
  updatingId,
  onDeactivate,
}: {
  donors: ApiDonor[];
  updatingId: string | null;

  onDeactivate: (
    id: string
  ) => void;
}) {
  return (
    <AdminPanel
      title="Donor Management"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {donors.map(
          (donor) => (
            <article
              key={donor.id}
              className="rounded-2xl border border-[#E7E9EE] p-5"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#102A43]">
                    {
                      donor.user
                        .name
                    }
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-sm text-[#64748B]">
                    <MapPin
                      size={14}
                    />

                    {donor.area
                      ? `${donor.area}, `
                      : ""}
                    {
                      donor.district
                    }
                  </p>
                </div>

                <span className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-[#910102] px-2 text-sm font-black text-white">
                  {
                    bloodGroupToLabel[
                      donor
                        .bloodGroup
                    ]
                  }
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  {donor.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </span>

                <button
                  type="button"
                  disabled={
                    updatingId ===
                    donor.id
                  }
                  onClick={() =>
                    onDeactivate(
                      donor.id
                    )
                  }
                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                >
                  {updatingId ===
                  donor.id
                    ? "Updating..."
                    : "Deactivate"}
                </button>
              </div>
            </article>
          )
        )}
      </div>
    </AdminPanel>
  );
}

function ContactsTab({
  requests,
}: {
  requests: ContactRequest[];
}) {
  return (
    <AdminPanel
      title="Contact Request Monitoring"
    >
      <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
        Admin can monitor these
        requests but cannot approve or
        reject them. Only the donor
        controls that decision.
      </div>

      <div className="space-y-4">
        {requests.map(
          (request) => (
            <div
              key={request.id}
              className="rounded-2xl border border-[#E7E9EE] p-5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="font-bold text-[#102A43]">
                    {
                      request
                        .requester
                        .name
                    }{" "}
                    →{" "}
                    {
                      request
                        .donor.user
                        .name
                    }
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {
                      bloodGroupToLabel[
                        request
                          .donor
                          .bloodGroup
                      ]
                    }{" "}
                    •{" "}
                    {
                      request
                        .donor
                        .district
                    }
                  </p>

                  {request.message && (
                    <p className="mt-3 rounded-lg bg-[#F8FAFC] p-3 text-sm text-[#49607C]">
                      {
                        request.message
                      }
                    </p>
                  )}
                </div>

                <StatusBadge
                  status={
                    request.status
                  }
                />
              </div>
            </div>
          )
        )}
      </div>
    </AdminPanel>
  );
}

function AdminPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm sm:p-7">
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
    <article className="rounded-2xl border border-[#E7E9EE] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#910102]">
        {icon}
      </div>

      <p className="mt-4 text-sm text-[#64748B]">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black text-[#102A43]">
        {value}
      </p>
    </article>
  );
}

function AdminTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-[#910102] text-white shadow-sm"
          : "text-[#64748B] hover:bg-red-50 hover:text-[#910102]"
      }`}
    >
      {label}
    </button>
  );
}

function ActionButton({
  label,
  type,
  onClick,
}: {
  label: string;
  type:
    | "approve"
    | "reject"
    | "complete";
  onClick: () => void;
}) {
  const classes =
    type === "approve"
      ? "bg-green-600 text-white hover:bg-green-700"
      : type === "reject"
        ? "bg-red-50 text-red-700 hover:bg-red-100"
        : "bg-blue-600 text-white hover:bg-blue-700";

  const Icon =
    type === "approve"
      ? Check
      : type === "reject"
        ? X
        : CheckCircle2;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${classes}`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const classes =
    status === "APPROVED" ||
    status === "ACTIVE"
      ? "bg-green-50 text-green-700"
      : status === "REJECTED" ||
          status === "BLOCKED"
        ? "bg-red-50 text-red-700"
        : status === "COMPLETED"
          ? "bg-blue-50 text-blue-700"
          : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`self-start rounded-full px-3 py-1 text-xs font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

function HealthRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
      <span className="text-sm text-[#64748B]">
        {label}
      </span>

      <strong className="text-xl text-[#102A43]">
        {value}
      </strong>
    </div>
  );
}