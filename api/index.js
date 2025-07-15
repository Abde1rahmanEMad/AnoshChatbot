import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'marwanmostafa20002000@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
};

// Generate a random 4-digit code
const generateAccessCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Email template for access code
const createEmailTemplate = (code) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Anosh Chatbot</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Access Code</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <h2 style="color: #333; margin-bottom: 20px;">Welcome to Anosh!</h2>
        
        <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
          Thank you for requesting access to Anosh chatbot. Here's your unique access code:
        </p>
        
        <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
          <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
            ${code}
          </div>
        </div>
        
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
          <strong>Important:</strong> This code is valid for 10 minutes and can only be used once.
        </p>
        
        <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #1976d2; font-size: 14px;">
            <strong>Security Note:</strong> Never share this code with anyone. Anosh will never ask for this code via email or phone.
          </p>
        </div>
        
        <p style="color: #666; line-height: 1.6; margin-top: 25px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
        <p>This is an automated message from Anosh Chatbot</p>
        <p>© 2024 Anosh. All rights reserved.</p>
      </div>
    </div>
  `;
};

// Store pending codes (for serverless, you might want to use Redis or database in production)
const pendingCodes = new Map();

// Clean up expired codes
const cleanupExpiredCodes = () => {
  const now = Date.now();
  for (const [email, data] of pendingCodes.entries()) {
    if (now > data.expirationTime) {
      pendingCodes.delete(email);
    }
  }
};

// Initialize email transporter
let transporter;
try {
  transporter = nodemailer.createTransporter(EMAIL_CONFIG);
} catch (error) {
  console.error('Failed to initialize email service:', error);
}

// Initialize OpenAI client
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
  });
} catch (error) {
  console.error('Failed to initialize OpenAI service:', error);
}

// Routes
app.get('/api/', (req, res) => {
  res.json({ message: 'Anosh Backend Server Running on Vercel' });
});

// Send access code
app.post('/api/send-code', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    if (!transporter) {
      return res.status(500).json({ success: false, error: 'Email service not available' });
    }

    // Generate code
    const code = generateAccessCode();
    const expirationTime = Date.now() + (10 * 60 * 1000); // 10 minutes
    
    // Store code with expiration
    pendingCodes.set(email, {
      code,
      expirationTime,
      used: false
    });

    // Clean up expired codes
    cleanupExpiredCodes();

    // Email options
    const mailOptions = {
      from: `"Anosh Chatbot" <${EMAIL_CONFIG.auth.user}>`,
      to: email,
      subject: 'Your Anosh Chatbot Access Code',
      html: createEmailTemplate(code)
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Failed to send access code:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Validate access code
app.post('/api/validate-code', (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ valid: false, message: 'Email and code are required' });
    }

    const storedData = pendingCodes.get(email);
    
    if (!storedData) {
      return res.json({ valid: false, message: 'No access code found for this email' });
    }

    if (storedData.used) {
      return res.json({ valid: false, message: 'This access code has already been used' });
    }

    if (Date.now() > storedData.expirationTime) {
      pendingCodes.delete(email);
      return res.json({ valid: false, message: 'Access code has expired' });
    }

    if (storedData.code !== code) {
      return res.json({ valid: false, message: 'Invalid access code' });
    }

    // Mark code as used
    storedData.used = true;
    pendingCodes.set(email, storedData);

    res.json({ valid: true, message: 'Access code validated successfully' });
  } catch (error) {
    console.error('Failed to validate code:', error);
    res.status(500).json({
      valid: false,
      message: 'Server error'
    });
  }
});

// Chat with AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    if (!openai) {
      return res.status(500).json({ success: false, error: 'AI service not available' });
    }

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: 'You are Anosh, a helpful and friendly AI assistant. Be concise, clear, and engaging in your responses.'
      }
    ];

    // Add conversation history if it exists and is valid
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach(msg => {
        if (msg && msg.role && msg.content) {
          messages.push({
            role: msg.role,
            content: msg.content
          });
        }
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: message
    });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.VITE_OPENAI_MODEL || 'gpt-4',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    
    res.json({
      success: true,
      response: aiResponse,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]
    });
  } catch (error) {
    console.error('Failed to generate AI response:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// For Vercel serverless functions
export default app;
