import React, { useState } from 'react';

const units = [
  "Altino Arantes",
  "Saúde",
  "Parque das Nações",
  "Alto do Ipiranga",
  "Jardins",
  "Belenzinho",
  "Campestre"
];

const LeadForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellPhone: '',
    unit: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    setFormData({ ...formData, cellPhone: v });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.unit) {
      setStatus({ type: 'error', message: 'Por favor, selecione uma unidade.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cellPhone: formData.cellPhone.replace(/\D/g, '') // Limpa formatação para a API
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Lead enviado com sucesso! ✅' });
        setTimeout(() => {
          onSuccess();
          setFormData({ name: '', email: '', cellPhone: '', unit: '' });
          setStatus(null);
        }, 2000);
      } else {
        throw new Error(data.message || 'Erro ao enviar lead');
      }
    } catch (error: any) {
      console.error('Erro no envio:', error);
      setStatus({ type: 'error', message: error.message || 'Erro ao enviar. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="space-y-1">
        <label className="text-white text-xs font-bold uppercase tracking-wider">Nome Completo *</label>
        <input
          required
          disabled={isSubmitting}
          type="text"
          placeholder="Como podemos te chamar?"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-cta transition-colors disabled:opacity-50"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-white text-xs font-bold uppercase tracking-wider">E-mail *</label>
        <input
          required
          disabled={isSubmitting}
          type="email"
          placeholder="seu@email.com"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-cta transition-colors disabled:opacity-50"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-white text-xs font-bold uppercase tracking-wider">WhatsApp / Celular *</label>
        <input
          required
          disabled={isSubmitting}
          type="tel"
          placeholder="(11) 99999-9999"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-cta transition-colors disabled:opacity-50"
          value={formData.cellPhone}
          onChange={handlePhone}
        />
      </div>

      <div className="space-y-3">
        <label className="text-white text-xs font-bold uppercase tracking-wider block text-center">Escolha a unidade Goodbe: *</label>
        <div className="grid grid-cols-2 gap-2">
          {units.map((u) => (
            <label 
              key={u} 
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                formData.unit === u 
                ? 'bg-cta text-primary border-cta' 
                : 'bg-white/5 border-white/10 text-white'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                required
                disabled={isSubmitting}
                type="radio"
                name="unit"
                className="hidden"
                value={u}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
              <span className="font-bold truncate">{u}</span>
            </label>
          ))}
        </div>
      </div>

      {status && (
        <p className={`text-center font-bold text-sm ${status.type === 'success' ? 'text-cta' : 'text-red-400'}`}>
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cta text-primary font-black py-4 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processando...' : 'Agendar minha experiência'}
      </button>
    </form>
  );
};

export default LeadForm;