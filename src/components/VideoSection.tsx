import React from 'react';

const VideoSection = () => {
  const videos = [
    { id: 'zbiQH73bpOM', title: 'Depoimento' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-primary text-center mb-16 leading-tight">
          Quem já vive o <br />
          <span className="text-secondary italic">bem-estar Goodbe</span>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
          {videos.map((video) => (
            <div key={video.id} className="relative group">
              {/* Phone Frame */}
              <div className="relative w-[280px] md:w-[320px] aspect-[9/19] bg-primary rounded-[3rem] border-[8px] border-primary shadow-2xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0&iv_load_policy=3`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Decorative Shadow */}
              <div className="absolute -inset-4 bg-secondary/10 blur-3xl -z-10 rounded-full group-hover:bg-secondary/20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;