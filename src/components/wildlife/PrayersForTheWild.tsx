import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  Sun,
  Moon,
  CloudRain,
  TreePine,
  Bird,
  Fish,
  Rabbit,
  Flower,
  Mountain,
  Waves,
  Wind,
  Sunrise,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Droplets,
  Thermometer,
  Play,
  Pause,
  Volume2,
  Share,
  BookOpen,
  Send,
  Smartphone,
  Bell,
} from "lucide-react";

const dailyPrayers = [
  {
    id: 1,
    timeOfDay: "Dawn",
    icon: Sunrise,
    species: "African Elephants",
    location: "Amboseli National Park, Kenya",
    urgency: "High",
    situation: "Severe drought affecting water sources",
    prayer:
      "As the sun rises over Amboseli, we lift our hearts for the elephant families gathering at the last waterhole. Great Creator, who provides streams in the desert, send rain to this sacred land. Let the matriarch Nalani's wisdom guide her family through these dry times, as she has for 60 years. May their ancient paths to water remain open, and may human hearts be moved to protect these sacred wells.",
    scripture:
      "He turns the wilderness into pools of water and dry ground into flowing springs. - Psalm 107:35",
    action: "Support emergency water trucking to Amboseli",
    backgroundGradient: "from-orange-400 via-pink-400 to-purple-400",
    secondaryColor: "orange",
    peaceCoins: 50,
    urgencyLevel: 85,
  },
  {
    id: 2,
    timeOfDay: "Midday",
    icon: Sun,
    species: "Monarch Butterflies",
    location: "Texas Migration Corridor",
    urgency: "Medium",
    situation: "Milkweed shortage along migration route",
    prayer:
      "Under the blazing midday sun, millions of delicate wings carry ancient wisdom southward. Divine Gardener, who clothes the lilies more beautifully than Solomon, bless the Monarchs' journey. As they dance on invisible currents, may roadside flowers bloom in abundance. Inspire gardeners across Texas to plant milkweed sanctuaries. Let these messengers of transformation remind us that even the smallest among us carry the power to change the world.",
    scripture:
      "Consider how the wild flowers grow. They do not labor or spin. Yet I tell you, not even Solomon in all his splendor was dressed like one of these. - Luke 12:27",
    action: "Plant native milkweed in your area",
    backgroundGradient: "from-yellow-400 via-orange-400 to-red-400",
    secondaryColor: "yellow",
    peaceCoins: 30,
    urgencyLevel: 60,
  },
  {
    id: 3,
    timeOfDay: "Evening",
    icon: Moon,
    species: "Snow Leopards",
    location: "Himalayan Mountains, Nepal",
    urgency: "Critical",
    situation: "Human-wildlife conflict increasing",
    prayer:
      "As twilight paints the high peaks purple, the ghost of the mountains begins her hunt. Sacred Guardian of the Heights, we pray for the snow leopard mothers teaching their cubs the ancient ways. The herders below struggle for survival too - grant wisdom for sharing these holy mountains. May the monasteries' prayers rise with the evening mist, blessing both human and leopard families with abundance and understanding.",
    scripture:
      "The Lord makes my feet like the feet of a deer; he causes me to stand on the heights. - 2 Samuel 22:34",
    action: "Support herder insurance programs in Nepal",
    backgroundGradient: "from-blue-600 via-purple-600 to-indigo-800",
    secondaryColor: "blue",
    peaceCoins: 75,
    urgencyLevel: 95,
  },
  {
    id: 4,
    timeOfDay: "Night",
    icon: Moon,
    species: "Sea Turtles",
    location: "Costa Rica Beaches",
    urgency: "Medium",
    situation: "Light pollution affecting nesting",
    prayer:
      "Under the gentle moonlight, ancient mariners return to their birth shores to nest. Creator of the Tides, who set the moon to govern the night, guide these mothers safely to shore. Darken the coastal lights that confuse their navigation, and brighten human hearts to their sacred journey. For 100 million years they have trusted this dance with moon and tide - may we be worthy guardians of their continued pilgrimage.",
    scripture:
      "The moon marks off the seasons, and the sun knows when to go down. - Psalm 104:19",
    action: "Support turtle-friendly lighting initiatives",
    backgroundGradient: "from-indigo-800 via-blue-900 to-black",
    secondaryColor: "indigo",
    peaceCoins: 40,
    urgencyLevel: 70,
  },
];

const specialOccasions = [
  {
    id: 1,
    occasion: "World Wildlife Day",
    date: "March 3rd",
    globalPrayer:
      "On this day, all faiths unite in prayer for our animal brothers and sisters. From mosque to temple, church to sacred grove, may our voices rise as one for the protection of all creation.",
    participatingFaiths: [
      "Christianity",
      "Islam",
      "Judaism",
      "Buddhism",
      "Hinduism",
      "Indigenous",
    ],
    expectedParticipants: 2500000,
    languages: 67,
  },
  {
    id: 2,
    occasion: "Earth Day",
    date: "April 22nd",
    globalPrayer:
      "Mother Earth, forgive us our trespasses against your creatures. Grant us wisdom to live in harmony with all beings, as indigenous peoples have taught for millennia.",
    participatingFaiths: [
      "All Faiths",
      "Interfaith Alliance",
      "Indigenous Elders",
    ],
    expectedParticipants: 5000000,
    languages: 89,
  },
  {
    id: 3,
    occasion: "Migration Season Blessing",
    date: "Seasonal",
    globalPrayer:
      "Bless the great migrations - caribou across tundra, whales through ancient seas, birds across continents. May their ancient pathways remain open and safe.",
    participatingFaiths: [
      "Arctic Indigenous",
      "Coastal Communities",
      "Bird Watching Groups",
    ],
    expectedParticipants: 750000,
    languages: 23,
  },
];

