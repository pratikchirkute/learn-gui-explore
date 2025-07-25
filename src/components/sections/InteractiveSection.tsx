import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertCircle, CheckCircle, Info, X, Download, Upload, Trash2, Edit, Eye, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const InteractiveSection = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", message: "Profile updated successfully" },
    { id: 2, type: "warning", message: "Storage space is running low" },
    { id: 3, type: "error", message: "Failed to save changes" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleLoadingAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Action completed!");
    }, 3000);
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.info("Notification dismissed");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Interactive Elements</h2>
        <p className="text-muted-foreground">
          Practice with modals, tooltips, dynamic content, and user interactions
        </p>
      </div>

      {/* Buttons with Different Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Interactive Buttons</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Action Buttons</h4>
            <div className="space-y-3">
              <Button onClick={() => toast.success("Save successful!")} id="save-btn" data-testid="save-button">
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="destructive" onClick={() => toast.error("Item deleted!")} id="delete-btn" data-testid="delete-button">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Item
              </Button>
              <Button variant="outline" onClick={() => toast.info("Download started")} id="download-btn" data-testid="download-button">
                <Download className="w-4 h-4 mr-2" />
                Download File
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">State Buttons</h4>
            <div className="space-y-3">
              <Button 
                onClick={handleLoadingAction} 
                disabled={isLoading}
                id="loading-btn" 
                data-testid="loading-button"
              >
                {isLoading ? "Processing..." : "Start Process"}
              </Button>
              <Button variant="gradient" id="gradient-btn" data-testid="gradient-button">
                <Star className="w-4 h-4 mr-2" />
                Premium Action
              </Button>
              <Button variant="ghost" id="ghost-btn" data-testid="ghost-button">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Toggle Buttons</h4>
            <div className="space-y-3">
              <Button variant="outline" id="toggle-1" data-testid="toggle-button-1">
                Toggle Option A
              </Button>
              <Button variant="secondary" id="toggle-2" data-testid="toggle-button-2">
                Toggle Option B
              </Button>
              <Button variant="outline" id="toggle-3" data-testid="toggle-button-3">
                Toggle Option C
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Modals and Dialogs */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Modals & Dialogs</h3>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button id="modal-trigger" data-testid="modal-trigger">Open Modal</Button>
            </DialogTrigger>
            <DialogContent id="modal-content" data-testid="modal-content">
              <DialogHeader>
                <DialogTitle>Confirmation Dialog</DialogTitle>
                <DialogDescription>
                  This is a modal dialog for test automation practice. You can interact with elements inside modals.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Button id="modal-confirm" data-testid="modal-confirm-button">Confirm Action</Button>
                <Button variant="outline" id="modal-cancel" data-testid="modal-cancel-button">Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" id="tooltip-trigger" data-testid="tooltip-trigger">
                  Hover for Tooltip
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a helpful tooltip message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" id="popover-trigger" data-testid="popover-trigger">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" data-testid="popover-content">
              <div className="space-y-2">
                <h4 className="font-medium">Popover Content</h4>
                <p className="text-sm text-muted-foreground">
                  This popover contains interactive elements for testing.
                </p>
                <Button size="sm" id="popover-action" data-testid="popover-action">Take Action</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {/* Tabs and Accordions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Tabs Navigation</h3>
          <Tabs defaultValue="tab1" id="main-tabs" data-testid="main-tabs">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1" id="tab-1" data-testid="tab-1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2" id="tab-2" data-testid="tab-2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3" id="tab-3" data-testid="tab-3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4" data-testid="tab-1-content">
              <div className="space-y-2">
                <h4 className="font-semibold">Tab 1 Content</h4>
                <p className="text-muted-foreground">This is the content of the first tab.</p>
                <Button size="sm" id="tab1-action" data-testid="tab1-action">Tab 1 Action</Button>
              </div>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4" data-testid="tab-2-content">
              <div className="space-y-2">
                <h4 className="font-semibold">Tab 2 Content</h4>
                <p className="text-muted-foreground">This is the content of the second tab.</p>
                <Button size="sm" variant="outline" id="tab2-action" data-testid="tab2-action">Tab 2 Action</Button>
              </div>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4" data-testid="tab-3-content">
              <div className="space-y-2">
                <h4 className="font-semibold">Tab 3 Content</h4>
                <p className="text-muted-foreground">This is the content of the third tab.</p>
                <Button size="sm" variant="secondary" id="tab3-action" data-testid="tab3-action">Tab 3 Action</Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Accordion Panels</h3>
          <Accordion type="single" collapsible className="w-full" data-testid="accordion">
            <AccordionItem value="item-1" data-testid="accordion-item-1">
              <AccordionTrigger id="accordion-trigger-1" data-testid="accordion-trigger-1">
                Section 1: Basic Information
              </AccordionTrigger>
              <AccordionContent data-testid="accordion-content-1">
                <p className="text-muted-foreground mb-2">This section contains basic information.</p>
                <Button size="sm" id="accordion-action-1" data-testid="accordion-action-1">Action 1</Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" data-testid="accordion-item-2">
              <AccordionTrigger id="accordion-trigger-2" data-testid="accordion-trigger-2">
                Section 2: Advanced Settings
              </AccordionTrigger>
              <AccordionContent data-testid="accordion-content-2">
                <p className="text-muted-foreground mb-2">Advanced configuration options are here.</p>
                <Button size="sm" variant="outline" id="accordion-action-2" data-testid="accordion-action-2">Action 2</Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" data-testid="accordion-item-3">
              <AccordionTrigger id="accordion-trigger-3" data-testid="accordion-trigger-3">
                Section 3: Help & Support
              </AccordionTrigger>
              <AccordionContent data-testid="accordion-content-3">
                <p className="text-muted-foreground mb-2">Get help and support information.</p>
                <Button size="sm" variant="secondary" id="accordion-action-3" data-testid="accordion-action-3">Action 3</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>

      {/* Progress and Loading States */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Progress & Loading States</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Upload Progress</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" id="progress-bar" data-testid="progress-bar" />
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => setProgress(0)} 
              variant="outline" 
              id="reset-progress" 
              data-testid="reset-progress"
            >
              Reset Progress
            </Button>
            <Button 
              onClick={() => setProgress(100)} 
              variant="outline" 
              id="complete-progress" 
              data-testid="complete-progress"
            >
              Complete Progress
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications and Alerts */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Notifications & Alerts</h3>
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button onClick={() => toast.success("Success message!")} size="sm" id="success-toast" data-testid="success-toast">
              Success Toast
            </Button>
            <Button onClick={() => toast.error("Error message!")} size="sm" variant="destructive" id="error-toast" data-testid="error-toast">
              Error Toast
            </Button>
            <Button onClick={() => toast.info("Info message!")} size="sm" variant="outline" id="info-toast" data-testid="info-toast">
              Info Toast
            </Button>
            <Button onClick={() => toast.warning("Warning message!")} size="sm" variant="warning" id="warning-toast" data-testid="warning-toast">
              Warning Toast
            </Button>
          </div>

          <div className="space-y-3">
            <Alert id="info-alert" data-testid="info-alert">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert for testing purposes.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive" id="error-alert" data-testid="error-alert">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is an error alert that requires attention.
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Dismissible Notifications</h4>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                id={`notification-${notification.id}`}
                data-testid={`notification-${notification.id}`}
              >
                <div className="flex items-center gap-2">
                  {notification.type === "success" && <CheckCircle className="w-4 h-4 text-success" />}
                  {notification.type === "warning" && <AlertCircle className="w-4 h-4 text-warning" />}
                  {notification.type === "error" && <X className="w-4 h-4 text-destructive" />}
                  <span className="text-sm">{notification.message}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dismissNotification(notification.id)}
                  id={`dismiss-${notification.id}`}
                  data-testid={`dismiss-${notification.id}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};