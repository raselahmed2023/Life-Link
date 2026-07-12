export type DonorStatus =
  | "available"
  | "recent"
  | "pending";

export type Donor = {
  id: string;
  name: string;
  image: string;
  bloodGroup: string;
  area: string;
  district: string;
  status: DonorStatus;
  verified: boolean;
  confirmedText: string;
  confirmedRank: number;
  donations: number;
  lastDonation: string;
  joinedRank: number;
};
