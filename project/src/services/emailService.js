// Email service for sending access codes via backend API
const API_BASE_URL = 'http://localhost:3001/api';

class EmailService {
  constructor() {
    this.pendingCodes = new Map(); // Store pending codes with expiration
  }

  // Send access code via backend API
  async sendAccessCode(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/send-code`, {
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
      const response = await fetch(`${API_BASE_URL}/validate-code`, {
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
      const response = await fetch(`${API_BASE_URL}/pending-codes`);
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
      const response = await fetch(`${API_BASE_URL}/clear-codes`, {
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
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}`);
      const result = await response.json();
      return result.message === 'Anosh Backend Server Running';
    } catch (error) {
      return false;
    }
  }
}

export default new EmailService(); 