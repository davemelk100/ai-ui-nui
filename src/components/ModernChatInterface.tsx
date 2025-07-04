import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  Settings,
  Plus,
  MessageSquare,
  Search,
  Zap,
} from "lucide-react";
import Message from "./Message";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ModernChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
              content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `I understand you said: "${userMessage.content}". This is your AI assistant responding to demonstrate the modern chat interface. In a real application, this would be connected to an AI API like OpenAI, Anthropic, or similar services.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Modern Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-sm text-gray-500">Your AI Companion</p>
            </div>
          </div>
        </div>

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

        <div className="p-6 border-t border-gray-200/50">
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Modern Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Modern Chat</h2>
              <p className="text-sm text-gray-500 mt-1">
                Experience the future of AI conversations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
            />
          ))}

          {isTyping && (
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Modern Input Area */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-8">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  autoResize(e);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="w-full px-6 py-4 pr-16 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                rows={1}
                style={{ minHeight: "56px", maxHeight: "120px" }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              AI may produce inaccurate information. Press Enter to send,
              Shift+Enter for new line.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModernChatInterface;
