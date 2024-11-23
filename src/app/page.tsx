import Image from "next/image";
import NavbarAtas from "@/components/ui/navigation-menu";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <NavbarAtas />
      <Hero />
    </div>
  );
}
