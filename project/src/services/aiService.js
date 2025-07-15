// Simulated AI responses for different conversation contexts
const AI_RESPONSES = {
  greetings: [
    "Hello! I'm Anosh, your AI assistant. How can I help you today?",
    "Hi there! I'm here to assist you with any questions or tasks you might have.",
    "Greetings! I'm Anosh, ready to help you with whatever you need.",
    "Hello! How can I be of service to you today?"
  ],
  
  questions: [
    "That's an interesting question! Let me think about that for a moment...",
    "I understand what you're asking. Here's what I think about that...",
    "Thanks for sharing that with me. Based on what you've said, I'd suggest...",
    "That's a great point! I'd like to add that...",
    "I see what you mean. Let me provide some more information about that.",
    "Absolutely! That's something I can definitely help you with.",
    "I appreciate you bringing that up. Here's my perspective on it...",
    "That's a thoughtful question. From my experience, I'd say..."
  ],
  
  help: [
    "I'm here to help! What specific assistance do you need?",
    "I'd be happy to help you with that. Could you provide more details?",
    "Let me see how I can best assist you with this.",
    "I'm ready to help! What would you like to know?"
  ],
  
  thanks: [
    "You're very welcome! I'm glad I could help.",
    "It's my pleasure! Is there anything else you'd like assistance with?",
    "You're welcome! Feel free to ask if you need anything else.",
    "Happy to help! Let me know if you have more questions."
  ],
  
  goodbye: [
    "Goodbye! It was great chatting with you. Take care!",
    "See you later! Feel free to come back anytime you need help.",
    "Farewell! I hope our conversation was helpful.",
    "Goodbye! Have a wonderful day ahead!"
  ],
  
  unknown: [
    "I'm not quite sure how to respond to that. Could you rephrase or ask something else?",
    "That's an interesting point, but I'm not sure I understand. Could you clarify?",
    "I'd like to help, but I need a bit more context. Could you explain further?",
    "I'm still learning and that's a bit beyond my current capabilities. Could you try asking something else?"
  ]
};

// Context-aware response patterns
const RESPONSE_PATTERNS = {
  greeting: /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i,
  question: /\?$/,
  help: /\b(help|assist|support|guide)\b/i,
  thanks: /\b(thanks|thank you|appreciate|grateful)\b/i,
  goodbye: /\b(bye|goodbye|see you|farewell|later)\b/i
};

class AIService {
  constructor() {
    this.conversationHistory = [];
    
    // Get configuration from environment variables
    this.responseDelay = parseInt(import.meta.env.VITE_TYPING_DELAY_MIN) || 1000;
    this.maxDelay = parseInt(import.meta.env.VITE_TYPING_DELAY_MAX) || 2000;
    this.maxMessageLength = parseInt(import.meta.env.VITE_MAX_MESSAGE_LENGTH) || 2000;
    this.enableRealAI = import.meta.env.VITE_ENABLE_REAL_AI === 'true';
    this.debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';
  }

  // Add message to conversation history
  addToHistory(sender, content) {
    this.conversationHistory.push({
      sender,
      content,
      timestamp: new Date().toISOString()
    });

    // Keep only last 10 messages for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
  }

  // Analyze message to determine response type
  analyzeMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (RESPONSE_PATTERNS.greeting.test(message)) {
      return 'greeting';
    } else if (RESPONSE_PATTERNS.question.test(message)) {
      return 'question';
    } else if (RESPONSE_PATTERNS.help.test(lowerMessage)) {
      return 'help';
    } else if (RESPONSE_PATTERNS.thanks.test(lowerMessage)) {
      return 'thanks';
    } else if (RESPONSE_PATTERNS.goodbye.test(lowerMessage)) {
      return 'goodbye';
    }
    
