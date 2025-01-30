import React from 'react';
import { HelpCircle, Book, MessageSquare, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AccountHelp() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {[
          {
            icon: <Book />,
            title: 'Documentation',
            description: 'Browse our comprehensive guides and tutorials',
            action: 'View Docs',
            onClick: () => navigate('/docs')
          },
          {
            icon: <MessageSquare />,
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            action: 'Start Chat',
            onClick: () => window.$crisp?.push(['do', 'chat:open'])
          },
          {
            icon: <Mail />,
            title: 'Email Support',
            description: 'Send us an email for detailed assistance',
            action: 'Contact Us',
            onClick: () => navigate('/contact')
          },
          {
            icon: <HelpCircle />,
            title: 'FAQs',
            description: 'Find answers to common questions',
            action: 'View FAQs',
            onClick: () => navigate('/faq')
          }
        ].map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="p-6 bg-gradient-to-br from-white/5 to-[#8000FF]/[0.02] 
              border border-[#8000FF]/20 rounded-xl hover:border-[#8000FF]/40 
              transition-all duration-300 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8000FF]/10 flex items-center justify-center mb-4
              group-hover:scale-110 transition-transform">
              <div className="text-[#8000FF]">{item.icon}</div>
            </div>
            <h3 className="font-urbanist font-bold text-white text-lg mb-2 group-hover:text-[#8000FF] 
              transition-colors">
              {item.title}
            </h3>
            <p className="text-white/60 text-sm mb-4">{item.description}</p>
            <div className="inline-flex items-center gap-2 text-[#8000FF] text-sm font-medium">
              {item.action}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}