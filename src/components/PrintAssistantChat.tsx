import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Minimize2, Mic, MicOff, Trash2, Copy, RefreshCw, Check } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface PrintAssistantChatProps {
  lang: 'en' | 'hi';
}

export const PrintAssistantChat: React.FC<PrintAssistantChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        lang === 'en'
          ? "Namaste! I'm your general-purpose AI assistant & PRINT X PRESS expert. Ask me anything—coding, writing, translations, or printing rates in Patna!"
          : "नमस्ते! मैं आपका जनरल-परपज AI असिस्टेंट और PRINT X PRESS एक्सपर्ट हूँ। मुझसे कुछ भी पूछें—कोडिंग, राइटिंग, अनुवाद या प्रिंटिंग रेट!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const quickPrompts = [
    { label: 'Ask anything 🌐', q: 'What is artificial intelligence in simple terms?' },
    { label: 'Write letter ✍️', q: 'Ek professional leave application likh do English mein.' },
    { label: 'Calculate 📐', q: '10 × 5 feet ka area kitna hoga aur normal flex ka cost kya padega?' },
    { label: 'Printing Help 🖨️', q: 'What is the price of flex banner per sq.ft in Patna?' },
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages([...newMessages, { role: 'model', content: data.text }]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'model', content: 'Sorry, I encountered an issue. Please try again or contact us on WhatsApp!' },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: 'model', content: 'Connection error. Please check your network or call +91 7481068602 for instant assistance.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
      handleSend(speechText);
    };

    recognition.start();
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'model',
        content: lang === 'en' ? 'Chat cleared. How can I help you today?' : 'चैट साफ़ कर दी गई है। आज मैं आपकी क्या मदद कर सकता हूँ?',
      },
    ]);
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleRegenerate = () => {
    if (messages.length < 2) return;
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      // remove last model message if any
      const trimmed = messages.slice(0, messages.length - 1);
      setMessages(trimmed);
      handleSend(lastUserMsg.content);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-2xl shadow-blue-600/40 transition-transform hover:scale-105 cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{lang === 'en' ? 'Ask AI Assistant' : 'AI असिस्टेंट से पूछें'}</span>
        </button>
      )}

      {/* Chat Window Modal / Popup */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-sm sm:max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>PRINT X PRESS General AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-slate-400">Powered by Gemini · Patna, Bihar</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Message Scrollable Area */}
          <div className="p-4 h-80 overflow-y-auto space-y-3 bg-slate-900/90 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 group ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400 border border-slate-700'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className="relative max-w-[78%]">
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'model' && (
                    <div className="absolute -bottom-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <button
                        onClick={() => handleCopyText(msg.content, idx)}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 border border-slate-700"
                        title="Copy text"
                      >
                        {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic py-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>AI is thinking & generating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp.q)}
                className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-white hover:border-slate-700 whitespace-nowrap transition-colors"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-red-600 border-red-500 text-white animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              title="Voice Input (Speech to Text)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'en' ? 'Ask anything or query printing rates...' : 'कुछ भी पूछें या प्रिंटिंग रेट जानें...'}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-colors cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
