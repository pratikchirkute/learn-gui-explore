import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";

export const FormsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    country: "",
    bio: "",
    newsletter: false,
    theme: "",
    notifications: false,
    volume: [50],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Form submitted successfully!");
    console.log("Form data:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      country: "",
      bio: "",
      newsletter: false,
      theme: "",
      notifications: false,
      volume: [50],
    });
    toast.info("Form reset");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Form Elements</h2>
        <p className="text-muted-foreground">
          Practice automation with various form inputs, validations, and interactions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Form Inputs */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Basic Input Fields</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-input">Full Name *</Label>
              <Input
                id="name-input"
                data-testid="name-field"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-input">Email Address *</Label>
              <Input
                id="email-input"
                data-testid="email-field"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-input">Password *</Label>
              <Input
                id="password-input"
                data-testid="password-field"
                type="password"
                placeholder="Enter secure password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age-input">Age</Label>
              <Input
                id="age-input"
                data-testid="age-field"
                type="number"
                placeholder="25"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country-select">Country</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger id="country-select" data-testid="country-select">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us" data-testid="country-us">United States</SelectItem>
                  <SelectItem value="uk" data-testid="country-uk">United Kingdom</SelectItem>
                  <SelectItem value="ca" data-testid="country-ca">Canada</SelectItem>
                  <SelectItem value="au" data-testid="country-au">Australia</SelectItem>
                  <SelectItem value="de" data-testid="country-de">Germany</SelectItem>
                  <SelectItem value="fr" data-testid="country-fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio-textarea">Bio</Label>
              <Textarea
                id="bio-textarea"
                data-testid="bio-field"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" id="submit-btn" data-testid="submit-button">
                Submit Form
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                id="reset-btn"
                data-testid="reset-button"
              >
                Reset Form
              </Button>
            </div>
          </form>
        </Card>

        {/* Advanced Form Controls */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Advanced Controls</h3>
          <div className="space-y-6">
            {/* Checkboxes */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Preferences</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter-checkbox" 
                  data-testid="newsletter-checkbox"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
                />
                <Label htmlFor="newsletter-checkbox">Subscribe to newsletter</Label>
              </div>
            </div>

            {/* Radio Buttons */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Theme Preference</Label>
              <RadioGroup 
                value={formData.theme} 
                onValueChange={(value) => setFormData({ ...formData, theme: value })}
                data-testid="theme-radio-group"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" data-testid="theme-light" />
                  <Label htmlFor="theme-light">Light Theme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" data-testid="theme-dark" />
                  <Label htmlFor="theme-dark">Dark Theme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="theme-auto" data-testid="theme-auto" />
                  <Label htmlFor="theme-auto">Auto (System)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Switch */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Notifications</Label>
              <div className="flex items-center space-x-3">
                <Switch
                  id="notifications-switch"
                  data-testid="notifications-switch"
                  checked={formData.notifications}
                  onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
                />
                <Label htmlFor="notifications-switch">Enable push notifications</Label>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Volume: {formData.volume[0]}%</Label>
              <Slider
                value={formData.volume}
                onValueChange={(value) => setFormData({ ...formData, volume: value })}
                max={100}
                step={1}
                className="w-full"
                data-testid="volume-slider"
                id="volume-slider"
              />
            </div>

            {/* File Input */}
            <div className="space-y-3">
              <Label htmlFor="file-upload" className="text-base font-semibold">Profile Picture</Label>
              <Input
                id="file-upload"
                data-testid="file-upload"
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
            </div>

            {/* Date Input */}
            <div className="space-y-3">
              <Label htmlFor="birth-date" className="text-base font-semibold">Date of Birth</Label>
              <Input
                id="birth-date"
                data-testid="birth-date"
                type="date"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Form States */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Form States & Validation</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Disabled Elements</h4>
            <div className="space-y-3">
              <Input disabled placeholder="Disabled input" id="disabled-input" data-testid="disabled-input" />
              <Button disabled id="disabled-button" data-testid="disabled-button">Disabled Button</Button>
              <Checkbox disabled id="disabled-checkbox" data-testid="disabled-checkbox" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Required Fields</h4>
            <div className="space-y-3">
              <Input required placeholder="Required field *" id="required-input" data-testid="required-input" />
              <Select required>
                <SelectTrigger id="required-select" data-testid="required-select">
                  <SelectValue placeholder="Required selection *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Read-only Elements</h4>
            <div className="space-y-3">
              <Input readOnly value="Read-only value" id="readonly-input" data-testid="readonly-input" />
              <Textarea readOnly value="This text cannot be edited" id="readonly-textarea" data-testid="readonly-textarea" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};