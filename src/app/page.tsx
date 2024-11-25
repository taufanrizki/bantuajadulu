import Image from "next/image";
import NavbarAtas from "@/components/ui/navigation-menu";
import Hero from "@/components/ui/hero";
import Grid from "@/components/ui/grid-coloum"

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <NavbarAtas />
      <Hero />
      <Grid />
      <footer className="row-start-3 text-center text-gray-600 text-sm">
        <p>© 2024 Bantu Aja Dulu. All Rights Reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>

  );
}
