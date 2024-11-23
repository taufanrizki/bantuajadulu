import Image from "next/image";
import NavbarAtas from "@/components/ui/navigation-menu";
import Hero from "@/components/ui/hero";
import Grid from "@/components/ui/grid-coloum"

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <NavbarAtas />
            lsit donasi
            <footer className="row-start-3 text-center text-gray-600 text-sm">
                <p>© 2024 Website Donasi Online. All Rights Reserved.</p>

            </footer>
        </div>

    );
}
