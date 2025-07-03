import React, { useState } from "react";
import {
  User,
  Bot,
  Sparkles,
  Settings,
  Heart,
  MessageCircle,
  Zap,
  Palette,
  Smile,
  Star,
  Crown,
  Shield,
  Lightbulb,
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Code,
  Globe,
  Rocket,
  Check,
  Plus,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";

interface Personality {
  id: string;
  name: string;
  description: string;
  traits: string[];
  icon: React.ReactNode;
  color: string;
  category: "creative" | "technical" | "social" | "analytical" | "artistic";
}

interface Avatar {
  id: string;
  name: string;
  image: string;
  personality: Personality;
  isAI: boolean;
  isSelected: boolean;
}

const AvatarPersonalityInterface: React.FC = () => {
  const [selectedAI, setSelectedAI] = useState<Avatar | null>(null);
  const [userAvatar, setUserAvatar] = useState<Avatar | null>(null);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [editingPersonality, setEditingPersonality] =
    useState<Personality | null>(null);
  const [customPersonality, setCustomPersonality] = useState({
    name: "",
    description: "",
    traits: [] as string[],
    category: "creative" as Personality["category"],
  });

  const personalities: Personality[] = [
    {
      id: "creative",
      name: "Creative Muse",
      description:
        "Inspirational and artistic, helps with creative projects and brainstorming",
      traits: ["Imaginative", "Artistic", "Inspirational", "Open-minded"],
      icon: <Palette className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      category: "creative",
    },
    {
      id: "technical",
      name: "Tech Expert",
      description:
        "Logical and analytical, perfect for coding and technical discussions",
      traits: ["Logical", "Analytical", "Precise", "Problem-solver"],
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      category: "technical",
    },
    {
      id: "social",
      name: "Social Butterfly",
      description:
        "Friendly and empathetic, great for conversations and emotional support",
      traits: ["Empathetic", "Friendly", "Supportive", "Communicative"],
      icon: <Heart className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      category: "social",
    },
    {
      id: "analytical",
      name: "Data Analyst",
      description:
        "Research-focused and detail-oriented, ideal for analysis and insights",
      traits: ["Detail-oriented", "Research-focused", "Insightful", "Thorough"],
      icon: <Lightbulb className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      category: "analytical",
    },
    {
      id: "artistic",
      name: "Artistic Soul",
      description:
        "Expressive and creative, perfect for artistic and cultural discussions",
      traits: ["Expressive", "Cultural", "Aesthetic", "Passionate"],
      icon: <Camera className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
      category: "artistic",
    },
    {
      id: "musical",
      name: "Music Lover",
      description:
        "Rhythmic and harmonious, great for music and audio discussions",
      traits: ["Rhythmic", "Harmonious", "Melodic", "Expressive"],
      icon: <Music className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500",
      category: "artistic",
    },
    {
      id: "gaming",
      name: "Gaming Enthusiast",
      description:
        "Strategic and competitive, perfect for gaming and strategy discussions",
      traits: ["Strategic", "Competitive", "Quick-thinking", "Fun-loving"],
      icon: <Gamepad2 className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500",
      category: "social",
    },
    {
      id: "scholar",
      name: "Knowledge Seeker",
      description:
        "Wise and learned, ideal for educational and philosophical discussions",
      traits: ["Wise", "Learned", "Philosophical", "Curious"],
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-teal-500 to-cyan-500",
      category: "analytical",
    },
  ];

  const aiAvatars: Avatar[] = [
    {
      id: "ai-1",
      name: "Melks",
      image: "🤖",
      personality: personalities[0], // Creative Muse
      isAI: true,
      isSelected: false,
    },
    {
      id: "ai-2",
      name: "Claude",
      image: "🧠",
      personality: personalities[1], // Tech Expert
      isAI: true,
      isSelected: false,
    },
    {
      id: "ai-3",
      name: "GPT-4",
      image: "📊",
      personality: personalities[3], // Data Analyst
      isAI: true,
      isSelected: false,
    },
    {
      id: "ai-4",
      name: "Sage",
      image: "👁️",
      personality: personalities[7], // Knowledge Seeker
      isAI: true,
      isSelected: false,
    },
    {
      id: "ai-5",
      name: "Harmony",
      image: "🎵",
      personality: personalities[5], // Music Lover
      isAI: true,
      isSelected: false,
    },
    {
      id: "ai-6",
      name: "Pixel",
      image: "🎮",
      personality: personalities[6], // Gaming Enthusiast
      isAI: true,
      isSelected: false,
    },
  ];

  const userAvatars: Avatar[] = [
    {
      id: "user-1",
      name: "Alex",
      image: "👨‍💻",
      personality: personalities[1], // Tech Expert
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-2",
      name: "Sarah",
      image: "🎨",
      personality: personalities[0], // Creative Muse
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-3",
      name: "Mike",
      image: "🏆",
      personality: personalities[6], // Gaming Enthusiast
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-4",
      name: "Emma",
      image: "📚",
      personality: personalities[7], // Knowledge Seeker
      isAI: false,
      isSelected: false,
    },
  ];

  const handleAISelection = (avatar: Avatar) => {
    setSelectedAI(avatar);
    // Update selection state
    aiAvatars.forEach((ai) => (ai.isSelected = ai.id === avatar.id));
  };

  const handleUserSelection = (avatar: Avatar) => {
    setUserAvatar(avatar);
    // Update selection state
    userAvatars.forEach((user) => (user.isSelected = user.id === avatar.id));
  };

  const handlePersonalityEdit = (personality: Personality) => {
    setEditingPersonality(personality);
    setCustomPersonality({
      name: personality.name,
      description: personality.description,
      traits: [...personality.traits],
      category: personality.category,
    });
    setShowPersonalityModal(true);
  };

  const handleSavePersonality = () => {
    if (editingPersonality) {
      // Update the personality
      editingPersonality.name = customPersonality.name;
      editingPersonality.description = customPersonality.description;
      editingPersonality.traits = customPersonality.traits;
      editingPersonality.category = customPersonality.category;
    }
    setShowPersonalityModal(false);
    setEditingPersonality(null);
  };

  const addTrait = () => {
    const trait = prompt("Enter a new trait:");
    if (trait && !customPersonality.traits.includes(trait)) {
      setCustomPersonality((prev) => ({
        ...prev,
        traits: [...prev.traits, trait],
      }));
    }
  };

  const removeTrait = (trait: string) => {
    setCustomPersonality((prev) => ({
      ...prev,
      traits: prev.traits.filter((t) => t !== trait),
    }));
  };

  const getCategoryIcon = (category: Personality["category"]) => {
    switch (category) {
      case "creative":
        return <Palette className="w-4 h-4" />;
      case "technical":
        return <Code className="w-4 h-4" />;
      case "social":
        return <Heart className="w-4 h-4" />;
      case "analytical":
        return <Lightbulb className="w-4 h-4" />;
      case "artistic":
        return <Camera className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Avatar & Personality Selector
          </h1>
          <p className="text-gray-600">
            Choose your AI companion and customize your own avatar and
            personality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Selection Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-600" />
                Choose Your AI Companion
              </h2>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {aiAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  onClick={() => handleAISelection(avatar)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105",
                    selectedAI?.id === avatar.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{avatar.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {avatar.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full bg-gradient-to-r",
                          avatar.personality.color
                        )}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {avatar.personality.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {avatar.personality.description}
                    </p>
                  </div>
                  {selectedAI?.id === avatar.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedAI && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Selected AI: {selectedAI.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full bg-gradient-to-r",
                      selectedAI.personality.color
                    )}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedAI.personality.name}
                  </span>
                  <button
                    onClick={() =>
                      handlePersonalityEdit(selectedAI.personality)
                    }
                    className="p-1 hover:bg-blue-200 rounded transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-blue-600" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedAI.personality.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-6 h-6 text-green-600" />
                Your Avatar & Personality
              </h2>
              <Settings className="w-5 h-5 text-green-500" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  onClick={() => handleUserSelection(avatar)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105",
                    userAvatar?.id === avatar.id
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{avatar.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {avatar.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full bg-gradient-to-r",
                          avatar.personality.color
                        )}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {avatar.personality.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {avatar.personality.description}
                    </p>
                  </div>
                  {userAvatar?.id === avatar.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {userAvatar && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Your Avatar: {userAvatar.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full bg-gradient-to-r",
                      userAvatar.personality.color
                    )}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {userAvatar.personality.name}
                  </span>
                  <button
                    onClick={() =>
                      handlePersonalityEdit(userAvatar.personality)
                    }
                    className="p-1 hover:bg-green-200 rounded transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-green-600" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {userAvatar.personality.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Personalities */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Available Personalities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalities.map((personality) => (
              <div
                key={personality.id}
                className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
                      personality.color
                    )}
                  >
                    {personality.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {personality.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(personality.category)}
                      <span className="text-xs text-gray-500 capitalize">
                        {personality.category}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {personality.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {personality.traits.slice(0, 2).map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                  {personality.traits.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{personality.traits.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Conversation Button */}
        {selectedAI && userAvatar && (
          <div className="mt-8 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto">
              <MessageCircle className="w-5 h-5" />
              Start Conversation with {selectedAI.name}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {userAvatar.name} ({userAvatar.personality.name}) will chat with{" "}
              {selectedAI.name} ({selectedAI.personality.name})
            </p>
          </div>
        )}
      </div>

      {/* Personality Edit Modal */}
      {showPersonalityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Personality
              </h3>
              <button
                onClick={() => setShowPersonalityModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={customPersonality.name}
                  onChange={(e) =>
                    setCustomPersonality((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={customPersonality.description}
                  onChange={(e) =>
                    setCustomPersonality((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={customPersonality.category}
                  onChange={(e) =>
                    setCustomPersonality((prev) => ({
                      ...prev,
                      category: e.target.value as Personality["category"],
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="creative">Creative</option>
                  <option value="technical">Technical</option>
                  <option value="social">Social</option>
                  <option value="analytical">Analytical</option>
                  <option value="artistic">Artistic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Traits
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {customPersonality.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1"
                    >
                      {trait}
                      <button
                        onClick={() => removeTrait(trait)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={addTrait}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Trait
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPersonalityModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePersonality}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPersonalityInterface;
