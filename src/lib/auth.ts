export type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  status: string;
};

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(
    "lifelink_token"
  );
}

export function getStoredUser():
  | StoredUser
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser =
    localStorage.getItem(
      "lifelink_user"
    );

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(
      storedUser
    ) as StoredUser;
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    "lifelink_token"
  );

  localStorage.removeItem(
    "lifelink_user"
  );
}