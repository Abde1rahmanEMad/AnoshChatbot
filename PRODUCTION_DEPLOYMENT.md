# 🚀 Production Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Frontend (React/Vite)
- [x] Markdown rendering with `react-markdown`
- [x] Math rendering with `remark-math` and `rehype-katex`
- [x] Responsive design with Tailwind CSS
- [x] Dark mode support
- [x] Production build configuration
- [x] Environment variables configured

### ✅ Backend (Vercel Serverless)
- [x] CORS properly configured for production
- [x] OpenAI API integration
- [x] Gmail email service
- [x] Environment variables secured
- [x] Error handling implemented

### ✅ Configuration
- [x] Vercel configuration (`vercel.json`)
- [x] Production environment variables
- [x] Security headers
- [x] HTTPS enforcement

## 🛠️ Deployment Steps

### 1. **Prepare Your Domain**
Replace placeholder domains in these files:
- `backend/server.js` (line with CORS origins)
- `api/index.js` (line with CORS origins)
- `vercel-env-variables.txt` (FRONTEND_URL)

### 2. **Set Up Environment Variables**
In your Vercel dashboard, add these environment variables:

#### Required Variables:
```
NODE_ENV=production
OPENAI_API_KEY=sk-your-actual-openai-api-key
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
OPENAI_MODEL=gpt-4o
FRONTEND_URL=https://your-domain.vercel.app
```

#### Optional Frontend Variables:
```
VITE_APP_NAME=Anosh Chatbot
VITE_DEBUG_MODE=false
VITE_DEFAULT_THEME=light
VITE_ENABLE_ANIMATIONS=true
```

### 3. **Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-deploy on push

### 4. **Configure Custom Domain (Optional)**
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update CORS origins in the code
4. Update FRONTEND_URL environment variable

## 🔧 Post-Deployment Testing

### Test These Features:
1. **Chat Functionality**
   - Send a message to the chatbot
   - Verify AI responses are working
   - Check markdown rendering
   - Test math equation rendering

2. **Email Functionality**
   - Request an access code
   - Verify email is sent
   - Test access code validation

3. **UI/UX**
   - Test responsive design
   - Verify dark mode toggle
   - Check all animations work

4. **Performance**
   - Test loading speeds
   - Verify no console errors
   - Check mobile responsiveness

## 🔒 Security Checklist

### ✅ Implemented Security Measures:
- [x] API keys stored in environment variables
- [x] CORS configured for specific domains
- [x] HTTPS enforced in production
- [x] No sensitive data in client-side code
- [x] Input validation on all endpoints
- [x] Error handling without exposing internals

### 🔍 Additional Security Recommendations:
- [ ] Set up rate limiting
- [ ] Add request logging
- [ ] Configure security headers
- [ ] Set up monitoring and alerts

## 📊 Monitoring & Maintenance

### Environment Variables to Monitor:
- OpenAI API usage and costs
- Gmail sending limits
- Vercel function execution times
- Error rates and logs

### Regular Maintenance:
- Update dependencies monthly
- Monitor API usage and costs
- Check for security updates
- Backup environment variables

## 🆘 Troubleshooting

### Common Issues:

#### 1. **CORS Errors**
- Check CORS origins in backend code
- Verify FRONTEND_URL environment variable
- Ensure domains match exactly

#### 2. **OpenAI API Errors**
- Verify OPENAI_API_KEY is set correctly
- Check API key permissions and limits
- Monitor OpenAI usage dashboard

#### 3. **Email Not Sending**
- Verify Gmail credentials
- Check Gmail app password is correct
- Ensure Gmail account has 2FA enabled

#### 4. **Math Not Rendering**
- Check if KaTeX CSS is loaded
- Verify math syntax is correct
- Check browser console for errors

## 🎯 Production URLs

After deployment, your app will be available at:
- **Frontend**: `https://your-domain.vercel.app`
- **API**: `https://your-domain.vercel.app/api/*`

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify environment variables are set correctly
4. Test locally first to isolate issues

---

**🎉 Your Anosh Chatbot is now production-ready!** 