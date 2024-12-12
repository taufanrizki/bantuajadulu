// src/app/listdonasi/page.tsx
"use client";

import NavbarAtas from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import axios from "axios";

// Definisikan tipe data donasi
// Tambahkan di atas fungsi DonationList
type Donation = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  target: number;
  collected: number;
};


export default function DonationList() {
  const [donationList, setDonationList] = useState<Donation[]>([]);
  const [donationAmounts, setDonationAmounts] = useState<{ [key: number]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [newDonation, setNewDonation] = useState({
    name: "",
    imageSrc: "",
    target: "",
  });

  // Ambil data donasi dari API saat komponen di-mount
  useEffect(() => {
    fetchDonations();
  }, []);

  // Fungsi untuk mengambil donasi
  const fetchDonations = async () => {
    try {
      const response = await axios.get<Donation[]>("http://localhost:5000/api/donations");
      setDonationList(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  // Simpan data donasi ke Local Storage setiap kali `donationList` diperbarui
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("donationList", JSON.stringify(donationList));
    }
  }, [donationList]);

  const handleDonationChange = (id: number, amount: string) => {
    setDonationAmounts((prev) => ({
      ...prev,
      [id]: amount,
    }));
  };

  const handleDonate = async (id: number) => {
    const amount = parseInt(donationAmounts[id]) || 0;
    if (amount <= 0) {
      alert("Jumlah donasi harus lebih besar dari 0.");
      return;
    }

    // Cari donasi yang dipilih
    const selectedDonation = donationList.find((donation) => donation.id === id);
    if (!selectedDonation) {
      alert("Donasi tidak ditemukan.");
      return;
    }

    if (selectedDonation.collected + amount > selectedDonation.target) {
      alert("Jumlah donasi melebihi target.");
      return;
    }

    try {
      // Kirim permintaan donasi ke API
      const response = await axios.post<Donation>(`http://localhost:5000/api/donations/${id}/donate`, {
        amount,
      });

      // Update daftar donasi dengan data terbaru
      setDonationList((prev) =>
        prev.map((donation) =>
          donation.id === id ? response.data : donation
        )
      );

      // Reset input donasi
      setDonationAmounts((prev) => ({
        ...prev,
        [id]: "",
      }));
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

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

      // Tambahkan donasi baru ke daftar
      setDonationList((prev) => [...prev, response.data]);

      // Reset form
      setNewDonation({ name: "", imageSrc: "", target: "" });
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  const filteredDonations = donationList.filter((donation) =>
    donation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      <NavbarAtas />

      <div className="bg-gray-50 flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            List Donasi
          </h2>

          <input
            type="text"
            placeholder="Cari Donasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 w-full mb-6 mt-4"
          />

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredDonations.map((donation) => {
              const progress = Math.min(
                (donation.collected / donation.target) * 100,
                100
              );

              return (
                <div key={donation.id} className="group relative bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={donation.imageSrc}
                    alt={donation.imageAlt}
                    className="w-full h-48 object-cover group-hover:opacity-75"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{donation.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Target: Rp {new Intl.NumberFormat("id-ID").format(donation.target)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Collected: Rp {new Intl.NumberFormat("id-ID").format(donation.collected)}
                    </p>

                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Progress: {progress.toFixed(2)}%
                    </p>

                    <input
                      type="number"
                      placeholder="Jumlah Donasi"
                      value={donationAmounts[donation.id] || ""}
                      onChange={(e) => handleDonationChange(donation.id, e.target.value)}
                      className="border rounded-md p-2 w-full mt-4"
                    />
                    <button
                      onClick={() => handleDonate(donation.id)}
                      className="mt-2 w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
                    >
                      Donasi Sekarang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-bold mt-12">Tambah Donasi Baru</h3>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Nama Donasi"
              value={newDonation.name}
              onChange={(e) =>
                setNewDonation({ ...newDonation, name: e.target.value })
              }
              className="border rounded-md p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="URL Gambar"
              value={newDonation.imageSrc}
              onChange={(e) =>
                setNewDonation({ ...newDonation, imageSrc: e.target.value })
              }
              className="border rounded-md p-2 w-full mb-4"
            />
            <input
              type="number"
              placeholder="Target Donasi"
              value={newDonation.target}
              onChange={(e) =>
                setNewDonation({ ...newDonation, target: e.target.value })
              }
              className="border rounded-md p-2 w-full mb-4"
            />
            <button
              onClick={handleAddDonation}
              className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
            >
              Tambah Donasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
