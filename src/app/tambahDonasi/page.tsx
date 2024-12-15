"use client";

import NavbarAtas from "@/components/ui/navigation-menu";
import { useState } from "react";
import axios from "axios";

type Donation = {
    id: number;
    name: string;
    imageSrc: string;
    imageAlt: string;
    target: number;
    collected: number;
};

export default function DonationList() {
    const [newDonation, setNewDonation] = useState({
        name: "",
        imageSrc: "",
        target: "",
    });

    const handleAddDonation = async () => {
        const { name, imageSrc, target } = newDonation;

        if (!name || !imageSrc || !target) {
            alert("Semua field wajib diisi.");
            return;
        }

        try {
            // Kirim donasi baru ke API
            const response = await axios.post<Donation>("http://localhost:5000/api/donations", {
                name,
                imageSrc,
                target: parseInt(target, 10),
            });

            // Reset form setelah sukses
            setNewDonation({ name: "", imageSrc: "", target: "" });
        } catch (error) {
            console.error("Error adding donation:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <NavbarAtas />

            <div className="flex-grow container mx-auto py-12">
                <h3 className="text-2xl font-bold text-center mb-6">Program Donasi Baru</h3>
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Nama Donasi"
                        value={newDonation.name}
                        onChange={(e) =>
                            setNewDonation({ ...newDonation, name: e.target.value })
                        }
                        className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring focus:ring-green-300"
                    />
                    <input
                        type="text"
                        placeholder="URL Gambar"
                        value={newDonation.imageSrc}
                        onChange={(e) =>
                            setNewDonation({ ...newDonation, imageSrc: e.target.value })
                        }
                        className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring focus:ring-green-300"
                    />
                    <input
                        type="number"
                        placeholder="Target Donasi"
                        value={newDonation.target}
                        onChange={(e) =>
                            setNewDonation({ ...newDonation, target: e.target.value })
                        }
                        className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring focus:ring-green-300"
                    />
                    <button
                        onClick={handleAddDonation}
                        className="w-full bg-green-600 text-white rounded-md py-3 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        Tambah Donasi
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
                <p className="text-sm">© 2024 Bantu Aja Dulu. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