    return 'unknown';
  }

  // Generate contextual response
  generateContextualResponse(message, conversationHistory = []) {
    const responseType = this.analyzeMessage(message);
    const responses = AI_RESPONSES[responseType] || AI_RESPONSES.unknown;
    
    // Add some randomness to responses
    const randomIndex = Math.floor(Math.random() * responses.length);
    let response = responses[randomIndex];

    // Add contextual elements based on conversation history
    if (conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      
      // If this is a follow-up question, make it more contextual
      if (responseType === 'question' && lastMessage.sender === 'user') {
        response = `Regarding your previous message about "${lastMessage.content.substring(0, 30)}...", ${response}`;
      }
    }

    // Add some personality and variation
    response = this.addPersonality(response, responseType);
    
    return response;
  }

  // Add personality to responses
  addPersonality(response, type) {
    const personalityTraits = [
      "I'm here to help!",
      "That's a great question!",
      "I appreciate you asking!",
      "Let me think about this...",
      "Interesting perspective!",
      "I'm glad you brought this up!"
    ];

    // Occasionally add personality traits
    if (Math.random() < 0.3) {
      const trait = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
      response = `${trait} ${response}`;
    }

    return response;
  }

  // Generate response with typing simulation
  async generateResponse(userMessage, conversationHistory = []) {
    // Validate message length
    if (userMessage.length > this.maxMessageLength) {
      throw new Error(`Message too long. Maximum length is ${this.maxMessageLength} characters.`);
    }

    // Add user message to history
    this.addToHistory('user', userMessage);

    if (this.debugMode) {
      console.log('AI Service: Generating response for:', userMessage);
    }

    // Check if real AI is enabled
    if (this.enableRealAI) {
      try {
        // Convert conversation history to OpenAI format
        const openaiHistory = conversationHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content || msg.text
        })).filter(msg => msg.content && msg.content.trim() !== '');

        // Import config dynamically to avoid circular dependencies
        const config = (await import('./config.js')).default;
        
        // Call real AI backend using dynamic API URL
        const response = await fetch(`${config.apiUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: openaiHistory
          })
        });

        const result = await response.json();
        
        if (result.success) {
          const aiResponse = result.response;
          this.addToHistory('bot', aiResponse);
          
          if (this.debugMode) {
            console.log('AI Service: Real AI response:', aiResponse);
          }
          
          return aiResponse;
        } else {
          throw new Error(result.error || 'Failed to get AI response');
        }
      } catch (error) {
        console.error('Real AI failed, falling back to simulated response:', error);
        // Fall back to simulated response
      }
    }

    // Simulate API delay with random variation
    const delay = this.responseDelay + Math.random() * (this.maxDelay - this.responseDelay);
    await new Promise(resolve => setTimeout(resolve, delay));

    // Generate response
    const response = this.generateContextualResponse(userMessage, conversationHistory);
    
    // Add bot response to history
    this.addToHistory('bot', response);

    if (this.debugMode) {
      console.log('AI Service: Generated response:', response);
    }

    return response;
  }

  // Get conversation history
  getConversationHistory() {
    return [...this.conversationHistory];
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }

  // Set response delay (for testing)
  setResponseDelay(delay) {
    this.responseDelay = delay;
  }

  // Generate a more sophisticated response for longer conversations
  generateAdvancedResponse(userMessage, conversationHistory = []) {
    const responseType = this.analyzeMessage(userMessage);
    
    // For longer conversations, provide more detailed responses
    if (conversationHistory.length > 5) {
      const recentTopics = this.extractTopics(conversationHistory.slice(-5));
      
      if (recentTopics.length > 0) {
        const topic = recentTopics[0];
        return `I notice we've been discussing ${topic}. ${this.generateContextualResponse(userMessage, conversationHistory)}`;
      }
    }

    return this.generateContextualResponse(userMessage, conversationHistory);
  }

  // Extract topics from conversation history
  extractTopics(messages) {
    const topics = [];
    const commonTopics = [
      'technology', 'work', 'personal', 'health', 'education', 
      'entertainment', 'travel', 'food', 'sports', 'politics'
    ];

    const text = messages.map(m => m.content).join(' ').toLowerCase();
    
    commonTopics.forEach(topic => {
      if (text.includes(topic)) {
        topics.push(topic);
      }
    });

    return topics;
  }

  // Simulate typing indicator
  async simulateTyping() {
    const typingDuration = this.responseDelay + Math.random() * (this.maxDelay - this.responseDelay);
    await new Promise(resolve => setTimeout(resolve, typingDuration));
  }

  // Get AI personality info
  getPersonality() {
    return {
      name: 'Anosh',
      traits: ['helpful', 'friendly', 'knowledgeable', 'patient'],
      capabilities: ['conversation', 'assistance', 'information'],
      limitations: ['no real-time data', 'simulated responses']
    };
  }
}

export default new AIService(); 