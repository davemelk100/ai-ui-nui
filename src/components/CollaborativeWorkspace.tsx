import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  UserPlus,
  MessageSquare,
  Settings,
  TrendingUp,
  Lightbulb,
  Zap,
  Bot,
  Search,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "busy" | "away";
  isAI: boolean;
}

interface ContentItem {
  id: string;
  type:
    | "design"
    | "code"
    | "research"
    | "presentation"
    | "prototype"
    | "documentation";
  title: string;
  description: string;
  status: "draft" | "in-progress" | "review" | "completed";
  creator: string;
  lastModified: Date;
  likes: number;
  comments: number;
  thumbnail?: string;
  tags: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: TeamMember[];
  contentItems: ContentItem[];
  lastActivity: Date;
}

const CollaborativeWorkspace: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>("project-1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Melks",
      role: "AI Lead",
      avatar: "🤖",
      status: "online",
      isAI: true,
    },
    {
      id: "2",
      name: "Alex",
      role: "Developer",
      avatar: "👨‍💻",
      status: "busy",
      isAI: false,
    },
    {
      id: "3",
      name: "Claude",
      role: "AI Assistant",
      avatar: "🧠",
      status: "online",
      isAI: true,
    },
    {
      id: "4",
      name: "Sarah",
      role: "Designer",
      avatar: "🎨",
      status: "away",
      isAI: false,
    },
    {
      id: "5",
      name: "GPT-4",
      role: "AI Analyst",
      avatar: "📊",
      status: "online",
      isAI: true,
    },
  ];

  const projects: Project[] = [
    {
      id: "project-1",
      name: "AI Chat Interface",
      description: "Building multiple UI variations for AI chat platforms",
      progress: 75,
      members: teamMembers.slice(0, 3),
      contentItems: [
        {
          id: "content-1",
          type: "design",
          title: "Voice Chat Interface Design",
          description:
            "Unique voice-based conversation UI with audio visualizations",
          status: "completed",
          creator: "Melks",
          lastModified: new Date(Date.now() - 86400000),
          likes: 12,
          comments: 5,
          tags: ["design", "voice", "ui", "prototype"],
        },
        {
          id: "content-2",
          type: "code",
          title: "Modern Chat Components",
          description: "React components for contemporary chat interface",
          status: "in-progress",
          creator: "Claude",
          lastModified: new Date(Date.now() - 3600000),
          likes: 8,
          comments: 3,
          tags: ["development", "react", "components"],
        },
        {
          id: "content-3",
          type: "research",
          title: "AI Collaboration Patterns",
          description: "Research on effective AI-human collaboration workflows",
          status: "review",
          creator: "GPT-4",
          lastModified: new Date(Date.now() - 7200000),
          likes: 15,
          comments: 7,
          tags: ["research", "ai", "collaboration"],
        },
        {
          id: "content-4",
          type: "presentation",
          title: "Project Overview Deck",
          description: "Presentation slides for stakeholder review",
          status: "draft",
          creator: "Sarah",
          lastModified: new Date(Date.now() - 1800000),
          likes: 3,
          comments: 1,
          tags: ["presentation", "stakeholders"],
        },
      ],
      lastActivity: new Date(),
    },
  ];

  const currentProject = projects.find((p) => p.id === activeProject);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Team Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Team Workspace
              </h1>
              <p className="text-sm text-gray-500">
                Collaborative AI Development
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Team Members
              </h3>
              <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <UserPlus className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "busy"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {member.name}
                      </p>
                      {member.isAI && <Bot className="w-3 h-3 text-blue-500" />}
                    </div>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-colors ${
                    activeProject === project.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Workspace Settings</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentProject?.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {currentProject?.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Active collaboration
                </span>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Configuration Dashboard */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              AI Configuration Dashboard
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Active</span>
            </div>
          </div>

          {/* AI Configuration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model Configuration */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Model Configuration
                  </h4>
                  <p className="text-sm text-gray-600">
                    GPT-4 Turbo • 128K Context
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Temperature</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">0.7</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Max Tokens</span>
                  <span className="text-sm font-medium">4,096</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Top P</span>
                  <span className="text-sm font-medium">0.9</span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                Configure Model
              </button>
            </div>

            {/* Prompt Engineering */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Prompt Engineering
                  </h4>
                  <p className="text-sm text-gray-600">3 Active Templates</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Code Assistant</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Specialized for programming tasks
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Creative Writer</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Optimized for creative content
                  </p>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                Manage Templates
              </button>
            </div>

            {/* Fine-tuning */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fine-tuning</h4>
                  <p className="text-sm text-gray-600">Custom Model Training</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Training Status</span>
                  <span className="text-sm font-medium text-green-600">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dataset Size</span>
                  <span className="text-sm font-medium">2.4K examples</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="text-sm font-medium">94.2%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                Start Training
              </button>
            </div>

            {/* Performance Analytics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Performance Analytics
                  </h4>
                  <p className="text-sm text-gray-600">Real-time Metrics</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium">1.2s avg</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium">98.7%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Token Usage</span>
                  <span className="text-sm font-medium">2.1M/month</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost</span>
                  <span className="text-sm font-medium">$127.50</span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                View Analytics
              </button>
            </div>
          </div>

          {/* Team Chat */}
          <div className="mt-8">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Team Chat</h3>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">
                  AI assistants are collaborating
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <strong>Melks:</strong> "I've completed the voice chat
                    interface design. Ready for review!"
                  </p>
                </div>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeWorkspace;
