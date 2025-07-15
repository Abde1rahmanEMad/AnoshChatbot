# Vercel Deployment Guide for Anosh Chat Application

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from your project directory
```bash
vercel
```

## 🔧 Environment Variables Setup

After deployment, you need to configure environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **GMAIL_USER** - Your Gmail address (e.g., `your-email@gmail.com`)
2. **GMAIL_APP_PASSWORD** - Your Gmail app password
3. **VITE_OPENAI_API_KEY** - Your OpenAI API key (optional)
4. **VITE_OPENAI_MODEL** - OpenAI model to use (default: `gpt-4`)
5. **VITE_ENABLE_REAL_AI** - Set to `true` to enable AI features

### Setting Environment Variables:

#### Option 1: Through Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click on "Settings"
3. Go to "Environment Variables"
4. Add each variable with its value

#### Option 2: Using Vercel CLI
```bash
vercel env add GMAIL_USER
vercel env add GMAIL_APP_PASSWORD
vercel env add VITE_OPENAI_API_KEY
vercel env add VITE_OPENAI_MODEL
vercel env add VITE_ENABLE_REAL_AI
```

## 🔄 Redeployment

After setting environment variables, redeploy your application:
```bash
vercel --prod
```

## 📋 Pre-deployment Checklist

- ✅ Gmail App Password configured
- ✅ OpenAI API key available (optional)
- ✅ All sensitive data in environment variables
- ✅ No `.env` files committed to git
- ✅ Project builds locally without errors

## 🌐 Post-deployment Testing

1. **Test Email Functionality**
   - Try requesting an access code
   - Check if emails are being sent

2. **Test AI Chat (if enabled)**
   - Send messages to the AI
   - Verify responses are working

3. **Check Console Logs**
   - Monitor Vercel function logs for any errors

## 🛠️ Troubleshooting

### Common Issues:

1. **Email not sending**
   - Verify Gmail credentials in environment variables
   - Check if 2FA is enabled and app password is correct

2. **AI not responding**
   - Verify OpenAI API key is set correctly
   - Check if you have sufficient OpenAI credits

3. **Build errors**
   - Run `npm run build` locally first
   - Check for TypeScript errors

### Debug Commands:
```bash
# Check deployment logs
vercel logs

# Check environment variables
vercel env ls

# Redeploy with verbose output
vercel --debug
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

## 🔒 Security Best Practices

1. **Never commit `.env` files**
2. **Use environment variables for all secrets**
3. **Regularly rotate API keys**
4. **Monitor usage and logs**
5. **Enable Vercel's security features**

---

🎉 Your Anosh Chat Application should now be live on Vercel!
