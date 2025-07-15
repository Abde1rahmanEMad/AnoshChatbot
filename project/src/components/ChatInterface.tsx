import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '../types/chat';
import localStorageService from '../services/localStorage';
import aiService from '../services/aiService';

interface ChatInterfaceProps {
  onLogout: () => void;
  sessionId: string;
  userEmail: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onLogout, sessionId, userEmail }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load chat history on component mount
  useEffect(() => {
    const initializeChat = () => {
      try {
        // Get or create conversation
        const conversation = localStorageService.createOrGetConversation(sessionId, userEmail);

        if (conversation.messages.length > 0) {
          // Convert stored messages to frontend format
          const formattedMessages: Message[] = conversation.messages.map(msg => ({
            id: msg.messageId,
            text: msg.content,
            sender: msg.sender as 'user' | 'bot',
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(formattedMessages);
        } else {
          // Add welcome message if no history
          const welcomeMessage: Message = {
            id: 'welcome',
            text: 'Hello! How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);

          // Save welcome message to storage
          localStorageService.addMessage(sessionId, 'bot', welcomeMessage.text);
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        // Add fallback welcome message
        setMessages([
          {
            id: 'welcome',
            text: 'Hello! How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    };

    initializeChat();
  }, [sessionId]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Save user message to storage
    localStorageService.addMessage(sessionId, 'user', text);

    try {
      setIsTyping(true);

      // Get conversation history for context
      const conversation = localStorageService.getCurrentConversation();
      const conversationHistory = conversation?.messages || [];

      // Generate AI response
      const aiResponse = await aiService.generateResponse(text, conversationHistory);

      // Create bot message
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      // Save bot message to storage
      localStorageService.addMessage(sessionId, 'bot', aiResponse);

      // Add bot message to UI
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to generate response:', error);
      // Add error message
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    try {
      // Clear conversation in storage
      localStorageService.clearConversation();

      // Reset messages to welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Hello! How can I help you today?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);

      // Save welcome message to storage
      localStorageService.addMessage(sessionId, 'bot', welcomeMessage.text);
    } catch (error) {
      console.error('Failed to clear chat:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <ChatHeader onLogout={onLogout} onClearChat={handleClearChat} isConnected={true} />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;