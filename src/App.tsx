import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ModernChatInterface from "./components/ModernChatInterface";
import VoiceChatInterface from "./components/VoiceChatInterface";
import CollaborativeWorkspace from "./components/CollaborativeWorkspace";
import DragDropInterface from "./components/DragDropInterface";
import AvatarPersonalityInterface from "./components/AvatarPersonalityInterface";
import FigmaShortcutsPage from "./components/FigmaShortcutsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ModernChatInterface />} />
          <Route path="/minimal" element={<CollaborativeWorkspace />} />
          <Route path="/dark" element={<VoiceChatInterface />} />
          <Route path="/dragdrop" element={<DragDropInterface />} />
          <Route path="/avatars" element={<AvatarPersonalityInterface />} />
          <Route path="/figma" element={<FigmaShortcutsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
