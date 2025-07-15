# Anosh Demo Setup Guide

This is a **demo version** of the Anosh chatbot that runs entirely in your browser with no backend or database requirements.

## What This Demo Does

- ✅ **Access Code Entry**: Simple demo codes (1234, DEMO, TEST)
- ✅ **Real-time Chat**: Simulated AI responses with typing indicators
- ✅ **Session Management**: Temporary browser session (clears on refresh)
- ✅ **No Database**: Everything runs in localStorage
- ✅ **No Backend**: Pure frontend application
- ✅ **No API Keys**: Simulated responses, no external dependencies

## Quick Start

1. **Install Dependencies**
   ```bash
   cd project
   npm install
   ```

2. **Create Environment File** (Optional)
   ```bash
   cp env.example .env
   ```
   
   The demo works without any environment variables, but you can customize:
   - `VITE_APP_NAME`: Change the app name
   - `VITE_DEFAULT_THEME`: Set default theme (light/dark)
   - `VITE_MAX_MESSAGE_LENGTH`: Set message character limit

3. **Run the Demo**
   ```bash
   npm run dev
   ```

4. **Access the Demo**
   - Open your browser to `http://localhost:5173`
   - Enter any demo access code: `1234`, `DEMO`, or `TEST`
   - Start chatting!

## Demo Features

### Access Codes
- **1234**: Basic demo code
- **DEMO**: Demo code with high usage limit
- **TEST**: Test code for development

### Chat Features
- **Simulated AI**: Responses are generated locally (no real AI)
- **Typing Indicators**: Realistic typing animation
- **Message History**: Stored temporarily in browser
- **Clear Chat**: Reset conversation anytime
- **Dark/Light Theme**: Toggle between themes

### Storage Behavior
- **Temporary**: Data is lost when you close the browser
- **Session-based**: Each login creates a new session
- **No Persistence**: No long-term storage or cloud sync
- **Demo Stats**: Track basic usage during session

## Demo Limitations

- ❌ **No Real AI**: Responses are simulated
- ❌ **No Cloud Sync**: Data doesn't persist across devices
- ❌ **No Multi-user**: Single user per browser session
- ❌ **No Analytics**: No usage tracking or reporting
- ❌ **No Admin Panel**: No access code management

## Customization

### Change Demo Access Codes
Edit `src/services/localStorage.js`:
```javascript
const DEMO_ACCESS_CODES = [
  {
    code: 'YOUR_CODE',
    isActive: true,
    usageLimit: 999,
    timesUsed: 0,
    createdAt: new Date().toISOString()
  }
];
```

### Modify AI Responses
Edit `src/services/aiService.js` to change how the bot responds.

### Add Demo Features
- Add a "Reset Demo" button to clear all data
- Add demo statistics display
- Add more simulated AI personalities

## Production Migration

If you want to make this a real application later:

1. **Add Real AI**: Uncomment OpenAI variables in `.env`
2. **Add Backend**: Set up Node.js/Express server
3. **Add Database**: Use MongoDB/PostgreSQL for persistence
4. **Add Authentication**: Implement JWT tokens
5. **Add Multi-user**: Support multiple concurrent users

## Troubleshooting

### Demo Not Loading
- Check if all dependencies are installed: `npm install`
- Clear browser cache and localStorage
- Check browser console for errors

### Access Codes Not Working
- Try the default codes: `1234`, `DEMO`, `TEST`
- Check browser console for storage errors
- Reset demo data: `localStorage.clear()` in browser console

### Chat Not Responding
- Check if AI service is working
- Verify message format in console
- Try refreshing the page

## Demo Architecture

```
Frontend (React + Vite)
├── Components (UI)
├── Services
│   ├── localStorage.js (Demo storage)
│   ├── aiService.js (Simulated AI)
│   └── config.js (Environment)
└── Contexts (Theme)
```

This demo is perfect for:
- **Prototyping**: Test UI/UX quickly
- **Presentations**: Show functionality without setup
- **Development**: Iterate on features rapidly
- **Learning**: Understand the app structure
- **Demo Purposes**: No server or database needed 