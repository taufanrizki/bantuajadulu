"use client";

import NavbarAtas from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";

type Donation = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  target: number;
  collected: number;
};

export default function DonationList() {
  const [donationList, setDonationList] = useState<Donation[]>(() => {
    const storedDonations = localStorage.getItem("donationList");
    return storedDonations ? JSON.parse(storedDonations) : [];
  });

  const [donationAmounts, setDonationAmounts] = useState<{ [key: number]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [newDonation, setNewDonation] = useState<Donation>({
    id: 0,
    name: "",
    imageSrc: "",
    imageAlt: "",
    target: 0,
    collected: 0,
  });

  useEffect(() => {
    localStorage.setItem("donationList", JSON.stringify(donationList));
  }, [donationList]);

  const handleDonationChange = (id: number, amount: string) => {
    setDonationAmounts((prev) => ({
      ...prev,
      [id]: amount,
    }));
  };

  const handleDonate = (id: number) => {
    const amount = parseInt(donationAmounts[id]) || 0;  
    if (amount <= 0) {
      alert("Jumlah donasi harus lebih besar dari 0.");
      return;
    }

    setDonationList((prev: Donation[]) =>
      prev.map((donation: Donation) =>
        donation.id === id
          ? {
              ...donation,
              collected: Math.min(donation.collected + amount, donation.target),
            }
          : donation
      )
    );

    setDonationAmounts((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleAddDonation = () => {
    if (!newDonation.name || !newDonation.imageSrc || !newDonation.target) {
      alert("Semua field wajib diisi.");
      return;
    }

    const newId = donationList.length
      ? donationList[donationList.length - 1].id + 1
      : 1;

    const newDonationEntry: Donation = {
      id: newId,
      name: newDonation.name,
      imageSrc: newDonation.imageSrc,
      imageAlt: `Image of ${newDonation.name}`,
      target: parseInt(newDonation.target.toString(), 10),
      collected: 0,
    };

    setDonationList((prev) => [...prev, newDonationEntry]);

    setNewDonation({
      id: 0,
      name: "",
      imageSrc: "",
      imageAlt: "",
      target: 0,
      collected: 0,
    });
  };

  const filteredDonations = donationList.filter((donation: Donation) =>
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
            className="border rounded-md p-1 w-full mb-4"
          />

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredDonations.map((donation: Donation) => {
            const progress = Math.min(
              (donation.collected / donation.target) * 100,
              100
            );

            return (
              <div key={donation.id} className="group relative">
                <img
                  src={donation.imageSrc}
                  alt={donation.imageAlt}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-700">
                    {donation.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Target: Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(donation.target)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Collected: Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(donation.collected)}
                  </p>

                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Progress: {progress.toFixed(2)}%
                  </p>

                  <input
                    type="number"
                    placeholder="Jumlah Donasi"
                    value={donationAmounts[donation.id] || ""}
                    onChange={(e) => handleDonationChange(donation.id, e.target.value)}
                    className="border rounded-md p-1 w-full mt-2" />
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

          <h3 className="text-xl font-bold mt-8">Tambah Donasi Baru</h3>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Nama Donasi"
              value={newDonation.name}
              onChange={(e) =>
                setNewDonation({ ...newDonation, name: e.target.value })
              }
              className="border rounded-md p-1 w-full mb-2"
            />
            <input
              type="text"
              placeholder="URL Gambar"
              value={newDonation.imageSrc}
              onChange={(e) =>
                setNewDonation({ ...newDonation, imageSrc: e.target.value })
              }
              className="border rounded-md p-1 w-full mb-2"
            />
            <input
            type="number"
            placeholder="Target Donasi"
            value={newDonation.target}
            onChange={(e) =>
            setNewDonation({ ...newDonation, target: +e.target.value }) 
  }
  className="border rounded-md p-1 w-full mb-2"
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