const personalizedPrayers = [
  {
    userProfile: "Urban Christian",
    prayerFocus: "City Wildlife",
    todaysPrayer:
      "Creator God, even in concrete jungles, you provide habitats for urban hawks, city foxes, and rooftop bees. Help me see your creation in every sparrow at the bus stop and every tree that houses a nest.",
    actionSuggestion: "Create a pollinator garden on your balcony",
  },
  {
    userProfile: "Muslim Nature Lover",
    prayerFocus: "Ocean Conservation",
    todaysPrayer:
      "Allah, who created all living things from water, protect the vast oceans and all who dwell within them. Guide us to be merciful stewards of the seas, following the example of Prophet Muhammad (PBUH).",
    actionSuggestion: "Join a beach cleanup during Ramadan",
  },
  {
    userProfile: "Buddhist Practitioner",
    prayerFocus: "Insect Protection",
    todaysPrayer:
      "May all sentient beings be free from suffering, from the smallest ant to the largest whale. May our practice of compassion extend to the billions of insects who pollinate our world.",
    actionSuggestion: "Practice mindful gardening without pesticides",
  },
];

const emergencyPrayers = [
  {
    id: 1,
    urgency: "CRITICAL",
    species: "Coral Reefs - Great Barrier Reef",
    situation: "Mass bleaching event in progress",
    prayer:
      "Divine Creator of the Rainbow Reef, we cry out as your underwater gardens burn with fever. Cool the waters with your healing touch. Restore the coral colonies that shelter countless fish families. Let this crisis awaken humanity to protect all ocean sanctuaries.",
    immediateAction: "Donate to coral restoration projects",
    peaceCoins: 100,
    timeRemaining: "72 hours",
  },
  {
    id: 2,
    urgency: "HIGH",
    species: "Sumatran Orangutans",
    situation: "Palm oil plantation expanding into protected forest",
    prayer:
      "Ancient Forest Guardian, protect the red apes swinging through your cathedral canopy. Their wise eyes reflect millions of years of jungle wisdom. Stop the chainsaws with your mighty wind, and inspire alternative livelihoods for forest communities.",
    immediateAction: "Boycott unsustainable palm oil products",
    peaceCoins: 75,
    timeRemaining: "1 week",
  },
];

