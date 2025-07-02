import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  UserPlus,
  MessageSquare,
  Settings,
  Plus,
  CheckCircle,
  Circle,
  Clock,
  Star,
  FolderOpen,
  FileText,
  Calendar,
  Target,
  TrendingUp,
  Lightbulb,
  Zap,
  Bot,
  User,
  Search,
  Filter,
  MoreHorizontal,
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
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "review":
        return "bg-yellow-100 text-yellow-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "high":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return <Circle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "review":
        return <Star className="w-4 h-4" />;
      case "done":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const addContentItem = () => {
    if (newTaskTitle.trim()) {
      const newContentItem: ContentItem = {
        id: `content-${Date.now()}`,
        type: "documentation",
        title: newTaskTitle,
        description: "New collaborative content item",
        status: "draft",
        creator: "Melks",
        lastModified: new Date(),
        likes: 0,
        comments: 0,
        tags: ["collaboration"],
      };

      if (currentProject) {
        currentProject.contentItems.push(newContentItem);
      }

      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                    <FolderOpen className="w-5 h-5 text-blue-500" />
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

        {/* Task Board */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Task Board</h3>
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={() => setIsAddingTask(true)}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Add Task Modal */}
          {isAddingTask && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addContentItem()}
                />
                <button
                  onClick={addContentItem}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProject?.contentItems
              .filter(
                (item) => filterStatus === "all" || item.status === filterStatus
              )
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setSelectedTask(selectedTask === item.id ? null : item.id)
                  }
                  className={`bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTask === item.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status.replace("-", " ")}
                      </span>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Creator</span>
                      <span className="text-xs font-medium text-gray-700">
                        {item.creator}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Type</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Modified</span>
                      <span className="text-xs text-gray-700">
                        {item.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Collaborative Chat */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Team Chat</h3>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">
                  AI assistants are collaborating
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
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
