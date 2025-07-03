import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  BarChart3,
  MessageCircle,
  Settings,
  Plus,
  Zap,
  Headphones,
  Radio,
} from "lucide-react";

interface VoiceMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  duration: number; // in seconds
  isPlaying: boolean;
}

const VoiceChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: "1",
      content:
        "Hello! I'm Melks. I'm ready for a voice conversation. Just click the microphone to start speaking.",
      role: "assistant",
      timestamp: new Date(),
      duration: 3,
      isPlaying: false,
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Simulate audio level changes
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setIsListening(true);

    // Simulate recording for 3 seconds
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsListening(false);

    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      content:
        "This is a simulated voice message. In a real application, this would be transcribed from actual speech.",
      role: "user",
      timestamp: new Date(),
      duration: 3,
      isPlaying: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI voice response
    setTimeout(() => {
      const aiResponse: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I heard your voice message! This is Melks responding with a simulated voice response. The interface shows audio visualizations and speech patterns.",
        role: "assistant",
        timestamp: new Date(),
        duration: 4,
        isPlaying: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  const toggleMessagePlayback = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isPlaying: !msg.isPlaying } : msg
      )
    );
  };

  const generateAudioBars = (count: number, isActive: boolean) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className={`w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full transition-all duration-150 ${
          isActive ? "animate-pulse" : ""
        }`}
        style={{
          height: isActive ? `${20 + Math.random() * 40}px` : "4px",
        }}
      />
    ));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Voice Control Sidebar */}
      <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Radio className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Voice Chat</h1>
              <p className="text-sm text-blue-200">AI Voice Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {/* Voice Controls */}
          <div className="space-y-6">
            {/* Microphone Control */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Voice Input</h3>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full h-16 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                } text-white font-medium shadow-lg`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-6 h-6" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6" />
                    <span>Start Recording</span>
                  </>
                )}
              </button>

              {/* Audio Level Indicator */}
              {isRecording && (
                <div className="mt-4 flex items-center justify-center space-x-1">
                  {generateAudioBars(20, true)}
                </div>
              )}
            </div>

            {/* Volume Control */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Audio Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200 text-sm">Volume</span>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-red-400" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-green-400" />
                    )}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentVolume}
                  onChange={(e) => setCurrentVolume(Number(e.target.value))}
                  disabled={isMuted}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-purple-200 text-sm">
                  {isMuted ? "Muted" : `${currentVolume}%`}
                </div>
              </div>
            </div>

            {/* Voice History */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Voice History</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
                  <Headphones className="w-5 h-5 text-purple-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Morning conversation
                    </p>
                    <p className="text-xs text-purple-300">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
                  <BarChart3 className="w-5 h-5 text-pink-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Voice notes
                    </p>
                    <p className="text-xs text-purple-300">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Voice Settings</span>
          </button>
        </div>
      </div>

      {/* Main Voice Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Voice Header */}
        <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Voice Conversation
              </h2>
              <p className="text-purple-200 mt-1">
                Real-time voice interaction with AI
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-purple-200">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Voice Active</span>
              </div>
              <div className="flex items-center space-x-1">
                {generateAudioBars(8, !isMuted)}
              </div>
            </div>
          </div>
        </div>

        {/* Voice Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-4 animate-slide-up ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Radio className="w-6 h-6 text-white" />
                </div>
              )}

              <div className="relative max-w-2xl">
                <div
                  className={`px-6 py-4 rounded-2xl relative overflow-hidden ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                  }`}
                >
                  {/* Audio Wave Background */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="flex items-center justify-center space-x-1 h-full">
                      {generateAudioBars(12, message.isPlaying)}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleMessagePlayback(message.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            message.isPlaying
                              ? "bg-white/20 text-white"
                              : "bg-white/10 text-purple-200 hover:bg-white/20"
                          }`}
                        >
                          {message.isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-xs text-purple-200">
                          {message.duration}s
                        </span>
                      </div>

                      <span className="text-xs text-purple-200">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audio Visualization */}
                <div className="mt-2 flex items-center justify-center space-x-1">
                  {generateAudioBars(16, message.isPlaying)}
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mic className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {isListening && (
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {generateAudioBars(8, true)}
                  </div>
                  <span className="text-white text-sm">Listening...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice Input Area */}
        <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                } text-white shadow-lg`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>

              <div className="flex-1">
                <div className="text-center">
                  <p className="text-purple-200 text-sm">
                    {isRecording
                      ? "Recording... Click to stop"
                      : "Click the microphone to start voice conversation"}
                  </p>
                  {isRecording && (
                    <div className="mt-2 flex items-center justify-center space-x-1">
                      {generateAudioBars(20, true)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatInterface;
