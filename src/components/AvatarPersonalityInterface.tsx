import React, { useState, useEffect } from "react";
import {
  User,
  Bot,
  Heart,
  MessageCircle,
  Palette,
  Star,
  Lightbulb,
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Code,
  Check,
  Plus,
  Edit3,
  Save,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "../lib/utils";

interface Personality {
  id: string;
  name: string;
  description: string;
  traits: string[];
  icon: string;
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
  productDescription?: string;
}

const AvatarPersonalityInterface: React.FC = () => {
  const [selectedAI, setSelectedAI] = useState<Avatar | null>(null);
  const [userAvatar, setUserAvatar] = useState<Avatar | null>(null);
  const [selectedPersonality, setSelectedPersonality] =
    useState<Personality | null>(null);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [editingPersonality, setEditingPersonality] =
    useState<Personality | null>(null);
  const [customPersonality, setCustomPersonality] = useState({
    name: "",
    description: "",
    category: "creative" as Personality["category"],
  });
  const [showConversation, setShowConversation] = useState(false);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showAIDropdown, setShowAIDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showPersonalityDropdown, setShowPersonalityDropdown] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setShowAIDropdown(false);
        setShowUserDropdown(false);
        setShowPersonalityDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const personalities: Personality[] = [
    {
      id: "extroverted",
      name: "Extroverted",
      description:
        "Outgoing and sociable, loves conversation and being around people",
      traits: ["Sociable", "Energetic", "Talkative", "Friendly"],
      icon: "😊",
      color: "from-yellow-500 to-orange-500",
      category: "social",
    },
    {
      id: "introverted",
      name: "Introverted",
      description:
        "Thoughtful and reserved, prefers deep conversations and quiet reflection",
      traits: ["Thoughtful", "Reserved", "Deep", "Reflective"],
      icon: "🤔",
      color: "from-blue-500 to-indigo-500",
      category: "social",
    },
    {
      id: "optimistic",
      name: "Optimistic",
      description:
        "Positive and hopeful, always sees the bright side of situations",
      traits: ["Positive", "Hopeful", "Cheerful", "Encouraging"],
      icon: "☀️",
      color: "from-yellow-400 to-orange-400",
      category: "social",
    },
    {
      id: "practical",
      name: "Practical",
      description:
        "Down-to-earth and realistic, focuses on what works and gets things done",
      traits: ["Realistic", "Efficient", "Pragmatic", "Reliable"],
      icon: "⚡",
      color: "from-gray-600 to-gray-800",
      category: "analytical",
    },
    {
      id: "empathetic",
      name: "Empathetic",
      description:
        "Understanding and caring, deeply feels and connects with others' emotions",
      traits: ["Caring", "Understanding", "Compassionate", "Supportive"],
      icon: "💝",
      color: "from-pink-500 to-rose-500",
      category: "social",
    },
  ];

  const aiAvatars: Avatar[] = [
    {
      id: "ai-2",
      name: "Claude",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop&crop=face",
      personality: personalities[1], // Introverted
      isAI: true,
      isSelected: false,
      productDescription:
        "Sophisticated language model focused on safety and helpfulness in technical discussions",
    },
    {
      id: "ai-3",
      name: "GPT-4",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop&crop=face",
      personality: personalities[2], // Optimistic
      isAI: true,
      isSelected: false,
      productDescription:
        "Powerful multimodal AI model with advanced reasoning and analysis capabilities",
    },
    {
      id: "ai-4",
      name: "Gemini",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop&crop=face",
      personality: personalities[4], // Empathetic
      isAI: true,
      isSelected: false,
      productDescription:
        "Google's most capable AI model with deep knowledge and research capabilities",
    },
    {
      id: "ai-5",
      name: "Copilot",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop&crop=face",
      personality: personalities[3], // Practical
      isAI: true,
      isSelected: false,
      productDescription:
        "AI-powered coding assistant that helps developers write better code faster",
    },
    {
      id: "ai-6",
      name: "Llama",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop&crop=face",
      personality: personalities[0], // Extroverted
      isAI: true,
      isSelected: false,
      productDescription:
        "Open-source language model with strong performance across various tasks",
    },
  ];

  const userAvatars: Avatar[] = [
    {
      id: "user-1",
      name: "Alex",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      personality: personalities[1], // Introverted
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-2",
      name: "Sarah",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      personality: personalities[0], // Extroverted
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-3",
      name: "Mike",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      personality: personalities[2], // Optimistic
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-4",
      name: "Emma",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      personality: personalities[4], // Empathetic
      isAI: false,
      isSelected: false,
    },
    {
      id: "user-5",
      name: "Jordan",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      personality: personalities[3], // Practical
      isAI: false,
      isSelected: false,
    },
  ];

  const handleAISelection = (avatar: Avatar) => {
    if (selectedAI?.id === avatar.id) {
      setSelectedAI(null);
      // Optionally, clear isSelected for all
      aiAvatars.forEach((ai) => (ai.isSelected = false));
    } else {
      setSelectedAI(avatar);
      aiAvatars.forEach((ai) => (ai.isSelected = ai.id === avatar.id));
    }
  };

  const handleUserSelection = (avatar: Avatar) => {
    if (userAvatar?.id === avatar.id) {
      setUserAvatar(null);
      userAvatars.forEach((user) => (user.isSelected = false));
    } else {
      setUserAvatar(avatar);
      userAvatars.forEach((user) => (user.isSelected = user.id === avatar.id));
    }
  };

  const handlePersonalitySelection = (personality: Personality) => {
    if (selectedPersonality?.id === personality.id) {
      setSelectedPersonality(null);
      // Optionally, clear personality from selectedAI
      if (selectedAI) {
        setSelectedAI({ ...selectedAI, personality: selectedAI.personality });
      }
    } else {
      setSelectedPersonality(personality);
      // Update the AI avatar's personality if one is selected
      if (selectedAI) {
        const updatedAI = { ...selectedAI, personality };
        setSelectedAI(updatedAI);
      }
    }
  };

  const handlePersonalityEdit = (personality: Personality) => {
    setEditingPersonality(personality);
    setCustomPersonality({
      name: personality.name,
      description: personality.description,
      category: personality.category,
    });
    setShowPersonalityModal(true);
  };

  const handleSavePersonality = () => {
    if (editingPersonality) {
      // Update the personality
      editingPersonality.name = customPersonality.name;
      editingPersonality.description = customPersonality.description;
      editingPersonality.category = customPersonality.category;
    }
    setShowPersonalityModal(false);
    setEditingPersonality(null);
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

  const startConversation = () => {
    if (!selectedAI || !userAvatar) return;

    const welcomeMessage = {
      id: Date.now().toString(),
      content: `Hello ${userAvatar.name}! I'm ${
        selectedAI.name
      }, your ${selectedAI.personality.name.toLowerCase()}. I'm excited to chat with you! What would you like to discuss today?`,
      sender: selectedAI,
      timestamp: new Date(),
      isAI: true,
    };

    setConversationMessages([welcomeMessage]);
    setShowConversation(true);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !selectedAI || !userAvatar) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: userAvatar,
      timestamp: new Date(),
      isAI: false,
    };

    setConversationMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response based on personality
    setTimeout(() => {
      const aiResponse = generateAIResponse(
        inputMessage,
        selectedAI,
        userAvatar
      );
      setConversationMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (
    userMessage: string,
    ai: Avatar,
    user: Avatar
  ) => {
    const responses = {
      creative: [
        "That's a fascinating idea! Let me help you explore that creative direction...",
        "I love your creative thinking! Here's how we could develop this concept...",
        "Your imagination is inspiring! Let's brainstorm some creative solutions...",
      ],
      technical: [
        "From a technical perspective, here's how we could approach this...",
        "Let me break this down logically and provide a systematic solution...",
        "Technically speaking, here are the key considerations...",
      ],
      social: [
        "I understand how you feel about that. Let's talk through it together...",
        "That's a great point! I'd love to hear more about your perspective...",
        "I'm here to support you. What are your thoughts on this?",
      ],
      analytical: [
        "Let me analyze this situation and provide some insights...",
        "Based on the data and patterns, here's what I observe...",
        "Let's examine this from different analytical angles...",
      ],
      artistic: [
        "That's beautifully expressed! Let me share some artistic insights...",
        "I appreciate your artistic sensibility. Here's a creative perspective...",
        "Your artistic vision is wonderful! Let's explore this creatively...",
      ],
    };

    const personalityType = ai.personality.category;
    const possibleResponses = responses[personalityType] || responses.creative;
    const randomResponse =
      possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

    return {
      id: (Date.now() + 1).toString(),
      content: randomResponse,
      sender: ai,
      timestamp: new Date(),
      isAI: true,
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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

        {/* Selection Summary Card */}
        {(selectedAI || userAvatar || selectedPersonality) && (
          <div className="mb-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 flex items-center gap-4 min-w-0">
              {/* AI Companion */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-blue-600 text-lg">AI:</span>
                {selectedAI ? (
                  <div className="flex items-center gap-2">
                    {selectedAI.image.startsWith("http") ? (
                      <img
                        src={selectedAI.image}
                        alt={selectedAI.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : selectedAI.image.startsWith("/") ? (
                      <img
                        src={selectedAI.image}
                        alt={selectedAI.name}
                        className="w-8 h-8 object-contain rounded"
                      />
                    ) : (
                      <span className="text-3xl">{selectedAI.image}</span>
                    )}
                    <span className="font-medium text-gray-900 truncate text-lg">
                      {selectedAI.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-lg">None</span>
                )}
              </div>

              {/* Divider */}
              <span className="mx-2 text-gray-300 hidden md:inline text-lg">
                |
              </span>

              {/* User Avatar */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-green-600 text-lg">
                  You:
                </span>
                {userAvatar ? (
                  <div className="flex items-center gap-2">
                    {userAvatar.image.startsWith("http") ? (
                      <img
                        src={userAvatar.image}
                        alt={userAvatar.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : userAvatar.image.startsWith("/") ? (
                      <img
                        src={userAvatar.image}
                        alt={userAvatar.name}
                        className="w-8 h-8 object-contain rounded"
                      />
                    ) : (
                      <span className="text-3xl">{userAvatar.image}</span>
                    )}
                    <span className="font-medium text-gray-900 truncate text-lg">
                      {userAvatar.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-lg">None</span>
                )}
              </div>

              {/* Divider */}
              <span className="mx-2 text-gray-300 hidden md:inline text-lg">
                |
              </span>

              {/* Personality */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-purple-600 text-lg">
                  Personality:
                </span>
                {selectedPersonality ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedPersonality.icon}</span>
                    <span className="font-medium text-gray-900 truncate text-lg">
                      {selectedPersonality.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-lg">None</span>
                )}
              </div>
            </div>

            {/* Start Conversation Button */}
            {selectedAI &&
              userAvatar &&
              selectedPersonality &&
              !showConversation && (
                <div className="flex-shrink-0">
                  <button
                    onClick={startConversation}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Conversation
                  </button>
                </div>
              )}
          </div>
        )}

        {/* Conversation Interface */}
        {showConversation && selectedAI && userAvatar && (
          <div className="mb-8 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {userAvatar.image.startsWith("http") ? (
                    <img
                      src={userAvatar.image}
                      alt={userAvatar.name}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  ) : userAvatar.image.startsWith("/") ? (
                    <img
                      src={userAvatar.image}
                      alt={userAvatar.name}
                      className="w-8 h-8 object-contain rounded"
                    />
                  ) : (
                    <div className="text-2xl">{userAvatar.image}</div>
                  )}
                  {selectedAI.image.startsWith("http") ? (
                    <img
                      src={selectedAI.image}
                      alt={selectedAI.name}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  ) : selectedAI.image.startsWith("/") ? (
                    <img
                      src={selectedAI.image}
                      alt={selectedAI.name}
                      className="w-8 h-8 object-contain rounded"
                    />
                  ) : (
                    <div className="text-2xl">{selectedAI.image}</div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {userAvatar.name} & {selectedAI.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedPersonality
                      ? selectedPersonality.name
                      : userAvatar.personality.name}{" "}
                    × {selectedAI.personality.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConversation(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-xl">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.isAI ? "justify-start" : "justify-end"
                  }`}
                >
                  {message.isAI &&
                    (selectedAI.image.startsWith("http") ? (
                      <img
                        src={selectedAI.image}
                        alt={selectedAI.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : selectedAI.image.startsWith("/") ? (
                      <img
                        src={selectedAI.image}
                        alt={selectedAI.name}
                        className="w-8 h-8 object-contain rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {selectedAI.image}
                      </div>
                    ))}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isAI
                        ? "bg-white border border-gray-200 text-gray-900"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {!message.isAI &&
                    (userAvatar.image.startsWith("http") ? (
                      <img
                        src={userAvatar.image}
                        alt={userAvatar.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : userAvatar.image.startsWith("/") ? (
                      <img
                        src={userAvatar.image}
                        alt={userAvatar.name}
                        className="w-8 h-8 object-contain rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {userAvatar.image}
                      </div>
                    ))}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto">
          {/* Avatar Selection Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Companions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  AI Companions
                </h3>

                <div className="space-y-3">
                  {selectedAI ? (
                    <div className="relative">
                      {/* Selected AI Display */}
                      <div
                        onClick={() => setShowAIDropdown(!showAIDropdown)}
                        className="relative p-4 rounded-xl border-2 border-blue-500 bg-blue-50 shadow-lg cursor-pointer transition-all duration-200 hover:bg-blue-100 dropdown-container"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            {selectedAI.image.startsWith("http") ? (
                              <img
                                src={selectedAI.image}
                                alt={selectedAI.name}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            ) : selectedAI.image.startsWith("/") ? (
                              <img
                                src={selectedAI.image}
                                alt={selectedAI.name}
                                className="w-10 h-10 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const fallback =
                                    target.nextElementSibling as HTMLElement;
                                  if (fallback) {
                                    fallback.textContent = "🤖";
                                    fallback.style.display = "block";
                                  }
                                }}
                              />
                            ) : (
                              <div className="text-3xl">{selectedAI.image}</div>
                            )}
                            <div className="text-3xl hidden">
                              {selectedAI.image}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">
                              {selectedAI.name}
                            </h4>
                          </div>
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 text-gray-500 transition-transform",
                                showAIDropdown && "rotate-180"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dropdown */}
                      {showAIDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                          {aiAvatars.map((avatar) => (
                            <div
                              key={avatar.id}
                              onClick={() => {
                                handleAISelection(avatar);
                                setShowAIDropdown(false);
                              }}
                              className={cn(
                                "p-3 cursor-pointer transition-colors hover:bg-gray-50",
                                selectedAI?.id === avatar.id && "bg-blue-50"
                              )}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                  {avatar.image.startsWith("http") ? (
                                    <img
                                      src={avatar.image}
                                      alt={avatar.name}
                                      className="w-6 h-6 object-cover rounded-full"
                                    />
                                  ) : avatar.image.startsWith("/") ? (
                                    <img
                                      src={avatar.image}
                                      alt={avatar.name}
                                      className="w-6 h-6 object-contain"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        const fallback =
                                          target.nextElementSibling as HTMLElement;
                                        if (fallback) {
                                          fallback.textContent = "🤖";
                                          fallback.style.display = "block";
                                        }
                                      }}
                                    />
                                  ) : (
                                    <div className="text-xl">
                                      {avatar.image}
                                    </div>
                                  )}
                                  <div className="text-xl hidden">
                                    {avatar.image}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-gray-900 text-sm">
                                    {avatar.name}
                                  </h5>
                                </div>
                                {selectedAI?.id === avatar.id && (
                                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2 h-2 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Show all options when nothing is selected
                    aiAvatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        onClick={() => handleAISelection(avatar)}
                        className="relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            {avatar.image.startsWith("http") ? (
                              <img
                                src={avatar.image}
                                alt={avatar.name}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            ) : avatar.image.startsWith("/") ? (
                              <img
                                src={avatar.image}
                                alt={avatar.name}
                                className="w-10 h-10 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const fallback =
                                    target.nextElementSibling as HTMLElement;
                                  if (fallback) {
                                    fallback.textContent = "🤖";
                                    fallback.style.display = "block";
                                  }
                                }}
                              />
                            ) : (
                              <div className="text-3xl">{avatar.image}</div>
                            )}
                            <div className="text-3xl hidden">
                              {avatar.image}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">
                              {avatar.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* AI Personality */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-500" />
                  AI Personality
                </h3>

                <div className="space-y-3">
                  {selectedPersonality ? (
                    <div className="relative">
                      {/* Selected Personality Display */}
                      <div
                        onClick={() =>
                          setShowPersonalityDropdown(!showPersonalityDropdown)
                        }
                        className="relative p-4 rounded-xl border-2 border-purple-500 bg-purple-50 shadow-lg cursor-pointer transition-all duration-200 hover:bg-purple-100 dropdown-container"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            <div className="text-3xl">
                              {selectedPersonality.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {selectedPersonality.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {selectedPersonality.description}
                            </p>
                          </div>
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 text-gray-500 transition-transform",
                                showPersonalityDropdown && "rotate-180"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dropdown */}
                      {showPersonalityDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                          {personalities.map((personality) => (
                            <div
                              key={personality.id}
                              onClick={() => {
                                handlePersonalitySelection(personality);
                                setShowPersonalityDropdown(false);
                              }}
                              className={cn(
                                "p-3 cursor-pointer transition-colors hover:bg-gray-50",
                                selectedPersonality?.id === personality.id &&
                                  "bg-purple-50"
                              )}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                  <div className="text-xl">
                                    {personality.icon}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-gray-900 text-sm">
                                    {personality.name}
                                  </h5>
                                  <p className="text-xs text-gray-600 line-clamp-1">
                                    {personality.description}
                                  </p>
                                </div>
                                {selectedPersonality?.id === personality.id && (
                                  <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2 h-2 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Show all options when nothing is selected
                    personalities.map((personality) => (
                      <div
                        key={personality.id}
                        onClick={() => handlePersonalitySelection(personality)}
                        className="relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            <div className="text-3xl">{personality.icon}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {personality.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {personality.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePersonalityEdit(personality);
                              }}
                              className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* User Avatars */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-500" />
                  Your Avatar
                </h3>

                <div className="space-y-3">
                  {userAvatar ? (
                    <div className="relative">
                      {/* Selected User Display */}
                      <div
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="relative p-4 rounded-xl border-2 border-green-500 bg-green-50 shadow-lg cursor-pointer transition-all duration-200 hover:bg-green-100 dropdown-container"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            {userAvatar.image.startsWith("http") ? (
                              <img
                                src={userAvatar.image}
                                alt={userAvatar.name}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            ) : userAvatar.image.startsWith("/") ? (
                              <img
                                src={userAvatar.image}
                                alt={userAvatar.name}
                                className="w-10 h-10 object-contain"
                              />
                            ) : (
                              <div className="text-3xl">{userAvatar.image}</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {userAvatar.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {userAvatar.personality.description}
                            </p>
                          </div>
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 text-gray-500 transition-transform",
                                showUserDropdown && "rotate-180"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dropdown */}
                      {showUserDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                          {userAvatars.map((avatar) => (
                            <div
                              key={avatar.id}
                              onClick={() => {
                                handleUserSelection(avatar);
                                setShowUserDropdown(false);
                              }}
                              className={cn(
                                "p-3 cursor-pointer transition-colors hover:bg-gray-50",
                                userAvatar?.id === avatar.id && "bg-green-50"
                              )}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                  {avatar.image.startsWith("http") ? (
                                    <img
                                      src={avatar.image}
                                      alt={avatar.name}
                                      className="w-6 h-6 object-cover rounded-full"
                                    />
                                  ) : avatar.image.startsWith("/") ? (
                                    <img
                                      src={avatar.image}
                                      alt={avatar.name}
                                      className="w-6 h-6 object-contain"
                                    />
                                  ) : (
                                    <div className="text-xl">
                                      {avatar.image}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-gray-900 text-sm">
                                    {avatar.name}
                                  </h5>
                                  <p className="text-xs text-gray-600 line-clamp-1">
                                    {avatar.personality.description}
                                  </p>
                                </div>
                                {userAvatar?.id === avatar.id && (
                                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2 h-2 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Show all options when nothing is selected
                    userAvatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        onClick={() => handleUserSelection(avatar)}
                        className="relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            {avatar.image.startsWith("http") ? (
                              <img
                                src={avatar.image}
                                alt={avatar.name}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            ) : avatar.image.startsWith("/") ? (
                              <img
                                src={avatar.image}
                                alt={avatar.name}
                                className="w-10 h-10 object-contain"
                              />
                            ) : (
                              <div className="text-3xl">{avatar.image}</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {avatar.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {avatar.personality.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
