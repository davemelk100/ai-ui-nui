import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import ScrollToTop from "./components/ScrollToTop";
import ChatInterface from "./components/ChatInterface";
import ModernChatInterface from "./components/ModernChatInterface";
import VoiceChatInterface from "./components/VoiceChatInterface";
import CollaborativeWorkspace from "./components/CollaborativeWorkspace";
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
          <Route path="/minimal" element={<CollaborativeWorkspace />} />
          <Route path="/dark" element={<VoiceChatInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
