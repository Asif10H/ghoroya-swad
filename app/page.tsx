import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { MenuExplorer } from "@/components/MenuExplorer";
import { Footer } from "@/components/Footer";
import { CATEGORIES } from "@/data/menuData";

export default function HomePage() {
  const totalCount = CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);
  const snacksCount = CATEGORIES.find((c) => c.id === 'snacks')?.items.length || 0;
  const drinksCount = CATEGORIES.find((c) => c.id === 'drinks')?.items.length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--tone-strong)] selection:bg-[var(--tone-strong)] selection:text-[var(--bg-base)]">
      <Header />
      <main className="flex-1">
        <Hero
          totalCount={totalCount}
          snacksCount={snacksCount}
          drinksCount={drinksCount}
        />
        <Statement />
        <MenuExplorer />
      </main>
      <Footer />
    </div>
  );
}
