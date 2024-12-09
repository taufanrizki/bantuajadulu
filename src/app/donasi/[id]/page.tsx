"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import NavbarAtas from "@/components/ui/navigation-menu";

const donationList = [
    {
        id: 1,
        name: "Pendidikan Anak Yatim",
        imageSrc: "/listdonasi/sekolah.jpg",
        imageAlt: "A group of children studying with books.",
        target: 50000000,
        collected: 30000000,
    },
    {
        id: 2,
        name: "Bantuan Bencana Alam",
        imageSrc: "/listdonasi/bencana.jpg",
        imageAlt: "People receiving aid after a natural disaster.",
        target: 100000000,
        collected: 75000000,
    },
    {
        id: 3,
        name: "Program Pangan Sehat",
        imageSrc: "/listdonasi/pangan.jpg",
        imageAlt: "Fresh and healthy food packages.",
        target: 30000000,
        collected: 15000000,
    },
    {
        id: 4,
        name: "Renovasi Sekolah",
        imageSrc: "/listdonasi/renov.jpg",
        imageAlt: "A school building under renovation.",
        target: 80000000,
        collected: 0,
    },
];

const PaymentPage = () => {
    const { id } = useParams();
    const donation = donationList.find((donation) => donation.id.toString() === id);

    const [amount, setAmount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    if (!donation) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-red-600 font-semibold text-lg">Donasi tidak ditemukan.</p>
            </div>
        );
    }

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (amount <= 0) {
            alert("Masukkan jumlah donasi yang valid.");
            return;
        }

        if (!paymentMethod) {
            alert("Pilih metode pembayaran.");
            return;
        }

        alert(
            `Pembayaran sebesar Rp ${amount.toLocaleString()} berhasil dilakukan dengan metode ${paymentMethod}.`
        );
    };

    return (
        <div className="h-screen flex flex-col">
            <NavbarAtas />

            <div className="bg-gray-50 flex-grow">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Pembayaran Donasi
                    </h2>
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={donation.imageSrc}
                                alt={donation.imageAlt}
                                className="w-full h-80 object-cover rounded-lg"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-700 mt-4">{donation.name}</h3>
                            <p className="text-sm text-gray-500">
                                Target Donasi: Rp {donation.target.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Donasi Terkumpul: Rp {donation.collected.toLocaleString()}
                            </p>

                            <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jumlah Donasi
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        min="1"
                                        placeholder="Masukkan jumlah donasi"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Metode Pembayaran
                                    </label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Pilih Metode Pembayaran
                                        </option>
                                        <option value="transferBank">Transfer Bank</option>
                                        <option value="eWallet">E-Wallet</option>
                                        <option value="creditCard">Kartu Kredit</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
                                >
                                    Konfirmasi Pembayaran
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800 text-white text-center py-4">
                <p className="text-sm">© 2024 Bantu Aja Dulu. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default PaymentPage;
