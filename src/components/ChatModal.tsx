import React, { useState, useEffect, useRef } from 'react';
import { Chat } from "@google/genai";
import { getChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icon for Close
const IconX = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

// Icon for Send
const IconSend = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

// Helper to render bold text
const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="font-bold text-violet-700 dark:text-violet-300">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
        id: 'welcome',
        text: 'E aí, folião! 🎉 Sou seu Assistente de Carnaval. Me pergunte sobre blocos, segurança, transporte ou onde curtir o after!',
        sender: 'ai',
        timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatSession) {
        const session = getChatSession();
        setChatSession(session);
    }
  }, [isOpen, chatSession]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        let aiText = "Desculpe, estou sem sinal no meio do bloco! Tente mais tarde.";
        
        if (chatSession) {
            const result = await chatSession.sendMessage({ message: userMsg.text });
            if (result.text) {
                aiText = result.text;
            }
        } else {
             // Fallback if no API key
             aiText = "Configure sua API Key para conversar comigo de verdade! Por enquanto, só sei dizer: **Siga o trio!**";
        }

        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: aiText,
            sender: 'ai',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "Ops, deu um tilt aqui. Tenta perguntar de novo?",
            sender: 'ai',
            timestamp: new Date()
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background-light dark:bg-background-dark animate-fade-in-up sm:max-w-md sm:mx-auto sm:right-4 sm:bottom-4 sm:h-[600px] sm:rounded-2xl sm:border sm:border-gray-200 dark:sm:border-gray-800 sm:shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/80 dark:bg-[#1E1E22]/80 backdrop-blur-md sticky top-0 z-10 sm:rounded-t-2xl">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z" clipRule="evenodd" />
                </svg>
            </div>
            <div>
                <h2 className="font-bold text-sm">Assistente da Folia</h2>
                <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Online
                </p>
            </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <IconX className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#121214]">
        {messages.map((msg) => (
            <div 
                key={msg.id} 
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div 
                    className={`
                        max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${msg.sender === 'user' 
                            ? 'bg-primary-light dark:bg-primary-dark text-white rounded-tr-none' 
                            : 'bg-white dark:bg-[#1E1E22] text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-800'}
                    `}
                >
                    {renderFormattedText(msg.text)}
                    <div className={`text-[10px] mt-1 opacity-60 text-right ${msg.sender === 'user' ? 'text-white' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white dark:bg-[#1E1E22] px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-800 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white dark:bg-[#1E1E22] border-t border-gray-100 dark:border-gray-800 sm:rounded-b-2xl">
        <form onSubmit={handleSend} className="flex gap-2 items-center bg-gray-100 dark:bg-black/30 p-1.5 pl-4 rounded-full border border-transparent focus-within:border-violet-500 focus-within:bg-white dark:focus-within:bg-black transition-all">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre o Carnaval..."
                className="flex-1 bg-transparent text-sm focus:outline-none dark:text-white"
                disabled={isLoading}
            />
            <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="p-2 bg-primary-light dark:bg-primary-dark text-white rounded-full disabled:opacity-50 disabled:scale-100 active:scale-90 hover:scale-105 transition-all shadow-md shadow-violet-500/20"
            >
                <IconSend className="w-5 h-5" />
            </button>
        </form>
      </div>
    </div>
  );
};