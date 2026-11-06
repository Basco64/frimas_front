import axios from "axios";

export function apiErrorKey(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data;
    if (typeof body === "string" && /^[a-z_]{1,40}$/.test(body)) {
      return `errors.${body}`;
    }
    const status = error.response?.status;
    if (status === 409) return "errors.conflict";
    if (status === 400) return "errors.bad_request";
  }
  return "errors.generic";
}
