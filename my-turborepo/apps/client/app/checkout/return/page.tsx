"use client"

import { getCurrentSession } from "@/services/payment.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

export default function ReturnPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")

    const { data: currentSession, isLoading, isError, error } = useQuery({
        queryKey: ["session_id", sessionId],
        queryFn: () => getCurrentSession(sessionId!),
        enabled: !!sessionId,
    })
    console.log("Current Session:", currentSession)
    console.log("Session ID:", sessionId)

    if (!sessionId) {
        return <div className="p-8 text-center">No session ID provided</div>
    }

    if (isLoading) {
        return <div className="p-8 text-center">Loading your order details...</div>
    }

    if (isError) {
        return <div className="p-8 text-center text-red-500">Error: {(error as Error)?.message}</div>
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
                <p className="text-green-700">Thank you for your order.</p>
            </div>

            {currentSession && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Session ID:</span> {currentSession?.data.id}</p>
                        <p><span className="font-semibold">Amount:</span> ${(currentSession?.data.amount_total || 0) / 100}</p>
                        <p><span className="font-semibold">Status:</span> {currentSession?.data.status}</p>
                        <p><span className="font-semibold">Email:</span> {currentSession?.data.customer_email}</p>
                    </div>
                </div>
            )}
        </div>
    )
}