import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MessageSquare,
  Brain,
  Mic,
  MousePointer,
  User,
  Palette,
  Settings,
  Plus,
  Search,
  Menu,
  X,
  Home,
  Zap,
  Activity,
  BarChart3,
  Users,
  Star,
  Code,
  Database,
  Shield,
  Globe,
} from "lucide-react";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon?: React.ReactNode;
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  headerActions?: React.ReactNode;
  theme?: "light" | "dark";
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  icon,
  showSidebar = true,
  sidebarContent,
  headerActions,
  theme = "light",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Modern UI",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Contemporary design with enhanced visual styling",
    },
    {
      path: "/minimal",
      label: "AI Tuning",
      icon: <Brain className="w-5 h-5" />,
      description: "Workspace for tuning and collaborating with AI models",
    },
    {
      path: "/dark",
      label: "Voice Chat",
      icon: <Mic className="w-5 h-5" />,
      description: "Voice-based AI conversation interface",
    },
    {
      path: "/dragdrop",
      label: "Drag & Drop",
      icon: <MousePointer className="w-5 h-5" />,
      description: "Interactive component library",
    },
    {
      path: "/avatars",
      label: "Avatars",
      icon: <User className="w-5 h-5" />,
      description: "Select AI companions and customize avatars",
    },
    {
      path: "/figma",
      label: "Figma Shortcuts",
      icon: <Palette className="w-5 h-5" />,
      description: "Essential Figma shortcuts for designers",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const defaultSidebarContent = (
    <div className="flex-1 p-6">
      <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
        <Plus className="w-5 h-5" />
        <span>New Conversation</span>
      </button>

      <div className="mt-8 space-y-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Recent Chats
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Getting started with AI
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Code review help
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-64px)]",
        isDark
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
      )}
    >
      {/* Left Navigation Sidebar */}
      {showSidebar && (
        <div
          className={cn(
            "w-80 backdrop-blur-sm border-r flex flex-col",
            isDark
              ? "bg-black/20 border-white/10"
              : "bg-white/80 border-gray-200/50"
          )}
        >
          {/* Sidebar Header */}
          <div
            className={cn(
              "p-6 border-b",
              isDark ? "border-white/10" : "border-gray-200/50"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className={cn(
                    "text-lg font-bold",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                >
                  AI Tuning
                </h1>
                <p
                  className={cn(
                    "text-sm",
                    isDark ? "text-blue-200" : "text-gray-500"
                  )}
                >
                  Development Platform
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-xl transition-colors group",
                    isActive(item.path)
                      ? isDark
                        ? "bg-white/10 border border-white/20 text-white"
                        : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700"
                      : isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isActive(item.path)
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : isDark
                        ? "bg-white/10 text-gray-300 group-hover:bg-white/20"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p
                      className={cn(
                        "text-xs truncate",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar Content */}
          {sidebarContent || defaultSidebarContent}

          {/* Sidebar Footer */}
          <div
            className={cn(
              "p-6 border-t",
              isDark ? "border-white/10" : "border-gray-200/50"
            )}
          >
            <button
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-colors",
                isDark
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-gray-50 text-gray-700"
              )}
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={cn(
            "backdrop-blur-sm border-b px-8 py-6",
            isDark
              ? "bg-black/20 border-white/10"
              : "bg-white/80 border-gray-200/50"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "md:hidden p-2 rounded-lg transition-colors",
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                {icon && (
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    {icon}
                  </div>
                )}
                <div>
                  <h2
                    className={cn(
                      "text-2xl font-bold",
                      isDark ? "text-white" : "text-gray-900"
                    )}
                  >
                    {title}
                  </h2>
                  <p
                    className={cn(
                      "text-sm mt-1",
                      isDark ? "text-purple-200" : "text-gray-500"
                    )}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {headerActions}
              <div
                className={cn(
                  "flex items-center space-x-2 text-sm",
                  isDark ? "text-purple-200" : "text-gray-500"
                )}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
              <button
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
                )}
              >
                <Search
                  className={cn(
                    "w-5 h-5",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900">
                        AI Tuning
                      </h1>
                      <p className="text-sm text-gray-500">
                        Development Platform
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-xl transition-colors",
                        isActive(item.path)
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          isActive(item.path)
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
