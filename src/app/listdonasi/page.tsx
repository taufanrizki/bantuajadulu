import NavbarAtas from "@/components/ui/navigation-menu";

const donationList = [
  {
    id: 1,
    name: "Pendidikan Anak Yatim",
    href: "/donate/1",
    imageSrc: "/listdonasi/bencana.jpg",
    imageAlt: "A group of children studying with books.",
    target: 50000000,
    collected: 30000000,
  },
  {
    id: 2,
    name: "Bantuan Bencana Alam",
    href: "/donate/2",
    imageSrc: "/listdonasi/bencana.jpg",
    imageAlt: "People receiving aid after a natural disaster.",
    target: 100000000,
    collected: 75000000,
  },
  {
    id: 3,
    name: "Program Pangan Sehat",
    href: "/donate/3",
    imageSrc: "/listdonasi/bencana.jpg",
    imageAlt: "Fresh and healthy food packages.",
    target: 30000000,
    collected: 15000000,
  },
  {
    id: 4,
    name: "Renovasi Sekolah",
    href: "/donate/4",
    imageSrc: "/listdonasi/bencana.jpg",
    imageAlt: "A school building under renovation.",
    target: 80000000,
    collected: 80000000,
  },
];

export default function DonationList() {
  return (
    <div className="h-screen flex flex-col">
      <NavbarAtas />

      {/* Donation List */}
      <div className="bg-gray-50 flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            List Donasi
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {donationList.map((donation) => {
              const progress =
                Math.min((donation.collected / donation.target) * 100, 100);

              return (
                <div key={donation.id} className="group relative">
                  <img
                    alt={donation.imageAlt}
                    src={donation.imageSrc}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-gray-700">
                      <a href={donation.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {donation.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Target: Rp {donation.target.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Collected: Rp {donation.collected.toLocaleString()}
                    </p>

                    {/* Progression Bar */}
                    <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {progress.toFixed(1)}%
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <a
                      href={donation.href}
                      className="inline-block bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition"
                    >
                      Donasi Sekarang
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">© 2024 Bantu Aja Dulu. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
