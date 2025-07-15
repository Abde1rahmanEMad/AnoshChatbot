# Gmail Setup Guide for Access Code Delivery

This guide will help you set up Gmail to send 4-digit access codes to users via email.

## 🔧 Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to **Security** → **App passwords**
2. Select **Mail** as the app
3. Select **Other (Custom name)** as device
4. Enter a name like "Anosh Chatbot"
5. Click **Generate**
6. **Copy the 16-character password** (you'll only see it once!)

### Step 3: Configure Environment Variables
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your Gmail app password:
   ```bash
   VITE_GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

## 📧 Email Configuration

The email service is configured to send from `marwanmostafa20002000@gmail.com`. If you want to use a different email:

1. Edit `src/services/emailService.js`
2. Update the `EMAIL_CONFIG` object:
   ```javascript
   const EMAIL_CONFIG = {
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: import.meta.env.VITE_GMAIL_APP_PASSWORD
     }
   };
   ```

## 🔒 Security Features

### Access Code Security
- **4-digit codes**: Randomly generated (1000-9999)
- **10-minute expiration**: Codes expire after 10 minutes
- **Single use**: Each code can only be used once
- **Rate limiting**: Prevents abuse

### Email Security
- **Professional template**: Branded email design
- **Security warnings**: Clear instructions for users
- **No sensitive data**: Only sends access codes

## 🧪 Testing the Email Service

### Test Email Sending
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the app and enter your email address
3. Check your inbox for the access code
4. Enter the code to complete login

### Debug Mode
Enable debug mode in `.env`:
```bash
VITE_DEBUG_MODE=true
```

This will show console logs for email operations.

## 🐛 Troubleshooting

### Common Issues

#### "Invalid login" Error
- **Cause**: Incorrect app password
- **Solution**: Regenerate app password and update `.env`

#### "Less secure app access" Error
- **Cause**: 2FA not enabled or wrong password type
- **Solution**: Use app password, not regular password

#### Email Not Received
- **Check spam folder**: Emails might be marked as spam
- **Verify email address**: Ensure correct email format
- **Check console logs**: Look for error messages

#### "Quota exceeded" Error
- **Cause**: Gmail sending limits reached
- **Solution**: Wait or upgrade Gmail account

### Debug Commands

Check pending codes in browser console:
```javascript
// View all pending codes
console.log(emailService.getPendingCodes());

// Clear all codes
emailService.clearAllCodes();
```

## 📱 Email Template Customization

The email template is in `src/services/emailService.js`. You can customize:

### Visual Design
- Colors and gradients
- Fonts and spacing
- Logo and branding

### Content
- Email subject line
- Welcome message
- Security instructions
- Footer text

### Example Customization
```javascript
const createEmailTemplate = (code) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h1>Welcome to Your App!</h1>
      <p>Your access code: <strong>${code}</strong></p>
      <!-- Add your custom content here -->
    </div>
  `;
};
```

## 🚀 Production Deployment

### Environment Variables
For production, ensure these are set:
```bash
VITE_GMAIL_APP_PASSWORD=your-production-app-password
VITE_DEBUG_MODE=false
```

### Email Limits
- **Gmail**: 500 emails/day (free), 2000/day (paid)
- **Consider alternatives**: SendGrid, Mailgun for higher volumes

### Security Best Practices
- Use environment variables for passwords
- Enable HTTPS in production
- Monitor email sending logs
- Implement rate limiting

## 📊 Monitoring

### Email Analytics
Track email delivery in Gmail:
1. Go to Gmail → Settings → Labels
2. Check "Sent" folder for delivery status
3. Monitor bounce rates and spam reports

### Access Code Analytics
The system tracks:
- Codes generated per email
- Expiration times
- Usage patterns
- Failed attempts

## 🔄 Alternative Email Services

If you prefer different email services:

### SendGrid
```javascript
const EMAIL_CONFIG = {
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: 'your-sendgrid-api-key'
  }
};
```

### Mailgun
```javascript
const EMAIL_CONFIG = {
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: 'your-mailgun-username',
    pass: 'your-mailgun-password'
  }
};
```

## ✅ Setup Checklist

- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Generate App Password
- [ ] Update `.env` with app password
- [ ] Test email sending
- [ ] Verify access code delivery
- [ ] Test login flow
- [ ] Check spam folder
- [ ] Monitor email logs

## 🎉 Success!

Once configured, users will:
1. Enter their email address
2. Receive a 4-digit code via email
3. Enter the code to access the chatbot
4. Start chatting immediately

The system is now ready for secure, email-based authentication! 🚀 