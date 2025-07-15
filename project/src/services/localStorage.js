// Get environment variables with fallbacks
const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX || 'anosh_demo';

// Local storage keys
const STORAGE_KEYS = {
  ACCESS_CODES: `${STORAGE_PREFIX}_access_codes`,
  CURRENT_SESSION: `${STORAGE_PREFIX}_current_session`,
  CURRENT_CONVERSATION: `${STORAGE_PREFIX}_current_conversation`,
  SETTINGS: `${STORAGE_PREFIX}_settings`
};

// Demo access codes - simple and temporary
const DEMO_ACCESS_CODES = [
  {
    code: '1234',
    isActive: true,
    usageLimit: 999, // High limit for demo
    timesUsed: 0,
    createdAt: new Date().toISOString()
  },
  {
    code: 'DEMO',
    isActive: true,
    usageLimit: 999,
    timesUsed: 0,
    createdAt: new Date().toISOString()
  },
  {
    code: 'TEST',
    isActive: true,
    usageLimit: 999,
    timesUsed: 0,
    createdAt: new Date().toISOString()
  }
];

class DemoStorageService {
  constructor() {
    this.initializeStorage();
  }

  // Initialize storage with demo data
  initializeStorage() {
    if (!this.getAccessCodes().length) {
      this.setAccessCodes(DEMO_ACCESS_CODES);
    }
  }

  // Access Code Management - Simple validation
  getAccessCodes() {
    try {
      const codes = localStorage.getItem(STORAGE_KEYS.ACCESS_CODES);
      return codes ? JSON.parse(codes) : [];
    } catch (error) {
      console.error('Error reading access codes:', error);
      return [];
    }
  }

  setAccessCodes(codes) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_CODES, JSON.stringify(codes));
    } catch (error) {
      console.error('Error saving access codes:', error);
    }
  }

  validateAccessCode(code) {
    const codes = this.getAccessCodes();
    const accessCode = codes.find(c => 
      c.code.toUpperCase() === code.toUpperCase().trim() && 
      c.isActive && 
      c.timesUsed < c.usageLimit
    );

    if (accessCode) {
      // Increment usage for demo tracking
      accessCode.timesUsed += 1;
      accessCode.lastUsedAt = new Date().toISOString();
      this.setAccessCodes(codes);
      return accessCode;
    }

    return null;
  }

  // Session Management - Simple demo session
  createSession(userEmail) {
    const sessionId = `demo_session_${Date.now()}`;
    const session = {
      sessionId,
      userEmail,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
    return session;
  }

  getCurrentSession() {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error reading current session:', error);
      return null;
    }
  }

  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CONVERSATION);
  }

  // Conversation Management - Only current conversation
  getCurrentConversation() {
    try {
      const conversation = localStorage.getItem(STORAGE_KEYS.CURRENT_CONVERSATION);
      return conversation ? JSON.parse(conversation) : null;
    } catch (error) {
      console.error('Error reading current conversation:', error);
      return null;
    }
  }

  createOrGetConversation(sessionId, userEmail) {
    let conversation = this.getCurrentConversation();
    
    if (!conversation) {
      conversation = {
        sessionId,
        userEmail,
        messages: [],
        isActive: true,
        lastActivity: new Date().toISOString(),
        messageCount: 0,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, JSON.stringify(conversation));
    }

    return conversation;
  }

  addMessage(sessionId, sender, content) {
    const conversation = this.getCurrentConversation();
    if (!conversation) return null;

    const messageId = `msg_${Date.now()}`;
    const message = {
      sender,
      content,
      timestamp: new Date().toISOString(),
      messageId
    };

    conversation.messages.push(message);
    conversation.messageCount = conversation.messages.length;
    conversation.lastActivity = new Date().toISOString();

    localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, JSON.stringify(conversation));
    return message;
  }

  clearConversation() {
    const conversation = this.getCurrentConversation();
    if (conversation) {
      conversation.messages = [];
      conversation.messageCount = 0;
      conversation.lastActivity = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, JSON.stringify(conversation));
    }
  }

  // Settings Management - Simple demo settings
  getSettings() {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        theme: 'light',
        autoScroll: true,
        soundEnabled: true
      };
    } catch (error) {
      console.error('Error reading settings:', error);
      return {
        theme: 'light',
        autoScroll: true,
        soundEnabled: true
      };
    }
  }

  setSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  // Demo-specific methods
  resetDemo() {
    try {
      // Clear all demo data
      localStorage.removeItem(STORAGE_KEYS.ACCESS_CODES);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_CONVERSATION);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      
      // Reinitialize with fresh demo data
      this.initializeStorage();
    } catch (error) {
      console.error('Error resetting demo:', error);
    }
  }

  getDemoStats() {
    const session = this.getCurrentSession();
    const conversation = this.getCurrentConversation();
    const codes = this.getAccessCodes();
    
    return {
      hasActiveSession: !!session,
      messageCount: conversation?.messageCount || 0,
      totalAccessCodeUsage: codes.reduce((sum, code) => sum + code.timesUsed, 0),
      sessionDuration: session ? Date.now() - new Date(session.createdAt).getTime() : 0
    };
  }
}

export default new DemoStorageService(); 