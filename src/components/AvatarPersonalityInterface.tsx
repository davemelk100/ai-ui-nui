import React, { useState } from "react";
import { User, Check, Save, X, Plus } from "lucide-react";
import Layout from "./Layout";

interface Personality {
  id: string;
  name: string;
  description: string;
  traits: string[];
  color: string;
  category: "creative" | "technical" | "social" | "analytical" | "artistic";
}

const AvatarPersonalityInterface: React.FC = () => {
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

  const personalities: Personality[] = [
    {
      id: "extroverted",
      name: "Extroverted",
      description:
        "Outgoing and sociable, loves conversation and being around people",
      traits: [],
      color: "from-yellow-500 to-orange-500",
      category: "social",
    },
    {
      id: "introverted",
      name: "Introverted",
      description:
        "Thoughtful and reserved, prefers deep conversations and quiet reflection",
      traits: [],
      color: "from-blue-500 to-indigo-500",
      category: "social",
    },
    {
      id: "optimistic",
      name: "Optimistic",
      description:
        "Positive and hopeful, always sees the bright side of situations",
      traits: [],
      color: "from-yellow-400 to-orange-400",
      category: "social",
    },
    {
      id: "practical",
      name: "Practical",
      description:
        "Down-to-earth and realistic, focuses on what works and gets things done",
      traits: [],
      color: "from-gray-600 to-gray-800",
      category: "analytical",
    },
    {
      id: "empathetic",
      name: "Empathetic",
      description:
        "Understanding and caring, deeply feels and connects with others' emotions",
      traits: [],
      color: "from-pink-500 to-rose-500",
      category: "social",
    },
  ];

  const handlePersonalitySelection = (personality: Personality) => {
    if (selectedPersonality?.id === personality.id) {
      setSelectedPersonality(null);
    } else {
      setSelectedPersonality(personality);
    }
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

  return (
    <Layout
      title="Personality Selector"
      description="Choose and customize your personality"
      icon={<User className="w-6 h-6 text-white" />}
    >
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Selection Summary Card */}
          {selectedPersonality && (
            <div className="mb-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1 flex items-center gap-4 min-w-0">
                {/* Personality */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-purple-600 text-lg">
                    Selected Personality:
                  </span>
                  {selectedPersonality ? (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate text-lg">
                        {selectedPersonality.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-lg">None</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personalities Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Personalities
                </h2>
                <button
                  onClick={() => {
                    setEditingPersonality(null);
                    setCustomPersonality({
                      name: "",
                      description: "",
                      category: "creative",
                    });
                    setShowPersonalityModal(true);
                  }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {personalities.map((personality) => (
                  <div
                    key={personality.id}
                    onClick={() => handlePersonalitySelection(personality)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPersonality?.id === personality.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {personality.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {personality.description}
                        </p>
                      </div>
                      {selectedPersonality?.id === personality.id && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personality Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Personality Details
              </h2>

              {selectedPersonality ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {selectedPersonality.name}
                    </h3>
                    <p className="text-gray-600">
                      {selectedPersonality.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Category
                    </h4>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {selectedPersonality.category}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingPersonality(selectedPersonality);
                        setCustomPersonality({
                          name: selectedPersonality.name,
                          description: selectedPersonality.description,
                          category: selectedPersonality.category,
                        });
                        setShowPersonalityModal(true);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Select a personality to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personality Modal */}
        {showPersonalityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingPersonality ? "Edit Personality" : "New Personality"}
                </h3>
                <button
                  onClick={() => setShowPersonalityModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={customPersonality.name}
                    onChange={(e) =>
                      setCustomPersonality({
                        ...customPersonality,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter personality name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={customPersonality.description}
                    onChange={(e) =>
                      setCustomPersonality({
                        ...customPersonality,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter personality description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={customPersonality.category}
                    onChange={(e) =>
                      setCustomPersonality({
                        ...customPersonality,
                        category: e.target.value as Personality["category"],
                      })
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

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowPersonalityModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePersonality}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AvatarPersonalityInterface;
