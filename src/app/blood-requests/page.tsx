
"use client";

import {
  AlertTriangle,
  CalendarDays,
  Droplets,
  Hospital,
  MapPin,
  Phone,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BloodRequestModal from "@/components/blood/BloodRequestModal";
import HeartLoader from "@/components/ui/HeartLoader";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { bloodGroupToLabel } from "@/lib/bloodGroup";
import type { ApiBloodGroup } from "@/types/donor";

type BloodRequest = {
  id: string;
  bloodGroup: ApiBloodGroup;
  hospital: string;
  district: string;
  requiredDate: string;
  message: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
};

type BloodRequestResponse = {
  success: boolean;
  message: string;
  data: BloodRequest[];
};

export default function BloodRequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    setError("");
    try {
      const response = await apiRequest<BloodRequestResponse>(
        "/api/blood-requests"
      );
      setRequests(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load blood requests"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests]);

  const openRequestModal = () => {
    if (!getAuthToken()) {
      window.location.href = "/login";
      return;
    }
    setIsRequestModalOpen(true);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC]">
        <section className="border-b border-red-100 bg-gradient-to-br from-[#FFF7F6] via-white to-[#F8FAFC]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#910102]">
                  <Droplets size={17} />
                  Emergency Blood Requests
                </span>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-[#102A43] sm:text-5xl">
                  People are waiting for help
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#64748B]">
                  Browse approved requests and help connect patients with
                  suitable donors.
                </p>
              </div>

              <button
                type="button"
                onClick={openRequestModal}
                className="self-start rounded-xl bg-[#A90000] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#910102] lg:self-auto"
              >
                Request Blood
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#910102]">
                Active Requests
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#102A43]">
                Approved blood requests
              </h2>
            </div>

            {!isLoading && (
              <p className="text-sm font-semibold text-[#64748B]">
                {requests.length} {requests.length === 1 ? "request" : "requests"}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-red-100 bg-white text-[#910102]">
              <HeartLoader text="Finding blood requests..." size={32} />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center font-semibold text-red-700">
              {error}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  void fetchRequests();
                }}
                className="ml-3 underline"
              >
                Retry
              </button>
            </div>
          ) : requests.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#D7DEE7] bg-white px-6 py-16 text-center">
              <Droplets size={46} className="mx-auto text-[#910102]" />
              <h3 className="mt-5 text-xl font-bold text-[#102A43]">
                No approved requests right now
              </h3>
              <p className="mt-2 text-[#64748B]">
                Approved emergency requests will appear here.
              </p>
              <button
                type="button"
                onClick={openRequestModal}
                className="mt-6 rounded-xl bg-[#910102] px-5 py-3 text-sm font-bold text-white"
              >
                Request Blood
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BloodRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSuccess={fetchRequests}
      />
    </>
  );
}

function RequestCard({ request }: { request: BloodRequest }) {
  const [phone, setPhone] = useState<string | null>(null);
  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  const revealContact = async () => {
    const token = getAuthToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setContactLoading(true);
    setContactError("");

    try {
      const result = await apiRequest<{ data: { phone: string } }>(
        `/api/blood-requests/${request.id}/contact`,
        { token }
      );
      setPhone(result.data.phone);
    } catch (err) {
      setContactError(
        err instanceof Error ? err.message : "Unable to load contact"
      );
    } finally {
      setContactLoading(false);
    }
  };

  const requiredDate = new Date(request.requiredDate).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#E7E9EE] bg-white shadow-sm transition hover:border-red-200 hover:shadow-xl">
      <div className="border-b border-red-100 bg-gradient-to-r from-red-50 to-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#910102] px-3 py-1.5 text-xs font-bold text-white">
              <AlertTriangle size={14} />
              Blood Needed
            </span>
            <h3 className="mt-4 text-xl font-bold text-[#102A43]">
              Emergency blood request
            </h3>
          </div>

          <div className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-[#910102] px-3 text-lg font-black text-white">
            {bloodGroupToLabel[request.bloodGroup]}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-4">
          <InfoRow icon={<Hospital size={18} />} label="Hospital" value={request.hospital} />
          <InfoRow icon={<MapPin size={18} />} label="District" value={request.district} />
          <InfoRow icon={<CalendarDays size={18} />} label="Required Date" value={requiredDate} />

          {phone ? (
            <InfoRow icon={<Phone size={18} />} label="Requester Contact" value={phone} />
          ) : (
            <div>
              <button
                type="button"
                onClick={revealContact}
                disabled={contactLoading}
                className="rounded-lg border border-[#910102] px-4 py-2 text-sm font-semibold text-[#910102] disabled:opacity-50"
              >
                {contactLoading ? "Loading..." : "View Contact (available donors)"}
              </button>
              {contactError && (
                <p className="mt-2 text-xs text-red-600">{contactError}</p>
              )}
            </div>
          )}
        </div>

        {request.message && (
          <div className="mt-5 rounded-xl bg-[#F8FAFC] p-4">
            <p className="text-xs font-bold uppercase text-[#64748B]">
              Additional Information
            </p>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#49607C]">
              {request.message}
            </p>
          </div>
        )}

        <div className="mt-auto pt-6">
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
            Approved Request
          </span>
        </div>
      </div>
    </article>
  );
}

function InfoRow({
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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#910102]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#64748B]">{label}</p>
        <p className="mt-0.5 break-words font-semibold text-[#102A43]">{value}</p>
      </div>
    </div>
  );
}
