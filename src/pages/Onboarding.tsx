import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  User,
  MapPin,
  Briefcase,
  Heart,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = usePaxisAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    location: "",
    organization: "",
    experience: "",
    motivation: "",
    preferredLanguage: "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notifications: {
      conflicts: true,
      proposals: true,
      projects: true,
      network: false,
    },
    goals: [] as string[],
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const skillOptions = [
    "Conflict Resolution",
    "Diplomacy",
    "Community Organizing",
    "Technology",
    "Education",
    "Healthcare",
    "Legal",
    "Environmental",
    "Youth Work",
    "Women's Rights",
    "Human Rights",
    "Peacebuilding",
    "Mediation",
    "Research",
    "Writing",
    "Public Speaking",
    "Project Management",
    "Fundraising",
    "Policy Development",
    "Cross-cultural Communication",
  ];

  const interestOptions = [
    "International Relations",
    "Sustainable Development",
    "Climate Change",
    "Social Justice",
    "Cultural Exchange",
    "AI & Technology",
    "Blockchain",
    "Global Governance",
    "Refugee Support",
    "Youth Empowerment",
    "Women's Leadership",
    "Environmental Conservation",
    "Education Access",
    "Healthcare Equity",
    "Economic Development",
    "Cultural Heritage",
    "Religious Dialogue",
    "Trauma Healing",
    "Restorative Justice",
  ];

  const goalOptions = [
    "Prevent Conflicts",
    "Mediate Disputes",
    "Build Communities",
    "Develop Technology for Peace",
    "Create Educational Content",
    "Support Refugees",
    "Advance Women's Rights",
    "Protect Environment",
    "Foster Cultural Understanding",
    "Promote Economic Cooperation",
    "Strengthen Governance",
    "Bridge Digital Divides",
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (user) {
      await updateProfile({
        profile: {
          ...user.profile,
          bio: formData.bio,
          skills: formData.skills,
          interests: formData.interests,
        },
        location: formData.location,
        organization: formData.organization,
        preferences: {
          ...user.preferences,
          language: formData.preferredLanguage,
          timezone: formData.timezone,
        },
      });
    }
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Tell Us About Yourself
              </h2>
              <p className="text-muted-foreground">
                Help us understand your background and experience
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Share a brief description of your background and what brings you to PAXIS..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <Input
                    id="organization"
                    placeholder="Your organization or institution"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        organization: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="experience">Experience in Peacebuilding</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, experience: value }))
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      New to peacebuilding
                    </SelectItem>
                    <SelectItem value="some">
                      Some experience (1-3 years)
                    </SelectItem>
                    <SelectItem value="experienced">
                      Experienced (3-10 years)
                    </SelectItem>
                    <SelectItem value="expert">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Your Skills & Expertise
              </h2>
              <p className="text-muted-foreground">
                Select the skills that best describe your abilities
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((skill) => (
                  <div
                    key={skill}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.skills.includes(skill)
                        ? "border-primary bg-primary/10 peace-glow"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.skills.includes(skill)}
                        readOnly
                      />
                      <span className="text-sm">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>

              {formData.skills.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected skills ({formData.skills.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Your Interests & Passions
              </h2>
              <p className="text-muted-foreground">
                What areas of peace and development inspire you most?
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <div
                    key={interest}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.interests.includes(interest)
                        ? "border-primary bg-primary/10 peace-glow"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interests.includes(interest)}
                        readOnly
                      />
                      <span className="text-sm">{interest}</span>
                    </div>
                  </div>
                ))}
              </div>

              {formData.interests.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected interests ({formData.interests.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Peace Goals</h2>
              <p className="text-muted-foreground">
                What do you hope to achieve through PAXIS?
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="motivation">
                  What motivates your peacebuilding work?
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Share what drives your passion for peace and cooperation..."
                  value={formData.motivation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motivation: e.target.value,
                    }))
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base">Select your primary goals:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {goalOptions.map((goal) => (
                    <div
                      key={goal}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.goals.includes(goal)
                          ? "border-primary bg-primary/10 peace-glow"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleGoalToggle(goal)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={formData.goals.includes(goal)}
                          readOnly
                        />
                        <span className="text-sm font-medium">{goal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Final Setup</h2>
              <p className="text-muted-foreground">
                Configure your preferences and notifications
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        preferredLanguage: value,
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="sw">Kiswahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        timezone: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="text-base mb-4 block">
                  Notification Preferences
                </Label>
                <div className="space-y-4">
                  {[
                    {
                      key: "conflicts",
                      label: "Conflict Alerts",
                      description:
                        "Urgent notifications about conflicts in your areas of interest",
                    },
                    {
                      key: "proposals",
                      label: "DAO Proposals",
                      description:
                        "New governance proposals and voting opportunities",
                    },
                    {
                      key: "projects",
                      label: "Peace Projects",
                      description:
                        "Updates from projects you support or participate in",
                    },
                    {
                      key: "network",
                      label: "Network Activity",
                      description:
                        "Updates from your peace network connections",
                    },
                  ].map(({ key, label, description }) => (
                    <div
                      key={key}
                      className="flex items-start space-x-3 p-4 rounded-lg border"
                    >
                      <Checkbox
                        checked={
                          formData.notifications[
                            key as keyof typeof formData.notifications
                          ]
                        }
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [key]: checked,
                            },
                          }))
                        }
                      />
                      <div>
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-muted-foreground">
                          {description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6">
                <h3 className="font-semibold mb-4">
                  Welcome to the Peace Movement!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You're about to join a global community of peacebuilders
                  working together to transform conflict into cooperation. Your
                  journey toward a more peaceful world starts now.
                </p>
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <CheckCircle className="h-4 w-4" />
                  <span>Everything is ready for your peace journey!</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <div className="peace-gradient w-8 h-8 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">PAXIS</span>
            <Badge variant="outline" className="ml-2">
              Onboarding
            </Badge>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Welcome to PAXIS</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="transition-smooth"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="peace-gradient peace-glow transition-smooth hover:scale-105"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="peace-gradient peace-glow transition-smooth hover:scale-105"
            >
              Complete Onboarding
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
