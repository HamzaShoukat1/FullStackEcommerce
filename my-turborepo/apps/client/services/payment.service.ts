import { apiClient } from "@/app/utils/apiClient";

const backendUrl =
  process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL ||
  "http://localhost:3008";

export async function createpaymentSession({ items }: any) {
  return apiClient(
    `${backendUrl}/stripe/create-checkout-session`, {
    method: "POST",
    body: JSON.stringify({ items }),
  }
  );
}

export async function getCurrentSession(session_id: string) {
  return apiClient(
    `${backendUrl}/stripe/${session_id}`, {
    method: "GET",
  }
  );
}