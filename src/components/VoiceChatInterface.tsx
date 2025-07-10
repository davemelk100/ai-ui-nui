import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  BarChart3,
  Settings,
  Headphones,
  Radio,
} from "lucide-react";
import Layout from "./Layout";

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
        "Hello! I'm your AI assistant. I'm ready for a voice conversation. Just click the microphone to start speaking.",
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
          "I heard your voice message! This is your AI assistant responding with a simulated voice response. The interface shows audio visualizations and speech patterns.",
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

  const voiceSidebarContent = (
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
      </div>
    </div>
  );

  return (
    <Layout
      title="Voice Chat"
      description="AI Voice Assistant"
      icon={<Radio className="w-6 h-6 text-white" />}
      sidebarContent={voiceSidebarContent}
      theme="dark"
    >
      {/* Voice Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-4 ${
              message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
              } shadow-lg`}
            >
              {message.role === "user" ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <Headphones className="w-6 h-6 text-white" />
              )}
            </div>

            <div
              className={`flex-1 max-w-2xl ${
                message.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block p-6 rounded-2xl shadow-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                }`}
              >
                <p className="text-lg leading-relaxed">{message.content}</p>

                {/* Audio Visualization */}
                <div className="mt-4 flex items-center space-x-3">
                  <button
                    onClick={() => toggleMessagePlayback(message.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      message.role === "user"
                        ? "bg-white/20 hover:bg-white/30"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {message.isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex items-center space-x-1">
                    {generateAudioBars(15, message.isPlaying)}
                  </div>

                  <span className="text-sm opacity-75">
                    {message.duration}s
                  </span>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-400">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </Layout>
  );
};

export default VoiceChatInterface;
