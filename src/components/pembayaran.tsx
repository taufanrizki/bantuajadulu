"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Accept donationId as a prop
interface DonationPaymentFormProps {
    donationId: number;
}

export default function DonationPaymentForm({ donationId }: DonationPaymentFormProps) {
    const router = useRouter();
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`You have donated Rp ${amount.toLocaleString()} to Donation ID: ${donationId}.`);
        router.push("/listdonasi/"); // Redirect to the donation list after payment
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="donation-amount"
                    className="block text-sm font-medium text-gray-700"
                >
                    Jumlah Donasi (Rp)
                </label>
                <input
                    type="number"
                    id="donation-amount"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={1000} // Minimum donation amount
                    required
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Konfirmasi Donasi
                </button>
            </div>
        </form>
    );
}
