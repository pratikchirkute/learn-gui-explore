import { Button } from "@/components/ui/button";
import { Monitor, Code, TestTube } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "overview", label: "Overview", icon: Monitor },
  { id: "forms", label: "Form Elements", icon: Code },
  { id: "interactive", label: "Interactive Elements", icon: TestTube },
  { id: "data", label: "Data Display", icon: Monitor },
];

export const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <TestTube className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Test Automation Playground</h1>
              <p className="text-muted-foreground text-sm">Practice browser automation with various GUI elements</p>
            </div>
          </div>
        </div>
        
        <nav className="flex gap-2 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                onClick={() => onSectionChange(section.id)}
                className="flex items-center gap-2 whitespace-nowrap"
                id={`nav-${section.id}`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};