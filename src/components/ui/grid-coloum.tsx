import Link from "next/link";

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
];

export default function DonationList() {
    return (
        <div className="h-screen flex flex-col">
            <div className="bg-gray-50 flex-grow">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Donasi
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
                        {donationList.map((donation) => {
                            // Hitung progres
                            const progress = Math.min(
                                (donation.collected / donation.target) * 100,
                                100
                            );

                            return (
                                <div key={donation.id} className="group relative">
                                    <img
                                        src={donation.imageSrc}
                                        alt={donation.imageAlt}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    />

                                    <div className="mt-4">
                                        <h3 className="text-sm font-bold text-gray-700">
                                            {donation.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Target: Rp {donation.target.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Collected: Rp {donation.collected.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="mt-4 text-right">
                                        <Link
                                            href={`/donasi/${donation.id}`}
                                            className="inline-block bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition"
                                        >
                                            Donasi
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
