import fetchClientAsync, { HTTP_METHOD } from "./apiUtils";

describe("fetchClientAsync", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should successfully fetch data for GET method", async () => {
    const mockResponse = { data: "test" };
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await fetchClientAsync("/test", HTTP_METHOD.GET);

    expect(global.fetch).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL + "/test",
      expect.objectContaining({ method: HTTP_METHOD.GET })
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when response is not ok", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchClientAsync("/test", HTTP_METHOD.GET)).rejects.toThrow(
      "Failed to fetch: Internal Server Error"
    );
  });

  it("should not return json for DELETE method", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(null),
    } as Response);

    const result = await fetchClientAsync("/test", HTTP_METHOD.DELETE);

    expect(global.fetch).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL + "/test",
      expect.objectContaining({ method: HTTP_METHOD.DELETE })
    );
    expect(result).toBeUndefined();
  });
});
