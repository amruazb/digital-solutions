'use client'

import React from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "971XXXXXXXXX"; // Replace with actual WhatsApp number
    const message = "Hi! I need help with typing services. Can you assist me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
