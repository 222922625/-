'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, Minimize2, Maximize2, Bot, Globe } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FloatingChatProps {
  botId?: string;
}

const FloatingChat: React.FC<FloatingChatProps> = ({
  botId = '030447765EC44191'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'selection' | 'api' | 'iframe'>('selection');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // 组件卸载时恢复body滚动
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 通过API路由调用DeepSeek服务
      const response = await fetch('/api/qanything', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.content
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const answer = data.answer || '抱歉，无法获取回答。';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，AI服务暂时不可用，请稍后再试。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      setChatMode('selection');
      // 阻止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复背景滚动
      document.body.style.overflow = 'unset';
    }
  };

  const selectChatMode = (mode: 'api' | 'iframe') => {
    setChatMode(mode);
    if (mode === 'iframe') {
      // 直接显示QAnything iframe
      showQAnythingIframe();
    }
  };

  const showQAnythingIframe = () => {
    // 检查是否已经存在QAnything iframe
    const existingIframe = document.getElementById('qanything-custom-iframe');
    if (existingIframe) {
      existingIframe.style.display = 'block';
      return;
    }

    // 创建iframe容器
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'qanything-iframe-container';
    iframeContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // 创建iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'qanything-custom-iframe';
    iframe.src = 'https://ai.youdao.com/saas/qanything/#/bots/030447765EC44191/share';
    iframe.style.cssText = `
      width: 90%;
      height: 90%;
      max-width: 1200px;
      max-height: 800px;
      border: none;
      border-radius: 12px;
      background: white;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;

    // 创建关闭按钮
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
    `;

    // 关闭按钮悬停效果
    closeButton.onmouseenter = () => {
      closeButton.style.background = 'rgba(255, 255, 255, 1)';
      closeButton.style.transform = 'scale(1.1)';
    };
    closeButton.onmouseleave = () => {
      closeButton.style.background = 'rgba(255, 255, 255, 0.9)';
      closeButton.style.transform = 'scale(1)';
    };

    // 关闭功能
    const closeIframe = () => {
      if (iframeContainer.parentNode) {
        iframeContainer.parentNode.removeChild(iframeContainer);
      }
    };

    closeButton.onclick = closeIframe;

    // 点击背景关闭
    iframeContainer.onclick = (e) => {
      if (e.target === iframeContainer) {
        closeIframe();
      }
    };

    // ESC键关闭
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeIframe();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // 组装元素
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(closeButton);
    document.body.appendChild(iframeContainer);

    console.log('QAnything iframe created and displayed');
  };

  const backToSelection = () => {
    setChatMode('selection');
    setMessages([]);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* 悬浮按钮 */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
          aria-label="打开聊天窗口"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* 聊天窗口 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 max-h-[80vh] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          {/* 头部 */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {chatMode === 'api' && (
                <button
                  onClick={backToSelection}
                  className="hover:bg-blue-700 p-1 rounded transition-colors mr-2"
                  aria-label="返回选择"
                >
                  ←
                </button>
              )}
              <MessageCircle size={20} />
              <h3 className="font-semibold">
                {chatMode === 'selection' ? 'AI助手选择' :
                  chatMode === 'api' ? 'AI助手（API调用）' :
                    'AI助手（iframe）'}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-blue-700 p-1 rounded transition-colors"
                aria-label={isMinimized ? "展开" : "最小化"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-blue-700 p-1 rounded transition-colors"
                aria-label="关闭聊天窗口"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 聊天内容 */}
          {!isMinimized && (
            <>
              {/* 选择模式界面 */}
              {chatMode === 'selection' && (
                <div className="flex-1 p-6 bg-gray-50 flex flex-col items-center justify-center space-y-4">
                  <div className="text-center mb-6">
                    <MessageCircle size={48} className="mx-auto mb-4 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">选择AI助手类型</h4>
                    <p className="text-sm text-gray-600">请选择您想要使用的AI助手</p>
                  </div>

                  <button
                    onClick={() => selectChatMode('iframe')}
                    className="w-full bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 flex items-center space-x-3"
                  >
                    <Globe className="text-blue-600" size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">AI助手（iframe）</div>
                      <div className="text-sm text-gray-600">QAnything智能助手</div>
                    </div>
                  </button>

                  <button
                    onClick={() => selectChatMode('api')}
                    className="w-full bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg p-4 transition-all duration-200 flex items-center space-x-3"
                  >
                    <Bot className="text-blue-600" size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">AI助手（API调用）</div>
                      <div className="text-sm text-gray-600">智能助手</div>
                    </div>
                  </button>
                </div>
              )}

              {/* API模式的消息区域 */}
              {chatMode === 'api' && (
                <div className="flex-1 min-h-0 max-h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <Bot size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>您好！我是 ai 智能助手</p>
                      <p className="text-sm mt-2">有什么可以帮助您的吗？</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {/* 加载指示器 */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-500">正在思考...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* iframe模式提示 */}
              {chatMode === 'iframe' && (
                <div className="flex-1 p-6 bg-gray-50 flex flex-col items-center justify-center">
                  <Globe size={48} className="mx-auto mb-4 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">QAnything助手</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">QAnything助手已在新窗口中打开，您可以在弹出的窗口中与AI助手对话。</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => showQAnythingIframe()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      重新打开助手
                    </button>
                    <button
                      onClick={backToSelection}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      返回选择
                    </button>
                  </div>
                </div>
              )}

              {/* 输入区域 - 仅在API模式显示 */}
              {chatMode === 'api' && (
                <div className="border-t border-gray-200 p-4 bg-white">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="输入您的问题..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                      aria-label="发送消息"
                    >
                      <Send size={16} />
                    </button>
                  </form>

                  {/* 清除按钮 */}
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="text-xs text-gray-500 hover:text-gray-700 mt-2 transition-colors"
                    >
                      清除对话历史
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChat;