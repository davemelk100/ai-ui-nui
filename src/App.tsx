import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import ScrollToTop from "./components/ScrollToTop";
import ChatInterface from "./components/ChatInterface";
import ModernChatInterface from "./components/ModernChatInterface";
import VoiceChatInterface from "./components/VoiceChatInterface";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <TopNav />
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/modern" element={<ModernChatInterface />} />
          <Route
            path="/minimal"
            element={
              <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Minimal Interface
                  </h1>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </div>
            }
          />
          <Route path="/dark" element={<VoiceChatInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
