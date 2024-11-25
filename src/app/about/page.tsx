import Image from "next/image";
import NavbarAtas from "@/components/ui/navigation-menu";

export default function About() {
    return (
        <div className="h-screen flex flex-col">
            <NavbarAtas />

            {/* Main Content */}
            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        About Us
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Image */}
                        <div className="flex justify-center">
                            <Image
                                src="/aboutcharity.jpg"
                                alt="About Us"
                                width={500}
                                height={500}
                                className="rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Right Column: Text */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-gray-800">Siapa Kita</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Bantu Aja Dulu berdedikasi
                                untuk membina kesejahteraan masyarakat
                            </p>
                            <h3 className="mt-8 text-xl font-semibold text-gray-800">
                                Misi kami                            </h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Untuk menciptakan inisiatif berkelanjutan yang mengatasi masalah-masalah mendesak
                                dalam masyarakat kita, dan menyediakan sumber daya dan peluang untuk
                                mereka yang membutuhkan.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Team Section */}
            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Anggota Team                    </h2>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Team Member 1 */}
                        <div className="text-center">
                            <Image
                                src="/team-member1.jpg"
                                alt="Team Member 1"
                                width={96}
                                height={96}
                                className="mx-auto rounded-full"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                John Doe
                            </h3>
                            <p className="text-sm text-gray-600">Founder & CEO</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="text-center">
                            <Image
                                src="/team-member2.jpg"
                                alt="Team Member 2"
                                width={96}
                                height={96}
                                className="mx-auto rounded-full"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                Jane Smith
                            </h3>
                            <p className="text-sm text-gray-600">Program Director</p>
                        </div>
                        {/* {team meber 3} */}
                        <div className="text-center">
                            <Image
                                src="/team-member2.jpg"
                                alt="Team Member 2"
                                width={96}
                                height={96}
                                className="mx-auto rounded-full"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                Jane Smith
                            </h3>
                            <p className="text-sm text-gray-600">Program Director</p>
                        </div>
                        {/* Team Member 3 */}
                        <div className="text-center">
                            <Image
                                src="/team-member3.jpg"
                                alt="Team Member 3"
                                width={96}
                                height={96}
                                className="mx-auto rounded-full"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                Alex Johnson
                            </h3>
                            <p className="text-sm text-gray-600">Community Manager</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p className="text-sm">© 2024 Bantu Aja Dulu. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
