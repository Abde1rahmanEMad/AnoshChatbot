// Email service for sending access codes via backend API
import config from './config';

class EmailService {
  constructor() {
    this.pendingCodes = new Map(); // Store pending codes with expiration
    // Get base API URL dynamically
    this.getApiBaseUrl = () => {
      return `${config.apiUrl}/api`;
    };
  }

  // Send access code via backend API
  async sendAccessCode(email) {
    try {
      const response = await fetch(`${this.getApiBaseUrl()}/send-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Access code sent successfully to:', email);
        return {
          success: true,
          messageId: result.messageId
        };
      } else {
        console.error('Failed to send access code:', result.error);
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      console.error('Failed to send access code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Validate access code via backend API
  async validateCode(email, code) {
    try {
      const response = await fetch(`${this.getApiBaseUrl()}/validate-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to validate code:', error);
      return {
        valid: false,
        message: 'Server error'
      };
    }
  }

  // Get pending codes (for debugging)
  async getPendingCodes() {
    try {
      const response = await fetch(`${this.getApiBaseUrl()}/pending-codes`);
      const codes = await response.json();
      return codes;
    } catch (error) {
      console.error('Failed to get pending codes:', error);
      return [];
    }
  }

  // Clear all codes (for debugging)
  async clearAllCodes() {
    try {
      const response = await fetch(`${this.getApiBaseUrl()}/clear-codes`, {
        method: 'DELETE'
      });
      const result = await response.json();
      console.log('All codes cleared:', result.message);
      return result;
    } catch (error) {
      console.error('Failed to clear codes:', error);
      return { error: error.message };
    }
  }

  // Check if backend is available
  async checkBackendStatus() {
    try {
      // Get the base URL without /api suffix
      const baseUrl = config.apiUrl;
      const response = await fetch(baseUrl);
      const result = await response.json();
      return result.message === 'Anosh Backend Server Running';
    } catch (error) {
      return false;
    }
  }
}

export default new EmailService(); 