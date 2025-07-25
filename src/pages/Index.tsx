import { useState } from "react";
import { Header } from "@/components/Header";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { FormsSection } from "@/components/sections/FormsSection";
import { InteractiveSection } from "@/components/sections/InteractiveSection";
import { DataSection } from "@/components/sections/DataSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "forms":
        return <FormsSection />;
      case "interactive":
        return <InteractiveSection />;
      case "data":
        return <DataSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
