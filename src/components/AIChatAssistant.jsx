import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Chào bạn! Mình là Trợ lý ảo của Gia Han Bakery. Mình có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const bakeryKnowledge = {
    'giá': 'Bánh của chúng mình có giá dao động từ 20.000đ đến 500.000đ tùy loại bánh ngọt hay bánh sinh nhật. Bạn có thể xem chi tiết ở mục Thực đơn nhé!',
    'món nào ngon': 'Món "best-seller" của tiệm là Bánh Kem Bắp và Croissant trứng muối. Bạn nhất định phải thử nha!',
    'giao hàng': 'Gia Han Bakery miễn phí giao hàng cho đơn từ 200.000đ trong bán kính 5km. Thời gian giao thường mất 30-60 phút.',
    'địa chỉ': 'Tiệm nằm tại số 123 Đường Bánh Ngọt, Quận 1, TP.HCM. Mở cửa từ 7h sáng đến 10h tối hàng ngày.',
    'chào': 'Xin chào! Rất vui được hỗ trợ bạn. Bạn cần tư vấn về loại bánh nào ạ?',
    'tạm biệt': 'Cảm ơn bạn đã quan tâm. Chúc bạn một ngày ngọt ngào cùng Gia Han Bakery!',
    'khuyến mãi': 'Hiện tại chúng mình đang có chương trình "Mua 2 tặng 1" cho các dòng bánh su kem vào khung giờ 19h-21h hàng ngày đó!'
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let botText = "Cảm ơn câu hỏi của bạn. Để mình kiểm tra thông tin và báo lại cho bạn ngay nhé! Hoặc bạn có thể gọi hotline 0123.456.789 để được hỗ trợ nhanh nhất.";
      
      const lowerInput = inputValue.toLowerCase();
      for (const key in bakeryKnowledge) {
        if (lowerInput.includes(key)) {
          botText = bakeryKnowledge[key];
          break;
        }
      }

      const botMessage = { id: Date.now() + 1, type: 'bot', text: botText };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (text) => {
    setInputValue(text);
  };

  return (
    <div className="ai-chat-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, fontFamily: 'var(--font-main)' }}>
      {/* Floating Bubble */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="ai-bubble-btn"
          style={{
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), #ffb2c5)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(255, 133, 162, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
        >
          <Sparkles className="animate-pulse" size={30} />
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '15px',
            height: '15px',
            background: '#10b981',
            borderRadius: '50%',
            border: '3px solid white'
          }}></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window animate-in" style={{
          width: '380px',
          height: '550px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2.5rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}>
          {/* Header */}
          <div style={{
            padding: '1.5rem 2rem',
            background: 'linear-gradient(135deg, var(--primary), #ffb2c5)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.6rem', borderRadius: '1rem' }}>
                <Bot size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Gia Han Assistant</h4>
                <span style={{ fontSize: '0.8rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   <div style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></div>
                   Sẵn sàng hỗ trợ
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                gap: '0.8rem',
                flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: msg.type === 'user' ? 'var(--secondary)' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: msg.type === 'user' ? 'var(--primary)' : 'white',
                  flexShrink: 0
                }}>
                  {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div style={{
                  padding: '1rem 1.2rem',
                  borderRadius: msg.type === 'user' ? '1.5rem 0.2rem 1.5rem 1.5rem' : '0.2rem 1.5rem 1.5rem 1.5rem',
                  background: msg.type === 'user' ? 'var(--primary)' : 'var(--secondary)',
                  color: msg.type === 'user' ? 'white' : 'var(--text-main)',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Bot size={16} />
                </div>
                <div style={{ padding: '1rem', borderRadius: '0.2rem 1.5rem 1.5rem 1.5rem', background: 'var(--secondary)' }}>
                  <Loader2 className="animate-spin" size={18} color="var(--primary)" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div style={{ padding: '0 1.5rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem' }} className="no-scrollbar">
            {['Giá bánh?', 'Món ngon?', 'Địa chỉ?', 'Giao hàng?'].map((s) => (
              <button 
                key={s}
                onClick={() => handleSuggestion(s)}
                style={{ 
                  whiteSpace: 'nowrap', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '1rem', 
                  border: '1px solid var(--border)', 
                  background: 'white', 
                  fontSize: '0.85rem', 
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: 'white' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              background: 'var(--secondary)', 
              padding: '0.5rem 0.5rem 0.5rem 1.2rem', 
              borderRadius: '1.5rem' 
            }}>
              <input 
                type="text" 
                placeholder="Hỏi mình gì đó đi..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
              <button 
                onClick={handleSend}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  border: 'none', 
                  color: 'white', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
              Trợ lý ảo thông minh Gia Han Bakery
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatAssistant;
