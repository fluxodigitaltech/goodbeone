import React, { useState } from 'react';
import { Infinity as InfinityIcon, Leaf, HandHeart, DeviceMobile } from '@phosphor-icons/react';
import VideoSection from '../components/VideoSection';
import LeadModal from '../components/LeadModal';
import FloatingCTA from '../components/FloatingCTA';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalities = [
    { name: 'MAT PILATES', img: 'MAT PILATES.png' },
    { name: 'PILATES STUDIO', img: 'PILATES STUDIO.png' },
    { name: 'YOGA', img: 'YOGA.png' },
    { name: 'FUNCIONAL', img: 'FUNCIONAL.png' },
    { name: 'RITMOS', img: 'RITMOS.png' },
    { name: 'MASSAGEM', img: 'MASSAGEM.png' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 p-4 md:p-6">
        <div className="container mx-auto">
          <img src="gb_encurtado.png" alt="Goodbe Logo" className="h-8 md:h-10" />
        </div>
      </header>

      <main>
        {/* HERO BANNER */}
        <section className="relative w-full min-h-[50vw] md:min-h-0">
          <img
            src="banner-hero.png"
            alt="Goodbe - Um novo jeito de cuidar do corpo e da mente"
            className="w-full h-full md:h-auto object-cover object-[25%_center] md:object-center"
          />
          {/* CTA overlay no banner */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-[12%] lg:bottom-[13%] left-0 w-full flex justify-center md:justify-start md:pl-[20%] z-10 px-4 md:px-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cta text-primary font-black uppercase tracking-wider md:tracking-widest px-5 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-lg text-[10px] sm:text-xs md:text-base whitespace-nowrap"
            >
              Agende sua primeira experiência
            </button>
          </div>
        </section>

        {/* DIFERENCIAIS SECTION */}
        <section className="py-14 md:py-20 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 md:px-4">
            <h2 className="text-2xl md:text-4xl font-black text-primary text-center mb-10 md:mb-14">
              O Diferencial que você procurava.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto">
              <div className="text-center px-2">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center text-secondary">
                  <InfinityIcon size={48} weight="duotone" />
                </div>
                <h3 className="font-black text-primary text-sm md:text-base mb-1.5">Ilimitado Real</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Treine o <strong className="text-primary">quanto quiser</strong>, sem taxas escondidas.</p>
              </div>
              <div className="text-center px-2">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center text-secondary">
                  <Leaf size={48} weight="duotone" />
                </div>
                <h3 className="font-black text-primary text-sm md:text-base mb-1.5">Método Integrado</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">O melhor do Pilates, Yoga, Funcional e Ritmos no <strong className="text-primary">mesmo plano</strong>.</p>
              </div>
              <div className="text-center px-2">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center text-secondary">
                  <HandHeart size={48} weight="duotone" />
                </div>
                <h3 className="font-black text-primary text-sm md:text-base mb-1.5">Sem Pressão</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Um ambiente focado em <strong className="text-primary">bem-estar</strong>, não em padrões estéticos.</p>
              </div>
              <div className="text-center px-2">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center text-secondary">
                  <DeviceMobile size={48} weight="duotone" />
                </div>
                <h3 className="font-black text-primary text-sm md:text-base mb-1.5">Conveniência</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Agende tudo pelo nosso App e treine <strong className="text-primary">no seu tempo</strong>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BEM-ESTAR SECTION */}
        <section className="py-14 md:py-20 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[100px] rounded-full -mr-48 -mt-48"></div>
          <div className="container mx-auto px-6 md:px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl md:text-4xl font-black text-white mb-5 md:mb-8 uppercase tracking-tight">
                Bem-estar não vem do <span className="text-cta">excesso.</span>
              </h2>
              <p className="text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
                Se você acha que precisa sofrer para ter resultado, talvez seja por isso que nunca conseguiu manter. O corpo não precisa de intensidade extrema, precisa de constância.
              </p>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 md:px-8 py-4 rounded-2xl inline-block">
                <p className="text-white font-bold text-base md:text-xl leading-relaxed">
                  Quando o exercício é leve, você consegue repetir.
                  <br className="hidden md:block" /> E o que você repete, <span className="text-cta">transforma.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VÍDEOS */}
        <VideoSection />

        {/* MODALITIES */}
        <section className="py-14 md:py-24 bg-gray-50 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-black text-primary text-center mb-10 md:mb-16">
              Tudo o que você precisa para{' '}
              <br className="md:hidden" />
              <span className="text-secondary">se sentir bem</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
              {modalities.map((m) => (
                <div key={m.name} className="bg-white px-2 py-5 md:py-8 rounded-2xl md:rounded-3xl border-b-4 md:border-b-8 border-highlight shadow-lg md:shadow-xl hover:-translate-y-3 transition-all duration-300 text-center group">
                  <div className="w-16 h-16 md:w-28 md:h-28 mx-auto mb-3 md:mb-6 rounded-full overflow-hidden border-2 md:border-4 border-gray-100 group-hover:border-secondary transition-colors bg-white p-1 md:p-2">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-black text-primary tracking-tight text-[10px] md:text-sm leading-tight uppercase px-1">{m.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SENTIR SECTION */}
        <section className="py-14 md:py-24 bg-white overflow-hidden relative">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-highlight/5 blur-[80px] rounded-full -ml-32"></div>
          <div className="container mx-auto px-6 md:px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-2xl md:text-5xl font-black text-primary mb-4 md:mb-8">
              Tem coisa que não dá para explicar...
            </h2>
            <p className="text-lg md:text-2xl text-secondary font-bold mb-8 md:mb-12">
              você precisa sentir.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cta text-primary font-black uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-2xl hover:scale-105 transition-all shadow-lg text-sm md:text-base"
            >
              Agende sua primeira experiência
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-primary pt-14 md:pt-24 pb-8 md:pb-12 text-center text-white relative overflow-hidden">
        {/* Background Decorative Element */}
        <img src="gb_element.png" alt="" className="absolute -bottom-20 -right-20 w-96 opacity-10 pointer-events-none rotate-12" />

        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
            Você só precisa dar o <span className="text-cta italic">primeiro passo.</span>
          </h2>
          <p className="text-base md:text-xl text-white/70 mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
            O resto, a gente facilita para você.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cta text-primary font-black uppercase tracking-widest px-8 md:px-12 py-4 md:py-6 rounded-2xl hover:scale-105 transition-all shadow-2xl mb-16 md:mb-24 text-sm md:text-base"
          >
            Viver a experiência Goodbe
          </button>
          <div className="border-t border-white/10 pt-10 md:pt-16 flex flex-col items-center">
            <p className="font-black text-base md:text-xl mb-4 md:mb-6 tracking-tight">Goodbe. Bem-estar que funciona.</p>
            <img src="goodbe seu centro de bem estar.png" alt="Logo" className="h-10 md:h-14" />
          </div>
          <p className="mt-12 md:mt-20 text-xs text-white/30 uppercase tracking-[0.2em] pb-16 md:pb-0">
            © {new Date().getFullYear()} Goodbe - Todos os direitos reservados
          </p>
        </div>
      </footer>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FloatingCTA onClick={() => setIsModalOpen(true)} />
    </div>
  );
};

export default Index;
