import React, { useState } from 'react';
import VideoSection from '../components/VideoSection';
import LeadModal from '../components/LeadModal';
import FloatingCTA from '../components/FloatingCTA';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalities = [
    { name: 'MAT PILATES', img: 'MAT PILATES.png' },
    { name: 'PILATES STUDIO', img: 'PILATES STUDIO.png' },
    { name: 'FUNCIONAL', img: 'FUNCIONAL.png' },
    { name: 'RITMOS', img: 'RITMOS.png' },
    { name: 'MASSAGEM', img: 'MASSAGEM.png' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 p-4 md:p-6">
        <div className="container mx-auto flex justify-between items-center">
          <img src="goodbe seu centro de bem estar.png" alt="Goodbe Logo" className="h-8 md:h-10" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cta text-primary font-black px-4 md:px-6 py-2 rounded-full text-xs md:text-sm uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Agende sua experiência
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[100vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0 hidden md:block">
            <iframe
              className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-full min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 scale-110"
              src="https://www.youtube.com/embed/3K21LzVNS-U?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=3K21LzVNS-U&modestbranding=1&iv_load_policy=3"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-white md:from-primary/80 md:via-primary/40 z-[1]"></div>

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 z-[2] opacity-[0.03] md:opacity-5 pointer-events-none" style={{ backgroundImage: 'url(gb_element.png)', backgroundSize: '200px md:300px' }}></div>

          <div className="container mx-auto relative z-[10] px-6 md:px-4 text-center">
            <h1 className="text-3xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.15]">
              GoodBe.
              <br />
              <span className="text-cta italic">
                Um novo jeito de cuidar
                <br />
                do corpo e da mente.
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-lg md:max-w-3xl mx-auto font-medium leading-relaxed">
              Onde o cuidado começa no corpo e termina na mente. Esqueça a rotina engessada e o ambiente que assusta. Aqui, você faz no seu tempo, sem pressão.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cta text-primary font-black uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(217,255,13,0.3)] text-sm md:text-base"
            >
              Agende sua primeira experiência
            </button>
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
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-8">
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
            Viver a experiência GoodBe
          </button>
          <div className="border-t border-white/10 pt-10 md:pt-16 flex flex-col items-center">
            <img src="goodbe seu centro de bem estar.png" alt="Logo" className="h-10 md:h-14 mb-6 md:mb-8" />
            <p className="font-black text-base md:text-xl mb-3 tracking-tight">Goodbe. Bem-estar que funciona.</p>
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
