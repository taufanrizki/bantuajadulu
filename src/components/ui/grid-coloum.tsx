import React from "react";
import Image from "next/image"; // Assuming you're using Next.js for image optimization

const Donasi = () => {
    return (
        <section className="w-full">
            <h3 className="text-xl font-bold mb-4">Donasi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="container mx-auto p-4">
                    <div className="border rounded-lg shadow-md p-4 text-center">
                        <Image
                            src="/1.jpg"
                            alt="Picture of the author"
                            width={500}
                            height={500}
                        />
                        <h4 className="mt-4 text-lg font-bold text-gray-800">Pendidikan Anak Yatim</h4>
                        <p className="text-gray-600 mt-2">Target: Rp 50.000.000</p>
                        <a
                            href="/donate"
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Donasi Sekarang
                        </a>
                    </div>
                </div>
                <div className="container mx-auto p-4">
                    <div className="border rounded-lg shadow-md p-4 text-center">
                        <Image
                            src="/1.jpg"
                            alt="Picture of the author"
                            width={500}
                            height={500}
                        />
                        <h4 className="mt-4 text-lg font-bold text-gray-800">Bantuan Bencana Alam</h4>
                        <p className="text-gray-600 mt-2">Target: Rp 100.000.000</p>
                        <a
                            href="/donate"
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Donasi Sekarang
                        </a>
                    </div>
                </div>
                <div className="container mx-auto p-4">
                    <div className="border rounded-lg shadow-md p-4 text-center">
                        <Image
                            src="/1.jpg"
                            alt="Picture of the author"
                            width={500}
                            height={500}
                        />
                        <h4 className="mt-4 text-lg font-bold text-gray-800">Program Pangan Sehat</h4>
                        <p className="text-gray-600 mt-2">Target: Rp 30.000.000</p>
                        <a
                            href="/donate"
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Donasi Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donasi;
