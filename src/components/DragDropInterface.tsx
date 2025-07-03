import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  FileText,
  Image,
  Video,
  Music,
  Folder,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Move,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Sparkles,
  Settings,
  Plus,
  Search,
  Zap,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { cn } from "../lib/utils";

interface DraggableComponent {
  id: string;
  type:
    | "message"
    | "team-member"
    | "content-item"
    | "chat-element"
    | "workspace-item";
  name: string;
  description: string;
  status: "pending" | "processing" | "completed" | "error";
  data: any; // Component-specific data
}

interface DropZone {
  id: string;
  title: string;
  description: string;
  items: DraggableComponent[];
  acceptTypes: DraggableComponent["type"][];
  maxItems?: number;
}

// Message Component (Draggable)
const DraggableMessage: React.FC<{ component: DraggableComponent }> = ({
  component,
}) => {
  const { data } = component;
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="group flex space-x-3 animate-slide-up cursor-move"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {data.role === "assistant" && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className="relative flex-1">
        <div
          className={cn(
            "max-w-full px-4 py-3 rounded-2xl relative",
            data.role === "user"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-200 text-gray-900 hover:border-gray-300 transition-colors"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {data.content}
          </p>

          <div
            className={cn(
              "text-xs mt-2 flex items-center justify-between",
              data.role === "user" ? "text-blue-100" : "text-gray-400"
            )}
          >
            <span>{data.timestamp}</span>

            {data.role === "assistant" && (
              <div
                className={cn(
                  "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity",
                  showActions ? "opacity-100" : ""
                )}
              >
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {data.role === "user" && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
};

// Team Member Component (Draggable)
const DraggableTeamMember: React.FC<{ component: DraggableComponent }> = ({
  component,
}) => {
  const { data } = component;

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-move">
      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold">{data.avatar}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900">{data.name}</p>
          {data.isAI && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </div>
        <p className="text-xs text-gray-500">{data.role}</p>
        <div className="flex items-center space-x-1 mt-1">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              data.status === "online"
                ? "bg-green-500"
                : data.status === "busy"
                ? "bg-yellow-500"
                : "bg-gray-400"
            )}
          ></div>
          <span className="text-xs text-gray-400 capitalize">
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
};

// Content Item Component (Draggable)
const DraggableContentItem: React.FC<{ component: DraggableComponent }> = ({
  component,
}) => {
  const { data } = component;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "design":
        return <Image className="w-4 h-4" />;
      case "code":
        return <FileText className="w-4 h-4" />;
      case "research":
        return <Lightbulb className="w-4 h-4" />;
      case "presentation":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-move">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          {getTypeIcon(data.type)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {data.title}
          </h4>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {data.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                getStatusColor(data.status)
              )}
            >
              {data.status}
            </span>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>👤 {data.creator}</span>
              <span>❤️ {data.likes}</span>
              <span>💬 {data.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Element Component (Draggable)
const DraggableChatElement: React.FC<{ component: DraggableComponent }> = ({
  component,
}) => {
  const { data } = component;

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-move">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          {data.icon === "message" && (
            <MessageSquare className="w-4 h-4 text-white" />
          )}
          {data.icon === "settings" && (
            <Settings className="w-4 h-4 text-white" />
          )}
          {data.icon === "plus" && <Plus className="w-4 h-4 text-white" />}
          {data.icon === "search" && <Search className="w-4 h-4 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{data.title}</p>
          <p className="text-xs text-gray-500">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const DragDropInterface: React.FC = () => {
  const [dropZones, setDropZones] = useState<DropZone[]>([
    {
      id: "components",
      title: "Component Library",
      description: "Available UI components",
      items: [],
      acceptTypes: [
        "message",
        "team-member",
        "content-item",
        "chat-element",
        "workspace-item",
      ],
    },
    {
      id: "active",
      title: "Active Components",
      description: "Components in use",
      items: [],
      acceptTypes: [
        "message",
        "team-member",
        "content-item",
        "chat-element",
        "workspace-item",
      ],
    },
    {
      id: "testing",
      title: "Testing Zone",
      description: "Components being tested",
      items: [],
      acceptTypes: [
        "message",
        "team-member",
        "content-item",
        "chat-element",
        "workspace-item",
      ],
    },
    {
      id: "archive",
      title: "Archive",
      description: "Retired components",
      items: [],
      acceptTypes: [
        "message",
        "team-member",
        "content-item",
        "chat-element",
        "workspace-item",
      ],
      maxItems: 15,
    },
  ]);

  const [draggedItem, setDraggedItem] = useState<DraggableComponent | null>(
    null
  );
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

  const getStatusIcon = (status: DraggableComponent["status"]) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "processing":
        return <Move className="w-4 h-4 text-blue-500 animate-pulse" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const handleDragStart = (e: React.DragEvent, item: DraggableComponent) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    setDragOverZone(zoneId);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (e: React.DragEvent, targetZoneId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const sourceZone = dropZones.find((zone) =>
      zone.items.some((item) => item.id === draggedItem.id)
    );
    const targetZone = dropZones.find((zone) => zone.id === targetZoneId);

    if (!sourceZone || !targetZone) return;

    // Check if target zone accepts this type
    if (!targetZone.acceptTypes.includes(draggedItem.type)) {
      return;
    }

    // Check if target zone has capacity
    if (targetZone.maxItems && targetZone.items.length >= targetZone.maxItems) {
      return;
    }

    // Update zones
    setDropZones((prev) =>
      prev.map((zone) => {
        if (zone.id === sourceZone.id) {
          return {
            ...zone,
            items: zone.items.filter((item) => item.id !== draggedItem.id),
          };
        }
        if (zone.id === targetZoneId) {
          // Update item status based on target zone
          let updatedItem = { ...draggedItem };
          if (targetZoneId === "testing") {
            updatedItem.status = "processing";
          } else if (targetZoneId === "active") {
            updatedItem.status = "completed";
          } else if (targetZoneId === "archive") {
            updatedItem.status = "completed";
          }

          return {
            ...zone,
            items: [...zone.items, updatedItem],
          };
        }
        return zone;
      })
    );

    setDraggedItem(null);
    setDragOverZone(null);
  };

  const addSampleComponents = () => {
    const sampleComponents: DraggableComponent[] = [
      // Message components
      {
        id: "msg-1",
        type: "message",
        name: "User Message",
        description: "Chat message from user",
        status: "pending",
        data: {
          role: "user",
          content: "Hello! How can you help me today?",
          timestamp: "2:30 PM",
        },
      },
      {
        id: "msg-2",
        type: "message",
        name: "AI Response",
        description: "Chat message from AI assistant",
        status: "pending",
        data: {
          role: "assistant",
          content:
            "I'm here to help! I can assist with coding, design, research, and much more. What would you like to work on?",
          timestamp: "2:31 PM",
        },
      },
      // Team member components
      {
        id: "member-1",
        type: "team-member",
        name: "Melks AI",
        description: "AI Lead team member",
        status: "pending",
        data: {
          name: "Melks",
          role: "AI Lead",
          avatar: "🤖",
          status: "online",
          isAI: true,
        },
      },
      {
        id: "member-2",
        type: "team-member",
        name: "Alex Developer",
        description: "Human developer team member",
        status: "pending",
        data: {
          name: "Alex",
          role: "Developer",
          avatar: "👨‍💻",
          status: "busy",
          isAI: false,
        },
      },
      // Content item components
      {
        id: "content-1",
        type: "content-item",
        name: "UI Design",
        description: "Design content item",
        status: "pending",
        data: {
          type: "design",
          title: "Voice Chat Interface",
          description:
            "Unique voice-based conversation UI with audio visualizations",
          status: "completed",
          creator: "Melks",
          likes: 12,
          comments: 5,
        },
      },
      {
        id: "content-2",
        type: "content-item",
        name: "Code Component",
        description: "Code content item",
        status: "pending",
        data: {
          type: "code",
          title: "Modern Chat Components",
          description: "React components for contemporary chat interface",
          status: "in-progress",
          creator: "Alex",
          likes: 8,
          comments: 3,
        },
      },
      // Chat element components
      {
        id: "chat-1",
        type: "chat-element",
        name: "New Chat Button",
        description: "Chat interface button",
        status: "pending",
        data: {
          icon: "plus",
          title: "New Chat",
          description: "Start a new conversation",
        },
      },
      {
        id: "chat-2",
        type: "chat-element",
        name: "Settings Button",
        description: "Chat interface settings",
        status: "pending",
        data: {
          icon: "settings",
          title: "Settings",
          description: "Configure chat preferences",
        },
      },
    ];

    setDropZones((prev) =>
      prev.map((zone) =>
        zone.id === "components"
          ? { ...zone, items: [...zone.items, ...sampleComponents] }
          : zone
      )
    );
  };

  const clearZone = (zoneId: string) => {
    setDropZones((prev) =>
      prev.map((zone) => (zone.id === zoneId ? { ...zone, items: [] } : zone))
    );
  };

  const renderComponent = (component: DraggableComponent) => {
    switch (component.type) {
      case "message":
        return <DraggableMessage component={component} />;
      case "team-member":
        return <DraggableTeamMember component={component} />;
      case "content-item":
        return <DraggableContentItem component={component} />;
      case "chat-element":
        return <DraggableChatElement component={component} />;
      default:
        return (
          <div className="p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm font-medium">{component.name}</p>
            <p className="text-xs text-gray-500">{component.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Component Drag & Drop
          </h1>
          <p className="text-gray-600">
            Drag real UI components between different zones to organize your
            interface
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={addSampleComponents}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Add Sample Components
          </button>
          <button
            onClick={() => clearZone("components")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Component Library
          </button>
        </div>

        {/* Drop Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dropZones.map((zone) => (
            <div
              key={zone.id}
              className={`bg-white rounded-xl shadow-lg border-2 border-dashed transition-all duration-200 ${
                dragOverZone === zone.id
                  ? "border-blue-400 bg-blue-50 scale-105"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onDragOver={(e) => handleDragOver(e, zone.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, zone.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {zone.title}
                    </h3>
                    <p className="text-sm text-gray-500">{zone.description}</p>
                  </div>
                  {zone.maxItems && (
                    <span className="text-xs text-gray-400">
                      {zone.items.length}/{zone.maxItems}
                    </span>
                  )}
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {zone.items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={`transition-all duration-200 ${
                        draggedItem?.id === item.id ? "opacity-50 scale-95" : ""
                      }`}
                    >
                      {renderComponent(item)}
                    </div>
                  ))}

                  {zone.items.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Drop components here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            How to use:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Click "Add Sample Components" to populate the component library
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Drag real UI components (messages, team members, content items)
              between zones
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Components change status automatically based on their zone
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Archive zone has a limit of 15 components
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DragDropInterface;
