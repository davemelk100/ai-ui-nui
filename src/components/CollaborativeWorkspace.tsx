import React, { useRef, useEffect } from "react";
import {
  TrendingUp,
  Search,
} from "lucide-react";

const CollaborativeWorkspace: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      {/* Main Workspace Only - No Sidebar */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                AI Configuration Dashboard
              </h2>
              <p className="text-gray-600 mt-1">
                Configure and monitor AI model settings.
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
            <h3 className="text-2xl font-bold text-gray-900">
              AI Configuration Dashboard
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Model */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="font-semibold text-gray-800 mb-2">AI Model</div>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>GPT-4</option>
                <option>Claude 3</option>
                <option>Gemini 1.5</option>
                <option>Llama 3</option>
              </select>
            </div>

            {/* Response Temperature */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="font-semibold text-gray-800 mb-2 flex items-center justify-between">
                <span>Response Temperature</span>
                <span className="text-gray-500 text-sm">0.5</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="0.5"
                className="w-full accent-blue-500"
                readOnly
              />
            </div>

            {/* Behavior Settings */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="font-semibold text-gray-800 mb-2">
                Behavior Settings
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span>Response length</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Auto</option>
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tone</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Friendly</option>
                    <option>Formal</option>
                    <option>Concise</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Use markdown</span>
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="accent-blue-500 w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Enable code syntax highlighting</span>
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="accent-blue-500 w-5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* System Instructions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 md:col-span-2">
              <div className="font-semibold text-gray-800 mb-2">
                System Instructions
              </div>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                value="You are an AI assistant. Provide helpful answers to the user's questions."
                readOnly
              />
            </div>

            {/* Output Formatting */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="font-semibold text-gray-800 mb-2">
                Output Formatting
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">JSON</span>
                <input type="checkbox" className="accent-blue-500 w-5 h-5" />
                <span className="text-gray-700">XML</span>
                <input type="checkbox" className="accent-blue-500 w-5 h-5" />
              </div>
            </div>

            {/* Requests/Errors */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="font-semibold text-gray-800 mb-2">Requests</div>
              <div className="text-2xl font-bold text-blue-600">23,100</div>
              <div className="text-sm text-gray-500">requests</div>
              <div className="font-semibold text-gray-800 mt-4 mb-2">
                Errors
              </div>
              <div className="text-2xl font-bold text-red-500">0</div>
              <div className="text-sm text-gray-500">in past 24 hours</div>
            </div>

            {/* User Feedback */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="font-semibold text-gray-800 mb-2">
                User Feedback
              </div>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-900">125</span>
                  <span className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 3h-6a2 2 0 0 0-2 2v3h10V5a2 2 0 0 0-2-2z"
                      ></path>
                    </svg>
                    Feedback
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-green-600">8</span>
                  <span className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 9V5a3 3 0 0 0-6 0v4"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15h14l-1.405-1.405A2.032 2.032 0 0 0 17 12.158V11a5 5 0 0 0-10 0v1.159c0 .538.214 1.055.595 1.436L5 15z"
                      ></path>
                    </svg>
                    Likes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeWorkspace;
