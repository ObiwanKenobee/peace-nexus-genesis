import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  getArchetypeDisplayName,
  UserArchetype,
} from "@/contexts/PaxisAuthContext";
import {
  Shield,
  Zap,
  Users,
  Brain,
  Palette,
  Rocket,
  GraduationCap,
  Home,
  DollarSign,
  Bot,
  ArrowRight,
  Globe,
  Heart,
} from "lucide-react";

const archetypeIcons = {
  peace_architect: Shield,
  tech_diplomat: Zap,
  grassroots_peacebuilder: Users,
  conflict_analyst: Brain,
  artist_culture_weaver: Palette,
  peacepreneur: Rocket,
  youth_peacemaker: GraduationCap,
  refugee_displaced: Home,
  funder_validator: DollarSign,
  ai_peace_agent: Bot,
};

const archetypeData = [
  {
    archetype: "peace_architect" as UserArchetype,
    title: "Peace Architects",
    subtitle: "Governments, UN, Policy Labs",
    description:
      "Design systemic solutions for peace treaties, borders, disarmament",
    primaryGoals: [
      "Design peace treaties and frameworks",
      "Coordinate inter-agency initiatives",
      "Develop smart contract ceasefire agreements",
      "Create policy frameworks for sustainable peace",
    ],
    coreTools: [
      "DAO governance tools",
      "Conflict heatmaps",
      "AI scenario simulators",
      "Policy co-writing editor",
    ],
    innovations: [
      "PeaceTreaty Diff tool",
      "Inter-agency interoperable dashboards",
      "Smart Contract-backed ceasefire agreements",
    ],
    examples: [
      "UN Diplomats",
      "Government Officials",
      "Policy Researchers",
      "International Mediators",
    ],
  },
  {
    archetype: "tech_diplomat" as UserArchetype,
    title: "Tech Diplomats",
    subtitle: "DevRel, Engineers for Peace",
    description: "Build peace infrastructure through open-source software",
    primaryGoals: [
      "Develop open-source peace tools",
      "Create blockchain infrastructure",
      "Build API integrations",
      "Foster developer communities",
    ],
    coreTools: [
      "PAXIS SDK / APIs",
      "GitHub integration",
      "Web3 wallets, Ceramic streams",
    ],
    innovations: [
      "Issue bounties tied to PeaceCoin",
      "Governance GitOps (push proposals from PRs)",
      "Zero-knowledge proof modules for conflict-sensitive identities",
    ],
    examples: [
      "Software Engineers",
      "DevRel Specialists",
      "Blockchain Developers",
      "Open Source Maintainers",
    ],
  },
  {
    archetype: "grassroots_peacebuilder" as UserArchetype,
    title: "Grassroots Peacebuilders",
    subtitle: "NGOs, Youth Movements, Community Elders",
    description: "Mediate locally, empower nonviolent change",
    primaryGoals: [
      "Facilitate community dialogue",
      "Mediate local conflicts",
      "Preserve cultural harmony",
      "Empower local peace initiatives",
    ],
    coreTools: [
      "VR empathy training",
      "Localization toolkit (Swahili, Pashto, etc.)",
      "Peace storytelling engine",
    ],
    innovations: [
      "Offline-first mobile dApps",
      "Voice input for non-literate users",
      "Rapid response conflict-tracking dashboards",
    ],
    examples: [
      "Community Leaders",
      "NGO Workers",
      "Religious Leaders",
      "Local Mediators",
    ],
  },
  {
    archetype: "conflict_analyst" as UserArchetype,
    title: "Conflict Analysts",
    subtitle: "Academics, OSINT Researchers, Think Tanks",
    description: "Map conflict patterns, predict risks, advise interventions",
    primaryGoals: [
      "Research conflict patterns",
      "Predict risk escalation",
      "Analyze peace interventions",
      "Provide data-driven insights",
    ],
    coreTools: [
      "Knowledgebase search",
      "Graph analytics (network of hate speech → violence patterns)",
      "AI-powered timeline builders",
    ],
    innovations: [
      "Custom LLMs trained on regional conflict archives",
      '"PeaceGPT" — a research assistant specialized in diplomacy logic',
      "Exportable data for UN SDG reports",
    ],
    examples: [
      "Academic Researchers",
      "Think Tank Analysts",
      "OSINT Specialists",
      "Policy Advisors",
    ],
  },
  {
    archetype: "artist_culture_weaver" as UserArchetype,
    title: "Artists & Culture Weavers",
    subtitle: "Creative Peace Builders",
    description: "Heal trauma, preserve local culture, tell better futures",
    primaryGoals: [
      "Preserve cultural heritage",
      "Heal community trauma",
      "Create peace narratives",
      "Foster cross-cultural understanding",
    ],
    coreTools: [
      "Interactive multimedia archive",
      "Decentralized art NFTs for post-conflict memory",
      "VR exhibitions of peace heritage",
    ],
    innovations: [
      "Culture DAO curation votes",
      'Cross-border "Peace Festivals" built in WebXR',
      "Creative conflict storytelling SDK",
    ],
    examples: [
      "Artists",
      "Storytellers",
      "Cultural Preservationists",
      "Documentary Makers",
    ],
  },
  {
    archetype: "peacepreneur" as UserArchetype,
    title: "Peacepreneurs",
    subtitle: "Social Enterprises, Impact Startups",
    description:
      "Create scalable solutions around water, food, trust, security",
    primaryGoals: [
      "Build sustainable peace businesses",
      "Address resource conflicts",
      "Create economic opportunities",
      "Scale peace innovations",
    ],
    coreTools: [
      "Commons Exchange",
      "PeaceCoin earning engine",
      "Crowdfunding tied to DAO metrics",
    ],
    innovations: [
      "Open-source supply chain tracking",
      "Resource distribution visualizations",
      "Impact reporting dashboards with auto-audit trail",
    ],
    examples: [
      "Social Entrepreneurs",
      "Impact Investors",
      "Sustainability Experts",
      "Supply Chain Innovators",
    ],
  },
  {
    archetype: "youth_peacemaker" as UserArchetype,
    title: "Youth Peacemakers",
    subtitle: "Students, Digital Natives",
    description: "Learn, engage, innovate peace from mobile or VR",
    primaryGoals: [
      "Learn peace-building skills",
      "Engage with global peace community",
      "Innovate new approaches",
      "Lead generational change",
    ],
    coreTools: [
      "Gamified empathy quests",
      "PeaceCoin XP leveling system",
      "Peace Skill Badging",
    ],
    innovations: [
      "TikTok-style micro-stories of real peacebuilders",
      "Roblox-style Peace World sandbox",
      "On-chain leaderboard of local change",
    ],
    examples: [
      "Students",
      "Young Activists",
      "Digital Creators",
      "Peace Educators",
    ],
  },
  {
    archetype: "refugee_displaced" as UserArchetype,
    title: "Refugees & Displaced Peoples",
    subtitle: "Rebuilding Identity & Community",
    description: "Reconnect, rebuild identity, access resources",
    primaryGoals: [
      "Maintain identity and dignity",
      "Access essential resources",
      "Connect with support networks",
      "Rebuild community ties",
    ],
    coreTools: [
      "Self-sovereign ID wallets",
      "Conflict escape route maps",
      "Peer support messaging",
    ],
    innovations: [
      "Offline-capable safe zone alerts",
      "Crypto-to-cash PeaceCoin bridges",
      "Community validator roles for trusted individuals",
    ],
    examples: [
      "Refugees",
      "Internally Displaced",
      "Asylum Seekers",
      "Migration Support Workers",
    ],
  },
  {
    archetype: "funder_validator" as UserArchetype,
    title: "Funders & Validators",
    subtitle: "Philanthropists, Foundations, DAOs",
    description: "Invest in scalable peace solutions",
    primaryGoals: [
      "Fund impactful peace initiatives",
      "Validate project effectiveness",
      "Govern resource allocation",
      "Measure peace ROI",
    ],
    coreTools: [
      "Impact dashboards",
      "DAO proposal voting",
      "Smart fund release contracts",
    ],
    innovations: [
      "Risk-mitigated donation rails",
      "Decentralized due diligence tools",
      '"Peace ROI" forecast engine',
    ],
    examples: [
      "Philanthropists",
      "Foundation Officers",
      "Impact Investors",
      "Grant Managers",
    ],
  },
  {
    archetype: "ai_peace_agent" as UserArchetype,
    title: "AI-Peace Agents",
    subtitle: "Autonomous Assistants & Advisors",
    description: "Co-create peace by augmenting human efforts",
    primaryGoals: [
      "Augment human peace efforts",
      "Facilitate cross-cultural dialogue",
      "Detect bias and mediate",
      "Scale peace interventions",
    ],
    coreTools: [
      "LLM-driven dialogue facilitation",
      "Mediation bots",
      "Bias detectors in group discussions",
    ],
    innovations: [
      "Real-time peace negotiation support",
      "Memory-linked diplomacy chains",
      "Federated AI network across cultures & languages",
    ],
    examples: [
      "AI Researchers",
      "Chatbot Developers",
      "NLP Specialists",
      "Machine Learning Engineers",
    ],
  },
];

