import React, { useEffect } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const Obrigado = () => {
  const navigate = useNavigate();
  const WHATSAPP_NUMBER = "551125772860"; // Número atualizado (11) 2577-2860
  // Mensagem corrigida: "Giro" em vez de "Gire"
  const WHATSAPP_MESSAGE = "Oi%2C%20acabei%20de%20me%20cadastrar%20no%20Giro%20que%20faz%20bem%20e%20quero%20garantir%20meu%20benef%C3%ADcio%21"; // URL‑encoded

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { 'send_to': 'AW-606259354/Ew6iCNj5gIAYEJqRi6EC' });
      window.gtag('event', 'conversion', { 'send_to': 'AW-11021670141/z5gsCJGj44cYEP2txYcp' });
      window.gtag('event', 'form_submit', {});
      window.gtag('event', 'conversion', { 'send_to': 'AW-16660046948/MDqNCL_dv9QZEOTIkIg-' });
      window.gtag('event', 'conversion', { 'send_to': 'AW-306447693/04VPCLbuueUDEM2KkJIB' });
    }

    // Redirecionamento automático após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="w-6 h-6 bg-white rounded-full animate-bounce"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">Obrigado!</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Seu cadastro foi enviado com sucesso! Você está sendo redirecionado para falar com um de nossos consultores.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-2xl max-w-md mx-auto mb-8">
            <p className="text-sm text-gray-500 mb-4">Você será redirecionado para o WhatsApp em <span id="countdown" className="font-bold text-primary">3</span> segundos</p>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 transition-all"
            >
              <MessageCircle size={20} />
              Ir para o WhatsApp agora
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-primary transition-colors inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
};

export default Obrigado;