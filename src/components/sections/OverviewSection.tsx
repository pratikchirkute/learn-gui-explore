import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Globe, Target } from "lucide-react";

export const OverviewSection = () => {
  const features = [
    {
      icon: Target,
      title: "Element Locators",
      description: "All elements have unique IDs, classes, and data attributes for easy targeting",
    },
    {
      icon: Code,
      title: "Real-world Examples",
      description: "Practice with forms, buttons, tables, and complex UI components",
    },
    {
      icon: Globe,
      title: "Cross-browser Testing",
      description: "Test automation techniques that work across different browsers",
    },
  ];

  const tools = [
    "Selenium WebDriver",
    "Playwright",
    "Cypress",
    "TestCafe",
    "Puppeteer",
    "WebdriverIO",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Welcome to Test Automation Playground</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master browser automation by practicing with a comprehensive collection of GUI elements. 
          Perfect for learning Selenium, Playwright, Cypress, and other testing frameworks.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow" id={`feature-${index}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Compatible Testing Tools</h3>
          <p className="text-muted-foreground">
            This playground works with all popular browser automation frameworks:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
                id={`tool-${tool.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-success" />
                {tool}
              </Badge>
            ))}
          </div>
          <div className="pt-4">
            <Button variant="gradient" size="lg" id="get-started-btn">
              Get Started with Form Elements
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Quick Tips for Test Automation</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Element Identification:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Use unique <code className="bg-muted px-1 rounded">id</code> attributes when available</li>
              <li>• Leverage <code className="bg-muted px-1 rounded">data-testid</code> attributes for testing</li>
              <li>• CSS selectors for styling-based selection</li>
              <li>• XPath for complex element relationships</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Best Practices:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Wait for elements to be visible/interactive</li>
              <li>• Use explicit waits over implicit waits</li>
              <li>• Handle dynamic content properly</li>
              <li>• Test across different viewport sizes</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};