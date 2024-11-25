import Image from "next/image";
import NavbarAtas from "@/components/ui/navigation-menu";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <NavbarAtas />
            lsit donasi
            <footer className="row-start-3 text-center text-gray-600 text-sm">
                <p>© 2024 Bantu Aja Dulu. All Rights Reserved.</p>

            </footer>
        </div>

    );
}
