// Configuration service for environment variables and app settings
class ConfigService {
  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    // App Configuration
    this.appName = import.meta.env.VITE_APP_NAME || 'Anosh Chatbot';
    this.appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';
    
    // Feature Flags
    this.enableRealAI = import.meta.env.VITE_ENABLE_REAL_AI === 'true';
    this.enableBackendAPI = import.meta.env.VITE_ENABLE_BACKEND_API === 'true';
    
    // Development Settings
    this.debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';
    this.logLevel = import.meta.env.VITE_LOG_LEVEL || 'info';
    
    // Storage Configuration
    this.storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || 'anosh';
    this.maxStorageSize = parseInt(import.meta.env.VITE_MAX_STORAGE_SIZE) || 5242880; // 5MB
    
    // UI Configuration
    this.defaultTheme = import.meta.env.VITE_DEFAULT_THEME || 'light';
    this.enableAnimations = import.meta.env.VITE_ENABLE_ANIMATIONS !== 'false';
    
    // Chat Configuration
    this.maxMessageLength = parseInt(import.meta.env.VITE_MAX_MESSAGE_LENGTH) || 2000;
    this.typingDelayMin = parseInt(import.meta.env.VITE_TYPING_DELAY_MIN) || 500;
    this.typingDelayMax = parseInt(import.meta.env.VITE_TYPING_DELAY_MAX) || 2000;
    
    // API Configuration
    this.apiUrl = import.meta.env.VITE_API_URL || this.getDefaultApiUrl();
    this.wsUrl = import.meta.env.VITE_WS_URL;
    
    // OpenAI Configuration (for future use)
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.openaiModel = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4';
    
    // Access Codes
    this.defaultAccessCodes = this.parseAccessCodes();
  }

  parseAccessCodes() {
    try {
      const envCodes = import.meta.env.VITE_DEFAULT_ACCESS_CODES;
      if (envCodes) {
        return JSON.parse(envCodes);
      }
    } catch (error) {
      console.warn('Failed to parse VITE_DEFAULT_ACCESS_CODES, using fallback codes');
    }
    
    // Fallback default access codes
    return ['1234', 'DEMO2024', 'TEST123'];
  }

  // Get default API URL based on environment
  getDefaultApiUrl() {
    if (import.meta.env.DEV) {
      return 'http://localhost:3001';
    }
    // In production, use relative URLs for Vercel deployment
    return window.location.origin;
  }

  // Get storage key with prefix
  getStorageKey(key) {
    return `${this.storagePrefix}_${key}`;
  }

  // Check if real AI is enabled
  isRealAIEnabled() {
    return this.enableRealAI && this.openaiApiKey;
  }

  // Check if backend API is enabled
  isBackendAPIEnabled() {
    return this.enableBackendAPI && this.apiUrl;
  }

  // Get all configuration as object
  getAll() {
    return {
      app: {
        name: this.appName,
        version: this.appVersion
      },
      features: {
        realAI: this.enableRealAI,
        backendAPI: this.enableBackendAPI
      },
      development: {
        debugMode: this.debugMode,
        logLevel: this.logLevel
      },
      storage: {
        prefix: this.storagePrefix,
        maxSize: this.maxStorageSize
      },
      ui: {
        defaultTheme: this.defaultTheme,
        enableAnimations: this.enableAnimations
      },
      chat: {
        maxMessageLength: this.maxMessageLength,
        typingDelayMin: this.typingDelayMin,
        typingDelayMax: this.typingDelayMax
      },
      api: {
        url: this.apiUrl,
        wsUrl: this.wsUrl
      },
      openai: {
        apiKey: this.openaiApiKey ? '***' : null, // Hide API key
        model: this.openaiModel
      },
      accessCodes: this.defaultAccessCodes
    };
  }

  // Log configuration (without sensitive data)
  logConfig() {
    if (this.debugMode) {
      console.log('App Configuration:', this.getAll());
    }
  }

  // Validate configuration
  validate() {
    const errors = [];
    
    if (this.maxMessageLength <= 0) {
      errors.push('VITE_MAX_MESSAGE_LENGTH must be greater than 0');
    }
    
    if (this.typingDelayMin < 0) {
      errors.push('VITE_TYPING_DELAY_MIN must be non-negative');
    }
    
    if (this.typingDelayMax < this.typingDelayMin) {
      errors.push('VITE_TYPING_DELAY_MAX must be greater than VITE_TYPING_DELAY_MIN');
    }
    
    if (this.maxStorageSize <= 0) {
      errors.push('VITE_MAX_STORAGE_SIZE must be greater than 0');
    }
    
    if (errors.length > 0) {
      console.error('Configuration validation errors:', errors);
      return false;
    }
    
    return true;
  }
}

export default new ConfigService(); 