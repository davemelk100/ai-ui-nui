import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const TopNav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Classic Chat",
      description:
        "Traditional chat interface with sidebar navigation and message history. Features a clean, familiar design with typing indicators and message actions like copy and feedback.",
    },
    {
      path: "/modern",
      label: "Modern UI",
      description:
        "Contemporary design with enhanced visual styling and modern aesthetics. Includes gradient backgrounds, improved spacing, and a more sophisticated user experience with advanced animations.",
    },
    {
      path: "/minimal",
      label: "Collaborative",
      description:
        "Team workspace environment for collaborative AI development and project management. Features team member profiles, content organization, and real-time collaboration tools for AI-human teamwork.",
    },
    {
      path: "/dark",
      label: "Voice Chat",
      description:
        "Voice-based AI conversation interface with audio visualizations and speech patterns. Includes voice recording controls, audio level indicators, and simulated voice message playback with personality-driven responses.",
    },
    {
      path: "/dragdrop",
      label: "Drag & Drop",
      description:
        "Interactive component library for organizing and testing UI elements through drag and drop functionality. Allows users to move real components between different zones like testing, active, and archive areas.",
    },
    {
      path: "/avatars",
      label: "Avatars",
      description:
        "Select AI companions and customize your own avatar with unique personalities and traits. Start personalized conversations where both user and AI have distinct personalities that influence the interaction style and responses.",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
