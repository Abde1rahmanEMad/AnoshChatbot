# 🚀 Quick Start Guide - Anosh with Email Authentication

## 📋 Prerequisites

1. **Gmail App Password**: Follow the Gmail setup guide to get your app password
2. **Node.js**: Make sure you have Node.js installed

## 🔧 Setup Steps

### 1. Configure Gmail (One-time setup)

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Anosh Chatbot"
   - Copy the 16-character password

### 2. Configure Backend

1. Create backend environment file:
   ```bash
   cd backend
   cp env.example .env
   ```

2. Edit `backend/.env`:
   ```bash
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Anosh Backend Server running on port 3001
📧 Email service: Ready
🔗 Frontend URL: http://localhost:5173
🔗 Backend URL: http://localhost:3001
```

### 4. Start Frontend (in new terminal)

```bash
cd project
npm run dev
```

You should see:
```
VITE v5.4.8  ready in 7165 ms
➜  Local:   http://localhost:5173/
```

## 🧪 Test the System

1. Open http://localhost:5173 in your browser
2. Enter your email address
3. Check your email for the 4-digit code
4. Enter the code to access the chatbot
5. Start chatting!

## 🔗 Architecture

```
Frontend (React) ←→ Backend (Express) ←→ Gmail SMTP
     ↓                    ↓                    ↓
  User Interface    Email API Server    Email Delivery
```

## 🐛 Troubleshooting

### Backend Issues
- **"Email service: Not configured"**: Check your Gmail app password
- **"Invalid login"**: Regenerate app password
- **Port 3001 in use**: Change PORT in backend/.env

### Frontend Issues
- **"Failed to fetch"**: Make sure backend is running on port 3001
- **CORS errors**: Backend has CORS enabled, should work automatically

### Email Issues
- **No email received**: Check spam folder
- **"Quota exceeded"**: Gmail daily limit reached (500 emails/day free)

## 🎯 Success Indicators

✅ Backend shows "Email service: Ready"  
✅ Frontend loads without errors  
✅ Email received with 4-digit code  
✅ Can login and start chatting  

## 📞 Support

If you encounter issues:
1. Check console logs in both terminals
2. Verify Gmail app password is correct
3. Ensure both servers are running
4. Check browser console for errors

**Ready to test!** 🎉 