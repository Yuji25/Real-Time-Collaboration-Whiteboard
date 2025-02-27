# 🎨 Real-Time Collaborative Whiteboard

A powerful, real-time collaborative whiteboard application that enables multiple users to draw, sketch, and brainstorm together seamlessly. Built with Node.js, Express, and Socket.IO for real-time collaboration.

![Collaborative Whiteboard Demo](https://github.com/Yuji25/Real-Time-Collaboration-Whiteboard/blob/main/public/assets/others/main.png?raw=true)

## ✨ Features

### Real-Time Collaboration
- 🤝 Multiple users can draw simultaneously
- 🔄 Instant synchronization across all connected clients
- 👥 See others' changes in real-time

### Drawing Tools
- ✏️ Pen tool with adjustable width
- 👆 Pointer tool for presentations
- ⚪ Various shape tools (Rectangle, Circle, Line, Triangle)
- ❌ Eraser tool
- 🗑️ Clear canvas option

### Colors & Styling
- 🎨 Rich color palette
- 📏 Adjustable stroke width
- 🖌️ Different brush styles

### Canvas Controls
- ↩️ Undo functionality
- ↪️ Redo functionality
- 🔍 Fullscreen mode
- 💾 Save canvas as image

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher)
- npm (Node Package Manager)

## 🌐 Live Demo

Try out the whiteboard right now! The project is deployed and accessible online.

### Live URL: [Real-Time Collaborative Whiteboard](https://real-time-collaboration-whiteboard.onrender.com)

#### How to test the live collaboration:
1. Open the URL in two different browsers or devices
2. Start drawing in one window
3. See your changes appear instantly in the other window
4. Try out different features like:
   - Drawing with different colors
   - Using the eraser
   - Clearing the canvas
   - Testing undo/redo
   - Switching to fullscreen mode

> Note: The live demo is hosted on Render, so it might take a few seconds to wake up if it hasn't been accessed recently.

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/real-time-collaborative-whiteboard.git
cd real-time-collaborative-whiteboard
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:5501
```

## 💻 Technology Stack

- **Frontend:**
  - HTML5 Canvas
  - JavaScript (Vanilla)
  - CSS3

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO

## 🎯 Key Components

### Drawing System
- Smooth, responsive drawing engine
- Real-time stroke synchronization
- Efficient canvas state management

### Collaboration Features
- WebSocket-based real-time updates
- Automatic client synchronization
- Robust connection handling

### User Interface
- Clean, intuitive design
- Responsive layout
- Easy-to-use toolset
- Fullscreen capability

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🎉 Features in Detail

### Drawing Tools
| Tool | Description |
|------|-------------|
| Pen | Free-hand drawing with customizable width |
| Pointer | Non-drawing pointer for presentations |
| Eraser | Remove parts of drawing |
| Shapes | Basic geometric shapes |
| Clear All | Reset entire canvas |

### Canvas Controls
| Control | Function |
|---------|----------|
| Undo | Reverse last action |
| Redo | Restore previously undone action |
| Fullscreen | Maximize canvas area |
| Save | Download canvas as image |

## 🛠️ Setup for Development

1. Fork the repository
2. Install dependencies:
```bash
npm install express socket.io
```
3. Start development server:
```bash
node server.js
```
4. Make changes and test in browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Socket.IO team for the amazing real-time engine
- Express.js for the robust server framework
- All contributors who have helped shape this project

---

<div align="center">
Made with ❤️ by Lavanya Soni
</div>

