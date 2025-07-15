# Anosh Chat Application

A modern chat application built with React, TypeScript, and Node.js featuring email-based authentication and AI integration.

## 🚀 Features

- **Modern Chat Interface**: Clean, responsive chat UI with typing indicators
- **Email Authentication**: Secure login system using Gmail integration
- **AI Integration**: Optional OpenAI integration for enhanced conversations
- **Theme Support**: Light and dark mode themes
- **Real-time Messaging**: Instant message delivery and status updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
anosh/
├── backend/          # Node.js backend server
│   ├── server.js     # Express server with Gmail integration
│   ├── package.json  # Backend dependencies
│   └── env.example   # Environment variables template
├── project/          # React frontend application
│   ├── src/          # Source code
│   │   ├── components/   # React components
│   │   ├── services/     # API and utility services
│   │   ├── contexts/     # React contexts
│   │   └── types/        # TypeScript type definitions
│   ├── package.json  # Frontend dependencies
│   └── env.example   # Environment variables template
└── docs/             # Documentation files
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gmail account for email authentication

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd anosh
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your Gmail credentials
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../project
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Detailed Setup

For detailed setup instructions, see:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup walkthrough
- [GMAIL_SETUP.md](./GMAIL_SETUP.md) - Gmail configuration guide
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

## 🔧 Configuration

### Backend Environment Variables

```env
PORT=3001
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
NODE_ENV=development
```

### Frontend Environment Variables

```env
VITE_APP_NAME=Anosh Demo
VITE_GMAIL_APP_PASSWORD=your-gmail-app-password
VITE_OPENAI_API_KEY=your-openai-key (optional)
VITE_ENABLE_REAL_AI=false
```

## 🚀 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd project
npm run dev  # Starts Vite dev server
```

### Building for Production
```bash
cd project
npm run build  # Creates production build
```

## 🔒 Security

This project includes comprehensive `.gitignore` files to prevent committing sensitive data:

- ✅ Environment files (`.env*`) are ignored
- ✅ API keys and passwords are protected
- ✅ Node modules and build artifacts are ignored
- ✅ Example files are included for reference

**Important**: Never commit actual `.env` files or API keys to version control.

## 📚 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Nodemailer** - Email sending library
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Abdelrahman Emad**
- Email: abdelrahmane801@gmail.com
- GitHub: [@Abde1rahmanEmad](https://github.com/Abde1rahmanEmad)

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Inspired by modern chat applications
- Built with love and attention to detail

---

For more information, check out the documentation files in this repository.
