import React, { useState } from "react";
import {
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "../lib/utils";

interface MessageProps {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ id, content, role, timestamp }) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleFeedback = (type: "up" | "down") => {
    // In a real app, this would send feedback to the backend
    console.log(`Feedback ${type} for message ${id}`);
  };

  return (
    <div
      className={cn(
        "group flex space-x-3 animate-slide-up",
        role === "user" ? "justify-end" : "justify-start"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {role === "assistant" && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className="relative">
        <div
          className={cn(
            "max-w-3xl px-4 py-3 rounded-2xl relative",
            role === "user"
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-200 text-gray-900 hover:border-gray-300 transition-colors"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>

          <div
            className={cn(
              "text-xs mt-2 flex items-center justify-between",
              role === "user" ? "text-blue-100" : "text-gray-400"
            )}
          >
            <span>
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            {role === "assistant" && (
              <div
                className={cn(
                  "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity",
                  showActions ? "opacity-100" : ""
                )}
              >
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy message"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleFeedback("up")}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Good response"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleFeedback("down")}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Bad response"
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
                <button
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="More options"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {copied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Copied!
          </div>
        )}
      </div>

      {role === "user" && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default Message;
