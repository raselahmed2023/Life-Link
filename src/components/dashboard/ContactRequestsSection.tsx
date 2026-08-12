"use client";

import {
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import { bloodGroupToLabel } from "@/lib/bloodGroup";
import type { ApiBloodGroup } from "@/types/donor";

type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

type IncomingRequest = {
  id: string;
  requesterId: string;
  donorId: string;
  message: string | null;
  status: RequestStatus;
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
  };
};

type OutgoingRequest = {
  id: string;
  requesterId: string;
  donorId: string;
  message: string | null;
  status: RequestStatus;
  createdAt: string;

  donor: {
    id: string;
    name: string;
    bloodGroup: ApiBloodGroup;
    district: string;
    area: string | null;
  };

  donorContact: {
    email: string;
    phone: string | null;
  } | null;
};

type IncomingResponse = {
  success: boolean;
  message: string;
  data: IncomingRequest[];
};

type OutgoingResponse = {
  success: boolean;
  message: string;
  data: OutgoingRequest[];
};

type UpdateResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

export default function ContactRequestsSection() {
  const [activeTab, setActiveTab] =
    useState<"incoming" | "sent">(
      "incoming"
    );

  const [
    incomingRequests,
    setIncomingRequests,
  ] = useState<IncomingRequest[]>(
    []
  );

  const [
    outgoingRequests,
    setOutgoingRequests,
  ] = useState<OutgoingRequest[]>(
    []
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const loadRequests =
    useCallback(async () => {
      const token =
        localStorage.getItem(
          "lifelink_token"
        );

      if (!token) {
        return;
      }

      setError("");

      try {
        const [
          incomingResponse,
          outgoingResponse,
        ] = await Promise.all([
          apiRequest<IncomingResponse>(
            "/api/contact-requests/my/incoming",
            {
              token,
            }
          ),

          apiRequest<OutgoingResponse>(
            "/api/contact-requests/my/outgoing",
            {
              token,
            }
          ),
        ]);

        setIncomingRequests(
          incomingResponse.data
        );

        setOutgoingRequests(
          outgoingResponse.data
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load contact requests"
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const updateRequest = async (
    id: string,
    status:
      | "APPROVED"
      | "REJECTED"
  ) => {
    const token =
      localStorage.getItem(
        "lifelink_token"
      );

    if (!token) {
      return;
    }

    setUpdatingId(id);
    setError("");

    try {
      await apiRequest<UpdateResponse>(
        `/api/contact-requests/${id}`,
        {
          method: "PATCH",
          token,

          body: JSON.stringify({
            status,
          }),
        }
      );

      setIncomingRequests(
        (current) =>
          current.map((request) =>
            request.id === id
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
          : "Failed to update contact request"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="rounded-3xl border border-[#E7E9EE] bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#910102]">
            Connections
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
            Contact Requests
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            Manage requests you
            received and track requests
            you sent.
          </p>
        </div>

        <div className="flex rounded-xl bg-[#F3F5F7] p-1">
          <button
            type="button"
            onClick={() =>
              setActiveTab(
                "incoming"
              )
            }
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              activeTab ===
              "incoming"
                ? "bg-white text-[#910102] shadow-sm"
                : "text-[#64748B]"
            }`}
          >
            Incoming (
            {
              incomingRequests.length
            }
            )
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab("sent")
            }
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              activeTab === "sent"
                ? "bg-white text-[#910102] shadow-sm"
                : "text-[#64748B]"
            }`}
          >
            Sent (
            {
              outgoingRequests.length
            }
            )
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-[220px] items-center justify-center text-[#910102]">
          <HeartLoader
            text="Loading contact requests..."
            size={28}
          />
        </div>
      ) : (
        <div className="mt-7">
          {activeTab ===
          "incoming" ? (
            <IncomingList
              requests={
                incomingRequests
              }
              updatingId={
                updatingId
              }
              onUpdate={
                updateRequest
              }
            />
          ) : (
            <OutgoingList
              requests={
                outgoingRequests
              }
            />
          )}
        </div>
      )}
    </section>
  );
}

function IncomingList({
  requests,
  updatingId,
  onUpdate,
}: {
  requests: IncomingRequest[];
  updatingId: string | null;

  onUpdate: (
    id: string,
    status:
      | "APPROVED"
      | "REJECTED"
  ) => void;
}) {
  if (requests.length === 0) {
    return (
      <EmptyState
        title="No incoming requests"
        text="When someone requests your contact information, it will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {requests.map(
        (request) => (
          <article
            key={request.id}
            className="rounded-2xl border border-[#E7E9EE] p-5"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-[#102A43]">
                    {
                      request
                        .requester
                        .name
                    }
                  </h3>

                  <StatusBadge
                    status={
                      request.status
                    }
                  />
                </div>

                <p className="mt-2 text-sm text-[#64748B]">
                  Requesting your{" "}
                  <strong>
                    {
                      bloodGroupToLabel[
                        request
                          .donor
                          .bloodGroup
                      ]
                    }
                  </strong>{" "}
                  donor contact.
                </p>

                {request.message && (
                  <div className="mt-4 flex gap-2 rounded-xl bg-[#F8FAFC] p-4">
                    <MessageSquareText
                      size={18}
                      className="mt-0.5 shrink-0 text-[#910102]"
                    />

                    <p className="text-sm leading-6 text-[#49607C]">
                      {
                        request.message
                      }
                    </p>
                  </div>
                )}

                <p className="mt-3 text-xs text-[#94A3B8]">
                  {new Date(
                    request.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              {request.status ===
                "PENDING" && (
                <div className="flex shrink-0 flex-wrap content-start gap-2">
                  {updatingId ===
                  request.id ? (
                    <div className="text-[#910102]">
                      <HeartLoader
                        text="Updating..."
                        size={18}
                      />
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(
                            request.id,
                            "APPROVED"
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
                      >
                        <Check
                          size={
                            17
                          }
                        />
                        Accept
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(
                            request.id,
                            "REJECTED"
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
                      >
                        <X
                          size={
                            17
                          }
                        />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </article>
        )
      )}
    </div>
  );
}

function OutgoingList({
  requests,
}: {
  requests: OutgoingRequest[];
}) {
  if (requests.length === 0) {
    return (
      <EmptyState
        title="No requests sent"
        text="Your donor contact requests will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {requests.map(
        (request) => (
          <article
            key={request.id}
            className="rounded-2xl border border-[#E7E9EE] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">
                  {
                    request.donor
                      .name
                  }
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  {
                    bloodGroupToLabel[
                      request.donor
                        .bloodGroup
                    ]
                  }{" "}
                  •{" "}
                  {request.donor
                    .area
                    ? `${request.donor.area}, `
                    : ""}
                  {
                    request.donor
                      .district
                  }
                </p>
              </div>

              <StatusBadge
                status={
                  request.status
                }
              />
            </div>

            {request.message && (
              <p className="mt-4 rounded-xl bg-[#F8FAFC] p-3 text-sm leading-6 text-[#49607C]">
                {request.message}
              </p>
            )}

            {request.status ===
              "APPROVED" &&
              request.donorContact && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
                  <div className="flex items-center gap-2 font-bold text-green-800">
                    <CheckCircle2
                      size={19}
                    />
                    Contact Approved
                  </div>

                  <p className="mt-2 text-sm text-green-700">
                    The donor approved
                    your request. You can
                    now contact them.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <a
                      href={`mailto:${request.donorContact.email}`}
                      className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#102A43] shadow-sm"
                    >
                      <Mail
                        size={17}
                        className="text-[#910102]"
                      />

                      {
                        request
                          .donorContact
                          .email
                      }
                    </a>

                    {request
                      .donorContact
                      .phone && (
                      <a
                        href={`tel:${request.donorContact.phone}`}
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#102A43] shadow-sm"
                      >
                        <Phone
                          size={
                            17
                          }
                          className="text-[#910102]"
                        />

                        {
                          request
                            .donorContact
                            .phone
                        }
                      </a>
                    )}
                  </div>
                </div>
              )}

            {request.status ===
              "PENDING" && (
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Clock3 size={17} />
                Waiting for donor
                approval
              </div>
            )}

            {request.status ===
              "REJECTED" && (
              <div className="mt-4 text-sm font-semibold text-red-700">
                The donor declined this
                contact request.
              </div>
            )}
          </article>
        )
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: RequestStatus;
}) {
  const classes =
    status === "APPROVED"
      ? "bg-green-50 text-green-700"
      : status === "REJECTED"
        ? "bg-red-50 text-red-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#D7DEE7] py-12 text-center">
      <Send
        size={35}
        className="mx-auto text-[#910102]"
      />

      <h3 className="mt-4 font-bold text-[#102A43]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-[#64748B]">
        {text}
      </p>
    </div>
  );
}