const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

type ApiOptions =
  RequestInit & {
    token?: string;
  };

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    token,
    headers,
    ...rest
  } = options;

  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        ...rest,

        headers: {
          "Content-Type":
            "application/json",

          ...headers,

          ...(token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : {}),
        },
      }
    );

  let data;

  try {
    data =
      await response.json();
  } catch {
    throw new Error(
      "Invalid response from server"
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Something went wrong"
    );
  }

  return data as T;
}

export { API_URL };