export default function PrayersForTheWild() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPrayer, setSelectedPrayer] = useState(0);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [userNotifications, setUserNotifications] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentPrayer = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return dailyPrayers[0]; // Dawn
    if (hour >= 12 && hour < 17) return dailyPrayers[1]; // Midday
    if (hour >= 17 && hour < 22) return dailyPrayers[2]; // Evening
    return dailyPrayers[3]; // Night
  };

  const currentPrayer = getCurrentPrayer();

  const handlePrayerComplete = (peaceCoins: number) => {
    console.log(`Earned ${peaceCoins} PeaceCoins for spiritual reflection`);
  };

  const handleEmergencyPrayer = (species: string, coins: number) => {
    console.log(`Emergency prayer for ${species} - Earned ${coins} PeaceCoins`);
  };

  const handleSharePrayer = (prayer: string) => {
    console.log(`Sharing prayer: ${prayer}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Prayers for the Wild</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          AI-generated spiritual messages guided by real-time wildlife data and
          sacred wisdom from all traditions
        </p>
      </div>

      {/* Current Time & Prayer */}
      <Card
        className={`bg-gradient-to-r ${currentPrayer.backgroundGradient} text-white`}
      >
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <currentPrayer.icon className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {currentPrayer.timeOfDay} Prayer
                </h2>
                <p className="opacity-90">{currentTime.toLocaleTimeString()}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={`border-white text-white ${
                currentPrayer.urgency === "Critical"
                  ? "bg-red-500/20"
                  : currentPrayer.urgency === "High"
                    ? "bg-orange-500/20"
                    : "bg-blue-500/20"
              }`}
            >
              {currentPrayer.urgency} Need
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                For the {currentPrayer.species}
              </h3>
              <div className="flex items-center space-x-2 mb-4 opacity-90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{currentPrayer.location}</span>
              </div>

              <div className="bg-black/20 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Current Situation:</p>
                <p className="text-sm">{currentPrayer.situation}</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Urgency Level</span>
                  <span>{currentPrayer.urgencyLevel}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${currentPrayer.urgencyLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg mb-4">
                <p className="text-lg leading-relaxed mb-4">
                  {currentPrayer.prayer}
                </p>
                <div className="bg-white/20 p-3 rounded-lg">
                  <p className="text-sm italic">"{currentPrayer.scripture}"</p>
                </div>
              </div>

              <div className="bg-yellow-400/20 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Suggested Action:</p>
                <p className="text-sm">{currentPrayer.action}</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => handlePrayerComplete(currentPrayer.peaceCoins)}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Complete Prayer • {currentPrayer.peaceCoins} PC
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={() => handleSharePrayer(currentPrayer.prayer)}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Prayers */}
      {emergencyPrayers.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="w-6 h-6" />
              <span>Emergency Prayer Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyPrayers.map((emergency) => (
                <div
                  key={emergency.id}
                  className="p-4 border border-red-200 rounded-lg bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-red-800">
                        {emergency.species}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {emergency.situation}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">{emergency.urgency}</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {emergency.timeRemaining} remaining
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg mb-3">
                    <p className="text-sm text-red-800">{emergency.prayer}</p>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                    <p className="text-sm">
                      <strong>Immediate Action:</strong>{" "}
                      {emergency.immediateAction}
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      handleEmergencyPrayer(
                        emergency.species,
                        emergency.peaceCoins,
                      )
                    }
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Emergency Prayer • {emergency.peaceCoins} PC
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prayer Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-purple-600" />
            <span>Daily Prayer Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyPrayers.map((prayer, index) => {
              const Icon = prayer.icon;
              const isCurrentPrayer = prayer.id === currentPrayer.id;

              return (
                <div
                  key={prayer.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    isCurrentPrayer
                      ? "border-purple-300 bg-purple-50 shadow-md"
                      : "hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedPrayer(index)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon
                      className={`w-6 h-6 ${isCurrentPrayer ? "text-purple-600" : "text-gray-600"}`}
                    />
                    <Badge variant={isCurrentPrayer ? "default" : "outline"}>
                      {prayer.urgency}
                    </Badge>
                  </div>

                  <h4 className="font-semibold mb-1">{prayer.timeOfDay}</h4>
                  <p className="text-sm text-gray-600 mb-2">{prayer.species}</p>
                  <p className="text-xs text-gray-500">{prayer.location}</p>

                  {isCurrentPrayer && (
                    <div className="mt-3 pt-3 border-t">
                      <Button
                        size="sm"
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Pray Now
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Special Occasions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-green-600" />
            <span>Special Occasion Prayers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {specialOccasions.map((occasion) => (
              <div
                key={occasion.id}
                className="p-6 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {occasion.occasion}
                    </h3>
                    <p className="text-gray-600">{occasion.date}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {occasion.expectedParticipants.toLocaleString()} expected
                    </p>
                    <p>{occasion.languages} languages</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-gray-800 italic">
                    "{occasion.globalPrayer}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {occasion.participatingFaiths.map((faith, index) => (
                    <Badge key={index} variant="outline">
                      {faith}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Prayers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-600" />
            <span>Personalized Spiritual Guidance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalizedPrayers.map((personal, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50"
              >
                <h4 className="font-semibold mb-2">{personal.userProfile}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Focus: {personal.prayerFocus}
                </p>

                <div className="bg-white p-3 rounded-lg mb-3">
                  <p className="text-sm italic text-gray-800">
                    {personal.todaysPrayer}
                  </p>
                </div>

                <div className="bg-yellow-100 p-3 rounded-lg mb-3">
                  <p className="text-sm">
                    <strong>Suggested Action:</strong>{" "}
                    {personal.actionSuggestion}
                  </p>
                </div>

                <Button size="sm" className="w-full" variant="outline">
                  <Heart className="w-3 h-3 mr-1" />
                  Personalize My Prayers
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ambient Sounds & Meditation */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Sacred Soundscape</h3>
              <p className="text-gray-700 mb-4">
                Meditate with live sounds from the wild places you're praying
                for
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>🐘 Elephant rumbles from Amboseli</span>
                <span>🌊 Ocean waves from turtle beaches</span>
                <span>🦅 Mountain winds from snow leopard territory</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsPlayingAmbient(!isPlayingAmbient)}
              >
                {isPlayingAmbient ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isPlayingAmbient ? "Pause" : "Listen"}
              </Button>
              <Button>
                <Volume2 className="w-4 h-4 mr-2" />
                Sacred Meditation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-blue-600" />
            <span>Prayer Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Daily Prayer Reminders</h4>
                <p className="text-sm text-gray-600">
                  Receive notifications for dawn, midday, evening, and night
                  prayers
                </p>
              </div>
              <Button
                variant={userNotifications ? "default" : "outline"}
                onClick={() => setUserNotifications(!userNotifications)}
              >
                {userNotifications ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Emergency Prayer Alerts</h4>
                <p className="text-sm text-gray-600">
                  Get notified when wildlife faces critical emergencies
                </p>
              </div>
              <Button variant="outline">
                <Smartphone className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Weekly Reflection Digest</h4>
                <p className="text-sm text-gray-600">
                  Summary of your prayers and their impact on conservation
                </p>
              </div>
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
