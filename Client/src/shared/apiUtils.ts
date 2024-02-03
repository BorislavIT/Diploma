const defaultHeaders = {
  "Content-Type": "application/json",
};

export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const fetchClientAsync = async (
  url: string,
  method: HTTP_METHOD,
  payload?: any,
  headers?: any
) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL + url,
      {
        method: method,
        headers: { ...defaultHeaders, ...headers },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error((error as Error).message || "An error occurred");
  }
};

export default fetchClientAsync;
