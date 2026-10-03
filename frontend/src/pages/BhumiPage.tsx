import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useFarmer } from '../hooks/useFarmer';
import { Send, Mic, MapPin, TestTube, Sprout } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'farmer' | 'bhumi';
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "Will rain affect my rice crop?",
  "What is wrong with my crop?",
  "How are rice prices today?",
  "What schemes can I apply for?",
  "What should I do before heavy rain?"
];

// Mock Bhumi Service for offline fallback
const bhumiService = {
  async chat(message: string, context: any) {
    const msg = message.toLowerCase();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (msg.includes('disease') || msg.includes('crop') || msg.includes('wrong')) {
      return `Based on your farm in ${context.location}, there is a possible leaf blast detected in Zone B7 with 91% AI confidence. Heavy rainfall is expected in the next 48 hours. I recommend inspecting the affected zone before the rain arrives and ensuring proper drainage.`;
    }
    if (msg.includes('rain') || msg.includes('weather')) {
      return `For your area in ${context.location}, heavy rainfall (up to 45mm) is expected starting tomorrow evening. Since you are growing ${context.crops.join(', ')}, make sure to check field drainage today to prevent waterlogging.`;
    }
    if (msg.includes('price') || msg.includes('market') || msg.includes('mandi')) {
      return `Today at the nearest mandi in ${context.location}, ${context.crops[0] || 'your crop'} is trading at ₹2,450/quintal, which is ₹50 higher than yesterday. Demand is steady.`;
    }
    if (msg.includes('scheme') || msg.includes('apply')) {
      return `Based on your profile (${context.farmArea} acres, ${context.irrigation}), you are eligible for the PM-KISAN scheme and the State Micro-Irrigation Subsidy. Would you like me to guide you on how to apply?`;
    }
    if (msg.includes('water') || msg.includes('flood') || msg.includes('dam')) {
      return `Your farm is currently in a MODERATE risk zone due to upstream water release from the Sriram Sagar Dam. I recommend moving any loose equipment from low-lying areas and monitoring official updates.`;
    }

    return `I am Bhumi, your AI farming companion. I've noted that you grow ${context.crops.join(', ')} in ${context.location}. How can I assist you with your farming decisions today?`;
  }
};

export default function BhumiPage() {
  const { t } = useLanguage();
  const { farmer } = useFarmer();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const farmContext = {
    name: farmer?.name || 'Farmer',
    location: farmer?.location?.address || 'Warangal',
    crops: farmer?.farmDetails?.primaryCrop ? [farmer.farmDetails.primaryCrop] : ['Rice'],
    farmArea: farmer?.farmDetails?.area ?? 5,
    irrigation: farmer?.farmDetails?.irrigationType || 'Borewell',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'farmer',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await bhumiService.chat(text, farmContext);

      const bhumiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bhumi',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, bhumiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: t.liveDataUnavailable,
        sender: 'bhumi',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#FAF7EF]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex flex-col items-center justify-center relative z-10">
        <h1 className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2">
          <span className="text-3xl">🤖</span> {t.bhumiTitle}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{t.bhumiSubtitle}</p>
        
        {/* Context Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto max-w-full pb-1 scrollbar-hide">
          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
            <MapPin className="w-3 h-3" /> {farmContext.location}
          </span>
          <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
            <Sprout className="w-3 h-3" /> {farmContext.crops[0]}
          </span>
          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
            <TestTube className="w-3 h-3" /> {farmContext.irrigation}
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-3xl mx-auto flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 mt-10">
            <div className="w-20 h-20 bg-[#2E7D32] rounded-full flex items-center justify-center text-4xl shadow-lg shadow-green-200">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Namaste! I'm Bhumi.</h2>
              <p className="text-gray-500 mt-2 max-w-sm">I can help you with weather forecasts, crop health, market prices, and farming advice.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-8 w-full max-w-lg">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="bg-white border border-gray-200 hover:border-[#2E7D32] hover:text-[#2E7D32] text-gray-600 px-4 py-2 rounded-full text-sm transition-colors shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 w-full ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bhumi' && (
                <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex-shrink-0 flex items-center justify-center text-sm shadow-sm">
                  🤖
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.sender === 'farmer' 
                  ? 'bg-[#2E7D32] text-white rounded-tr-sm' 
                  : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
              }`}>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${msg.sender === 'farmer' ? 'text-green-100' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {msg.sender === 'farmer' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-sm shadow-sm border border-blue-200">
                  🧑🏽‍🌾
                </div>
              )}
            </div>
          ))
        )}
        
        {isTyping && (
          <div className="flex gap-3 w-full justify-start">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex-shrink-0 flex items-center justify-center text-sm shadow-sm">
              🤖
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm border border-gray-100 px-4 py-3 shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 w-full">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <button className="p-3 text-gray-400 hover:bg-gray-100 rounded-full transition-colors cursor-not-allowed" disabled>
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Ask Bhumi anything about your farm..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-shadow"
          />
          <button 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-[#2E7D32] text-white rounded-full hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
