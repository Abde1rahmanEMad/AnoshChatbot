# Complete Setup Guide - Frontend + Backend

This guide will help you run the Anosh chatbot with email-based access codes.

## 🏗️ Architecture Overview

```
Frontend (React) ←→ Backend (Express) ←→ Gmail
     Port 5173         Port 3001        SMTP
```

- **Frontend**: React app with email login interface
- **Backend**: Express server handling email sending
- **Email**: Gmail SMTP for access code delivery

## 🔧 Setup Steps

### Step 1: Gmail Configuration

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/
   - Security → 2-Step Verification → Enable

2. **Generate App Password**
   - Security → App passwords
   - Select "Mail" → "Other (Custom name)"
   - Name: "Anosh Chatbot"
   - Copy the 16-character password

### Step 2: Backend Configuration

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create environment file**
   ```bash
   cp env.example .env
   ```

3. **Edit .env file**
   ```bash
   # Backend Configuration
   PORT=3001
   
   # Gmail Configuration
   GMAIL_APP_PASSWORD=your-16-character-app-password
   
   # Development Settings
   NODE_ENV=development
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

### Step 3: Frontend Configuration

1. **Navigate to frontend directory**
   ```bash
   cd ../project
   ```

2. **Create environment file (optional)**
   ```bash
   cp env.example .env
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd project
npm run dev
```

### Option 2: Run Backend Only
```bash
cd backend
npm start
```

### Option 3: Run Frontend Only
```bash
cd project
npm run dev
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Backend API**: http://localhost:3001/api

## 📧 Email Flow

1. **User enters email** → Frontend sends to backend
2. **Backend generates code** → Sends via Gmail
3. **User receives email** → Enters 4-digit code
4. **Backend validates code** → Returns success/failure
5. **User accesses chatbot** → Starts chatting

## 🔍 Testing the System

### 1. Test Backend
```bash
curl http://localhost:3001
# Should return: {"message":"Anosh Backend Server Running"}
```

### 2. Test Email Sending
```bash
curl -X POST http://localhost:3001/api/send-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

### 3. Test Frontend
- Open http://localhost:5173
- Enter your email address
- Check your inbox for the code
- Enter the code to access the chatbot

## 🐛 Troubleshooting

### Backend Issues

**"Email service not available"**
- Check Gmail app password in `.env`
- Verify 2FA is enabled on Gmail
- Check console for error messages

**"Invalid login" Error**
- Regenerate Gmail app password
- Update `.env` file
- Restart backend server

### Frontend Issues

**"Failed to send access code"**
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify network connectivity

**"Server error"**
- Backend server not running
- Check backend console for errors
- Verify API endpoints

### Email Issues

**Email not received**
- Check spam folder
- Verify email address format
- Check Gmail sending limits (500/day free)

**"Quota exceeded"**
- Gmail daily limit reached
- Wait 24 hours or upgrade account
- Consider alternative email service

## 🔒 Security Features

- **4-digit codes**: Random generation (1000-9999)
- **10-minute expiration**: Automatic cleanup
- **Single use**: Codes can't be reused
- **Email validation**: Proper format checking
- **Rate limiting**: Prevents abuse

## 📊 API Endpoints

### Backend API Routes

- `GET /` - Server status
- `POST /api/send-code` - Send access code
- `POST /api/validate-code` - Validate code
- `GET /api/pending-codes` - Debug: view codes
- `DELETE /api/clear-codes` - Debug: clear codes

### Frontend Routes

- `/` - Email login screen
- `/chat` - Chatbot interface (after login)

## 🎯 Success Indicators

✅ **Backend running**: "Anosh Backend Server running on port 3001"  
✅ **Email service ready**: "Email service: Ready"  
✅ **Frontend accessible**: http://localhost:5173 loads  
✅ **Email received**: Access code in inbox  
✅ **Login successful**: Chatbot interface appears  

## 🔄 Development Workflow

1. **Start backend first**: `cd backend && npm run dev`
2. **Start frontend**: `cd project && npm run dev`
3. **Test email flow**: Enter email, check inbox
4. **Debug issues**: Check both console logs
5. **Make changes**: Auto-reload on both servers

## 🚀 Production Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or similar
- Set environment variables
- Configure Gmail app password

### Frontend Deployment
- Build: `npm run build`
- Deploy to Vercel, Netlify, etc.
- Update API URL for production

## 📞 Support

### Debug Commands

**Check backend status:**
```bash
curl http://localhost:3001
```

**View pending codes:**
```bash
curl http://localhost:3001/api/pending-codes
```

**Clear all codes:**
```bash
curl -X DELETE http://localhost:3001/api/clear-codes
```

### Log Locations
- **Backend**: Terminal running backend server
- **Frontend**: Browser console (F12)
- **Email**: Gmail sent folder

## 🎉 Ready to Use!

Once both servers are running:
1. Open http://localhost:5173
2. Enter your email address
3. Check your inbox for the access code
4. Enter the code to start chatting!

The system is now fully functional with secure email-based authentication! 🚀 