// DonationDetailPage

import NavbarAtas from "@/components/ui/navigation-menu";
import DonationPaymentForm from "@/components/pembayaran";

const donationDetails = [
    {
        id: 1,
        name: "Pendidikan Anak Yatim",
        description: "Bantu pendidikan anak-anak yatim untuk masa depan yang cerah.",
        imageSrc: "/listdonasi/bencana.jpg",
        target: 50000000,
        collected: 30000000,
    },
    {
        id: 2,
        name: "Bantuan Bencana Alam",
        description: "Membantu para korban bencana alam dengan kebutuhan pokok.",
        imageSrc: "/listdonasi/bencana.jpg",
        target: 100000000,
        collected: 75000000,
    },
    {
        id: 3,
        name: "Program Pangan Sehat",
        description: "Sediakan pangan sehat dan bergizi untuk masyarakat kurang mampu.",
        imageSrc: "/listdonasi/bencana.jpg",
        target: 30000000,
        collected: 15000000,
    },
    {
        id: 4,
        name: "Renovasi Sekolah",
        description: "Dukung renovasi sekolah agar anak-anak dapat belajar dengan nyaman.",
        imageSrc: "/listdonasi/bencana.jpg",
        target: 80000000,
        collected: 80000000,
    },
];

export default function DonationDetailPage({ params }: { params: { id: string } }) {
    const donationId = parseInt(params.id, 10);
    const donation = donationDetails.find((item) => item.id === donationId);

    if (!donation) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">Donasi Tidak Ditemukan</h1>
                <p className="text-gray-600">Maaf, donasi yang Anda cari tidak ada.</p>
            </div>
        );
    }

    const progress = Math.min((donation.collected / donation.target) * 100, 100);

    return (
        <div className="h-screen flex flex-col">
            <NavbarAtas />

            <div className="flex-grow bg-gray-50">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Section */}
                        <div className="flex-shrink-0 lg:w-1/2">
                            <img
                                src={donation.imageSrc}
                                alt={donation.name}
                                className="rounded-lg w-full h-64 object-cover lg:h-auto"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-900">{donation.name}</h1>
                            <p className="mt-4 text-gray-600">{donation.description}</p>
                            <p className="mt-4 text-gray-500">
                                Target: Rp {donation.target.toLocaleString()}
                            </p>
                            <p className="mt-1 text-gray-500">
                                Collected: Rp {donation.collected.toLocaleString()}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{progress.toFixed(1)}%</p>

                            {/* Payment Form Section */}
                            <div className="mt-8">
                                {/* Pass the donationId to DonationPaymentForm */}
                                <DonationPaymentForm donationId={donation.id} />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <footer className="bg-gray-800 text-white text-center py-4">
                <p className="text-sm">© 2024 Bantu Aja Dulu. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
