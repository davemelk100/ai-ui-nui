# Melks Chat Interface

A modern, beautiful React application that replicates the interface of popular AI chat platforms like ChatGPT, Grok, Perplexity, and Claude. Built with TypeScript, Tailwind CSS, and Lucide React icons. Features multiple UI variations to showcase different design approaches.

## Features

### 🎨 Modern UI/UX

- Clean, minimalist design inspired by popular AI chat interfaces
- Responsive layout with sidebar navigation
- Smooth animations and transitions
- Custom scrollbar styling
- Hover effects and interactive elements

### 💬 Chat Functionality

- Real-time message display with typing indicators
- Message timestamps
- Auto-resizing text input
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Message actions (copy, feedback, more options)
- Smooth scrolling to latest messages
- Melks assistant integration

### 🔧 Interactive Elements

- Sidebar with chat history
- New chat button
- Settings panel
- Message feedback system (thumbs up/down)
- Copy message functionality
- Online status indicator

### 🎯 Key Components

- **TopNav**: Navigation bar with links to different UI versions
- **ChatInterface**: Classic chat interface with sidebar and message area
- **ModernChatInterface**: Contemporary design with enhanced styling
- **Message**: Individual message component with actions
- **Utils**: Utility functions for class name management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-ui-nui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── TopNav.tsx           # Top navigation component
│   ├── ChatInterface.tsx    # Classic chat interface component
│   ├── ModernChatInterface.tsx # Modern chat interface component
│   └── Message.tsx          # Individual message component
├── lib/
│   └── utils.ts             # Utility functions
├── App.tsx                  # Main app component with routing
├── index.tsx                # App entry point
└── index.css                # Global styles and Tailwind directives
```

## Customization

### Styling

The app uses Tailwind CSS for styling. You can customize the design by:

- Modifying the `tailwind.config.js` file
- Updating color schemes in the components
- Adding new animations in the CSS file

### Features

To add new features:

- Extend the Message interface for additional properties
- Add new action buttons in the Message component
- Implement real AI API integration in the ChatInterface

### AI Integration

To connect to a real AI service:

1. Replace the simulated response in `ChatInterface.tsx`
2. Add API configuration
3. Implement proper error handling
4. Add loading states and retry mechanisms

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **clsx** - Conditional class names
- **tailwind-merge** - Tailwind class merging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by ChatGPT, Grok, Perplexity, and Claude interfaces
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
