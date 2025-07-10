import React, { useRef, useEffect, useState } from "react";
import {
  TrendingUp,
  Search,
  Brain,
  Zap,
  Settings,
  Activity,
  BarChart3,
  Cpu,
  Clock,
  Target,
  Sparkles,
  Bot,
  Palette,
  MessageSquare,
  Code,
  Database,
  Shield,
  Globe,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Upload,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
} from "lucide-react";
import Layout from "./Layout";

const CollaborativeWorkspace: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [temperature, setTemperature] = useState(0.5);
  const [responseLength, setResponseLength] = useState("Auto");
  const [tone, setTone] = useState("Friendly");
  const [useMarkdown, setUseMarkdown] = useState(true);
  const [enableCodeHighlighting, setEnableCodeHighlighting] = useState(true);
  const [systemInstructions, setSystemInstructions] = useState(
    "You are an AI assistant. Provide helpful answers to the user's questions."
  );
  const [outputFormat, setOutputFormat] = useState("text");
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activePersonality, setActivePersonality] =
    useState("General Assistant");
  const [customPrompts, setCustomPrompts] = useState([
    {
      id: 1,
      name: "Code Review",
      prompt: "Review this code for best practices and potential issues:",
    },
    {
      id: 2,
      name: "Data Analysis",
      prompt: "Analyze this dataset and provide insights:",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to top when component mounts - with enhanced implementation
  useEffect(() => {
    // Try multiple approaches to ensure scroll to top works
    const scrollToTop = () => {
      // Method 1: Use the content ref if available
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      // Method 2: Find scrollable container by class
      const scrollableContainer = document.querySelector(
        ".flex-1.overflow-y-auto"
      );
      if (scrollableContainer) {
        scrollableContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      // Method 3: Window scroll as fallback
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    // Initial scroll
    scrollToTop();

    // Force scroll to top after a short delay to handle any layout issues
    setTimeout(scrollToTop, 100);
  }, []);

  const aiModels = [
    {
      name: "GPT-4",
      provider: "OpenAI",
      capabilities: ["Text Generation", "Code Analysis", "Creative Writing"],
      performance: { speed: 85, accuracy: 92, cost: 75 },
      status: "active",
      icon: <Brain className="w-5 h-5 text-blue-500" />,
    },
    {
      name: "Claude 3",
      provider: "Anthropic",
      capabilities: ["Reasoning", "Safety", "Technical Writing"],
      performance: { speed: 78, accuracy: 94, cost: 70 },
      status: "active",
      icon: <Shield className="w-5 h-5 text-green-500" />,
    },
    {
      name: "Gemini 1.5",
      provider: "Google",
      capabilities: ["Multimodal", "Research", "Analysis"],
      performance: { speed: 82, accuracy: 89, cost: 65 },
      status: "active",
      icon: <Globe className="w-5 h-5 text-purple-500" />,
    },
    {
      name: "Llama 3",
      provider: "Meta",
      capabilities: ["Open Source", "Customizable", "Efficient"],
      performance: { speed: 90, accuracy: 85, cost: 45 },
      status: "active",
      icon: <Code className="w-5 h-5 text-orange-500" />,
    },
  ];

  const personalities = [
    {
      name: "General Assistant",
      description: "Helpful and informative",
      color: "blue",
    },
    {
      name: "Creative Writer",
      description: "Imaginative and expressive",
      color: "purple",
    },
    {
      name: "Technical Expert",
      description: "Precise and analytical",
      color: "green",
    },
    {
      name: "Friendly Coach",
      description: "Encouraging and supportive",
      color: "pink",
    },
    {
      name: "Data Analyst",
      description: "Factual and data-driven",
      color: "indigo",
    },
  ];

  const performanceMetrics = {
    requestsPerMinute: 45,
    averageResponseTime: 1.2,
    successRate: 99.8,
    activeUsers: 127,
    tokensUsed: 1250000,
    costPerHour: 12.5,
  };

  const headerActions = (
    <>
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isMonitoring ? "bg-green-500 animate-pulse" : "bg-gray-400"
          }`}
        ></div>
        <span className="text-sm text-gray-600">
          {isMonitoring ? "Live monitoring" : "Monitoring paused"}
        </span>
      </div>
      <button
        onClick={() => setIsMonitoring(!isMonitoring)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isMonitoring ? (
          <Pause className="w-5 h-5 text-gray-600" />
        ) : (
          <Play className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </>
  );

  return (
    <Layout
      title="AI Configuration Dashboard"
      description="Configure and monitor AI model settings with advanced tuning capabilities"
      icon={<Brain className="w-6 h-6 text-white" />}
      headerActions={headerActions}
    >
      {/* AI Configuration Dashboard */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-8">
        {/* Real-time Performance Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Real-time Performance
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <RotateCcw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Requests/min</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {performanceMetrics.requestsPerMinute}
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Response</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {performanceMetrics.averageResponseTime}s
                  </p>
                </div>
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {performanceMetrics.successRate}%
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {performanceMetrics.activeUsers}
                  </p>
                </div>
                <Users className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tokens Used</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {(performanceMetrics.tokensUsed / 1000000).toFixed(1)}M
                  </p>
                </div>
                <Database className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Cost/Hour</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${performanceMetrics.costPerHour}
                  </p>
                </div>
                <Target className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - AI Model Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Model Selection & Comparison */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  AI Model Selection
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  Compare Models
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiModels.map((model) => (
                  <div
                    key={model.name}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedModel === model.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedModel(model.name)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {model.icon}
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {model.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {model.provider}
                          </p>
                        </div>
                      </div>
                      {selectedModel === model.name && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Speed: {model.performance.speed}%</span>
                      <span>Accuracy: {model.performance.accuracy}%</span>
                      <span>Cost: {model.performance.cost}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Configuration */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  Advanced Configuration
                </h3>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  {showAdvanced ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {showAdvanced ? "Hide" : "Show"} Advanced
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Response Temperature */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      Response Temperature
                    </span>
                    <span className="text-sm text-gray-500">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Focused</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* Response Length */}
                <div>
                  <label className="font-medium text-gray-700 mb-2 block">
                    Response Length
                  </label>
                  <select
                    value={responseLength}
                    onChange={(e) => setResponseLength(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Auto</option>
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <label className="font-medium text-gray-700 mb-2 block">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Friendly</option>
                    <option>Formal</option>
                    <option>Concise</option>
                    <option>Technical</option>
                    <option>Creative</option>
                  </select>
                </div>

                {/* Output Format */}
                <div>
                  <label className="font-medium text-gray-700 mb-2 block">
                    Output Format
                  </label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="text">Plain Text</option>
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                    <option value="html">HTML</option>
                  </select>
                </div>
              </div>

              {showAdvanced && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-4">
                    Advanced Settings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Use markdown
                      </span>
                      <input
                        type="checkbox"
                        checked={useMarkdown}
                        onChange={(e) => setUseMarkdown(e.target.checked)}
                        className="accent-blue-500 w-5 h-5"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Enable code syntax highlighting
                      </span>
                      <input
                        type="checkbox"
                        checked={enableCodeHighlighting}
                        onChange={(e) =>
                          setEnableCodeHighlighting(e.target.checked)
                        }
                        className="accent-blue-500 w-5 h-5"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Enable streaming responses
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-blue-500 w-5 h-5"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        Cache responses
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-blue-500 w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* System Instructions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  System Instructions
                </h3>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>
              <textarea
                value={systemInstructions}
                onChange={(e) => setSystemInstructions(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                placeholder="Enter system instructions for the AI model..."
              />
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>{systemInstructions.length} characters</span>
                <span>Max 4000 characters</span>
              </div>
            </div>
          </div>

          {/* Right Column - AI Personality & Tools */}
          <div className="space-y-6">
            {/* AI Personality */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-500" />
                AI Personality
              </h3>
              <div className="space-y-3">
                {personalities.map((personality) => (
                  <div
                    key={personality.name}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      activePersonality === personality.name
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActivePersonality(personality.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {personality.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {personality.description}
                        </p>
                      </div>
                      {activePersonality === personality.name && (
                        <CheckCircle className="w-5 h-5 text-pink-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Create Custom Personality
              </button>
            </div>

            {/* Custom Prompts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Custom Prompts
                </h3>
                <button className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {customPrompts.map((prompt) => (
                  <div key={prompt.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {prompt.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                          <Edit3 className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                          <Trash2 className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{prompt.prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700 font-medium transition-colors flex items-center justify-between">
                  <span>Test Configuration</span>
                  <Play className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700 font-medium transition-colors flex items-center justify-between">
                  <span>Export Settings</span>
                  <Download className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700 font-medium transition-colors flex items-center justify-between">
                  <span>Import Settings</span>
                  <Upload className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-between">
                  <span>Reset to Defaults</span>
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Model Performance */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Model Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-gray-900">1.2s avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="text-gray-900">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Cost Efficiency</span>
                    <span className="text-gray-900">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 p-2 text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>
    </Layout>
  );
};

export default CollaborativeWorkspace;