export default function Archetypes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Peace Builder Archetypes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your role in the global peace movement. PAXIS supports 10
              distinct archetypes, each with specialized tools, goals, and
              pathways to building positive peace.
            </p>
            <div className="mt-6">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Join PAXIS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Archetypes Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {archetypeData.map((archetype, index) => {
            const Icon = archetypeIcons[archetype.archetype];
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-3 rounded-lg">
                      <Icon className="w-8 h-8 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">
                        {archetype.title}
                      </CardTitle>
                      <Badge variant="outline" className="mb-2">
                        {archetype.subtitle}
                      </Badge>
                      <p className="text-gray-600 text-sm">
                        {archetype.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">
                      Primary Goals
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {archetype.primaryGoals.slice(0, 3).map((goal, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">
                      Core Tools
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {archetype.coreTools.map((tool, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">
                      Innovative Features
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {archetype.innovations
                        .slice(0, 2)
                        .map((innovation, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {innovation}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">
                      Examples
                    </h4>
                    <p className="text-sm text-gray-600">
                      {archetype.examples.join(", ")}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/login"
                      state={{ selectedArchetype: archetype.archetype }}
                    >
                      <Button variant="outline" className="w-full">
                        Join as {getArchetypeDisplayName(archetype.archetype)}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Peace?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of peace builders worldwide using technology to
            create positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Heart className="w-5 h-5 mr-2" />
                Join PAXIS Now
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Learn More About PAXIS
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500">
            <p>PAXIS Platform • Open Source • Decentralized • Peace-Focused</p>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <Link to="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gray-700">
                Terms of Service
              </Link>
              <Link to="/help" className="hover:text-gray-700">
                Help Center
              </Link>
              <Link to="/about" className="hover:text-gray-700">
                About PAXIS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
