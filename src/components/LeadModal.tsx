import React from 'react';
import { X } from 'lucide-react';
import LeadForm from './LeadForm';
import { useNavigate } from 'react-router-dom';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const navigate = useNavigate();

  const handleFormSuccess = () => {
    navigate('/obrigado');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary/90 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-xl bg-primary border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 overflow-y-auto max-h-[85vh] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-5 md:mb-8">
          <h2 className="text-xl md:text-3xl font-black text-white leading-tight">
            Agende sua <br />
            <span className="text-cta">primeira experiência</span>
          </h2>
          <p className="text-white/60 mt-4 text-sm font-medium">
            Preencha abaixo e dê o primeiro passo para cuidar do corpo e da mente.
          </p>
        </div>

        <LeadForm onSuccess={handleFormSuccess} />
      </div>
    </div>
  );
};

export default LeadModal;