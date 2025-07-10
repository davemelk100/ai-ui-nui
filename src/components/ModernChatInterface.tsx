import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, MessageSquare } from "lucide-react";
import Message from "./Message";
import Layout from "./Layout";

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
    <Layout
      title="Modern Chat"
      description="Experience the future of AI conversations"
      icon={<MessageSquare className="w-6 h-6 text-white" />}
    >
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
              placeholder="Type your message here..."
              className="w-full px-6 py-4 pr-16 text-gray-900 bg-white border border-gray-200 rounded-2xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              style={{ minHeight: "60px" }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ModernChatInterface;
