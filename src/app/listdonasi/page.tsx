'use client';

import Link from 'next/link';


const donationList = [
  { id: 1, title: "Pendidikan Anak Yatim", description: "Bantuan untuk anak yatim" },
  { id: 2, title: "Bantuan Bencana Alam", description: "Donasi untuk korban bencana" },
  { id: 3, title: "Program Pangan Sehat", description: "Bantuan pangan untuk keluarga kurang mampu" },
];

const DonationList = () => {
  return (
    <div className="w-full max-w-3xl space-y-4">
      {donationList.map((donation) => (
        <div key={donation.id} className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold">{donation.title}</h3>
          <p>{donation.description}</p>
          <Link href={`/donasi/${donation.id}`} className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-4 inline-block">
            Donasi Sekarang
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DonationList;
