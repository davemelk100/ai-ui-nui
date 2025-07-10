import React, { useRef, useEffect, useState } from "react";
import {
  Zap,
  MousePointer,
  Type,
  PenTool,
  Layers,
  Grid3X3,
  Palette,
  Apple,
  Monitor,
} from "lucide-react";
import Layout from "./Layout";

const FigmaShortcutsPage: React.FC = () => {
  // Create refs for each category
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isListView, setIsListView] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
    position: { x: number; y: number } | null;
  }>({
    message: "",
    visible: false,
    position: null,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyToClipboard = async (text: string, event: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(text);
      const rect = event.currentTarget?.getBoundingClientRect();
      if (!rect) {
        // Fallback to a default position if we can't get the element position
        setToast({
          message: `Copied: ${text}`,
          visible: true,
          position: { x: 100, y: 100 },
        });
        setTimeout(() => {
          setToast({ message: "", visible: false, position: null });
        }, 2000);
        return;
      }
      setToast({
        message: `Copied: ${text}`,
        visible: true,
        position: { x: rect.left, y: rect.top - 40 },
      });
      setTimeout(() => {
        setToast({ message: "", visible: false, position: null });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      const rect = event.currentTarget?.getBoundingClientRect();
      if (!rect) {
        // Fallback to a default position if we can't get the element position
        setToast({
          message: "Failed to copy shortcut",
          visible: true,
          position: { x: 100, y: 100 },
        });
        setTimeout(() => {
          setToast({ message: "", visible: false, position: null });
        }, 2000);
        return;
      }
      setToast({
        message: "Failed to copy shortcut",
        visible: true,
        position: { x: rect.left, y: rect.top - 40 },
      });
      setTimeout(() => {
        setToast({ message: "", visible: false, position: null });
      }, 2000);
    }
  };

  const shortcuts = [
    {
      category: "Basic Navigation",
      icon: <MousePointer className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        {
          name: "Zoom In/Out",
          mac: "Cmd + / Cmd -",
          windows: "Ctrl + / Ctrl -",
        },
        { name: "Fit to screen", mac: "Shift + 1", windows: "Shift + 1" },
        { name: "Zoom to selection", mac: "Shift + 2", windows: "Shift + 2" },
        { name: "Show/Hide UI", mac: "Cmd + \\", windows: "Ctrl + \\" },
        { name: "Pan", mac: "Spacebar + drag", windows: "Spacebar + drag" },
      ],
    },
    {
      category: "Editing & Design",
      icon: <PenTool className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      items: [
        {
          name: "Copy/Paste",
          mac: "Cmd + C / Cmd + V",
          windows: "Ctrl + C / Ctrl + V",
        },
        { name: "Duplicate", mac: "Option + Drag", windows: "Alt + Drag" },
        { name: "Nudge (1px)", mac: "Arrow Keys", windows: "Arrow Keys" },
        {
          name: "Nudge (10px)",
          mac: "Shift + Arrow Keys",
          windows: "Shift + Arrow Keys",
        },
        { name: "Group", mac: "Cmd + G", windows: "Ctrl + G" },
        {
          name: "Ungroup",
          mac: "Shift + Cmd + G",
          windows: "Shift + Ctrl + G",
        },
        {
          name: "Frame selection",
          mac: "Option + Cmd + G",
          windows: "Ctrl + Alt + G",
        },
        { name: "Flatten (vector merge)", mac: "Cmd + E", windows: "Ctrl + E" },
      ],
    },
    {
      category: "Selection & Layers",
      icon: <Layers className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      items: [
        { name: "Select all", mac: "Cmd + A", windows: "Ctrl + A" },
        {
          name: "Deep select (into groups)",
          mac: "Cmd + Click",
          windows: "Ctrl + Click",
        },
        { name: "Rename layer", mac: "Cmd + R", windows: "Ctrl + R" },
        {
          name: "Move layer up/down",
          mac: "Cmd + ] / [",
          windows: "Ctrl + ] / [",
        },
        {
          name: "Bring to front/back",
          mac: "Shift + Cmd + ] / [",
          windows: "Shift + Ctrl + ] / [",
        },
      ],
    },
    {
      category: "Layout & Constraints",
      icon: <Grid3X3 className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      items: [
        {
          name: "Show/hide layout grids",
          mac: "Ctrl + G",
          windows: "Ctrl + G",
        },
        {
          name: "Toggle snapping",
          mac: "Cmd + Shift + \\",
          windows: "Ctrl + Shift + \\",
        },
        {
          name: "Set constraints",
          mac: "Use right panel",
          windows: "Use right panel",
        },
      ],
    },
    {
      category: "Tools",
      icon: <Palette className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
      items: [
        { name: "Move tool", mac: "V", windows: "V" },
        { name: "Scale tool", mac: "K", windows: "K" },
        { name: "Frame tool", mac: "F", windows: "F" },
        { name: "Rectangle tool", mac: "R", windows: "R" },
        { name: "Line tool", mac: "L", windows: "L" },
        { name: "Text tool", mac: "T", windows: "T" },
        { name: "Pen tool", mac: "P", windows: "P" },
        { name: "Comment tool", mac: "C", windows: "C" },
        { name: "Hand tool", mac: "H", windows: "H" },
        { name: "Eyedropper", mac: "I", windows: "I" },
      ],
    },
    {
      category: "Text Formatting",
      icon: <Type className="w-5 h-5" />,
      color: "from-teal-500 to-cyan-500",
      items: [
        { name: "Bold", mac: "Cmd + B", windows: "Ctrl + B" },
        { name: "Italic", mac: "Cmd + I", windows: "Ctrl + I" },
        { name: "Underline", mac: "Cmd + U", windows: "Ctrl + U" },
        {
          name: "Increase/decrease font size",
          mac: "Cmd + Shift + > / <",
          windows: "Ctrl + Shift + > / <",
        },
      ],
    },
    {
      category: "Smart Shortcuts",
      icon: <Zap className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500",
      items: [
        { name: "Quick actions", mac: "Cmd + /", windows: "Ctrl + /" },
        {
          name: "Toggle outlines (wireframe)",
          mac: "Ctrl + Y",
          windows: "Ctrl + Y",
        },
        {
          name: "Swap fill and stroke",
          mac: "Shift + X",
          windows: "Shift + X",
        },
        { name: "Toggle pixel preview", mac: "Ctrl + P", windows: "Ctrl + P" },
      ],
    },
  ];

  const headerActions = (
    <>
      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setIsListView(false)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !isListView
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setIsListView(true)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isListView
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          List
        </button>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span>macOS / Windows</span>
      </div>
    </>
  );

  return (
    <Layout
      title="Figma Shortcuts"
      description="Essential shortcuts every designer should know to work faster and more efficiently"
      icon={<Palette className="w-6 h-6 text-white" />}
      headerActions={headerActions}
    >
      {/* Toast Notification */}
      {toast.visible && toast.position && (
        <div
          className="fixed z-50 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-sm font-medium"
          style={{
            left: `${toast.position.x}px`,
            top: `${toast.position.y}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Shortcuts Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!isListView ? (
          <div className="grid grid-cols-7 gap-4 max-w-full mx-auto items-start">
            {shortcuts.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                ref={(el) => {
                  categoryRefs.current[categoryIndex] = el;
                }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-w-0 h-fit"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} px-3 py-3`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">
                        {category.category}
                      </h3>
                      <p className="text-white/80 text-xs">
                        {category.items.length} shortcuts
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shortcuts List */}
                <div className="p-3">
                  <div className="space-y-2">
                    {category.items.map((shortcut, shortcutIndex) => (
                      <div
                        key={shortcutIndex}
                        className="p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="mb-2">
                          <h4 className="font-medium text-gray-900 text-xs leading-tight">
                            {shortcut.name}
                          </h4>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Apple className="w-3 h-3 text-gray-500" />
                              <kbd
                                onClick={(e) =>
                                  copyToClipboard(shortcut.mac, e)
                                }
                                className="px-1 py-1 text-xs font-mono bg-gray-200 text-gray-800 rounded border flex-1 text-center cursor-pointer hover:bg-gray-300 transition-colors"
                                title="Click to copy"
                              >
                                {shortcut.mac}
                              </kbd>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Monitor className="w-3 h-3 text-gray-500" />
                              <kbd
                                onClick={(e) =>
                                  copyToClipboard(shortcut.windows, e)
                                }
                                className="px-1 py-1 text-xs font-mono bg-gray-200 text-gray-800 rounded border flex-1 text-center cursor-pointer hover:bg-gray-300 transition-colors"
                                title="Click to copy"
                              >
                                {shortcut.windows}
                              </kbd>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {shortcuts.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  ref={(el) => {
                    categoryRefs.current[categoryIndex] = el;
                  }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Category Header */}
                  <div
                    className={`bg-gradient-to-r ${category.color} px-4 py-3`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {category.category}
                        </h3>
                        <p className="text-white/80 text-xs">
                          {category.items.length} shortcuts
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shortcuts List */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {category.items.map((shortcut, shortcutIndex) => (
                        <div
                          key={shortcutIndex}
                          className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {shortcut.name}
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Apple className="w-4 h-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-600">
                                  macOS
                                </span>
                              </div>
                              <kbd
                                onClick={(e) =>
                                  copyToClipboard(shortcut.mac, e)
                                }
                                className="w-full px-3 py-2 text-sm font-mono bg-gray-200 text-gray-800 rounded-lg border cursor-pointer hover:bg-gray-300 transition-colors text-center"
                                title="Click to copy"
                              >
                                {shortcut.mac}
                              </kbd>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Monitor className="w-4 h-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-600">
                                  Windows
                                </span>
                              </div>
                              <kbd
                                onClick={(e) =>
                                  copyToClipboard(shortcut.windows, e)
                                }
                                className="w-full px-3 py-2 text-sm font-mono bg-gray-200 text-gray-800 rounded-lg border cursor-pointer hover:bg-gray-300 transition-colors text-center"
                                title="Click to copy"
                              >
                                {shortcut.windows}
                              </kbd>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FigmaShortcutsPage;
