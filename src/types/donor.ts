export type ApiBloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

export type ApiDonor = {
  id: string;
  userId: string;
  bloodGroup: ApiBloodGroup;
  district: string;
  area: string | null;
  lastDonation: string | null;
  isAvailable: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
};