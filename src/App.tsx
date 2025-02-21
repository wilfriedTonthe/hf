import React, { useEffect, useState } from 'react';
import { Cake, Heart, Stars, Music, Sparkles, Gift, PartyPopper, SettingsIcon as Confetti } from 'lucide-react';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const images = [
    "felicite6.jpg",
    "felicite2.jpg",
    "felicite3.jpg",
    "felicite4.jpg"
  ];

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 1000);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const sections = [
    { icon: <PartyPopper className="w-6 h-6" />, title: "Galerie Photos" },
    { icon: <Confetti className="w-6 h-6" />, title: "Message" },
    { icon: <Heart className="w-6 h-6" />, title: "Vidéo" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-purple-200 to-indigo-200 flex items-center justify-center p-4 overflow-hidden">
      <audio id="bgMusic" loop>
        <source src="Dk2fois.mp3" type="audio/mp3" />
      </audio>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              transform: `scale(${0.3 + Math.random() * 0.4})`
            }}
          >
            {i % 5 === 0 ? <Stars className="text-yellow-400 animate-sparkle" /> : 
             i % 5 === 1 ? <Sparkles className="text-purple-400 animate-sparkle" /> :
             i % 5 === 2 ? <Heart className="text-pink-400 animate-sparkle" /> :
             i % 5 === 3 ? <Gift className="text-indigo-400 animate-sparkle" /> :
             <PartyPopper className="text-rose-400 animate-sparkle" />}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className={`glass-effect p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-1000 ${showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="text-center relative">
            <button
              onClick={toggleMusic}
              className="absolute top-4 right-4 p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110 shadow-lg"
            >
              <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
            </button>

            <div className="flex justify-center gap-8 mb-10">
              <Cake className="w-20 h-20 text-pink-500 animate-bounce" />
              <Gift className="w-20 h-20 text-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <PartyPopper className="w-20 h-20 text-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 text-glow">
              Joyeux Anniversaire Félicité! ✨
            </h1>

            {/* Navigation Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    activeSection === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="transition-all duration-500">
              {/* Video Section */}
              {activeSection === 2 && (
               <div className="mb-10 relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
               <video 
                 className="w-full h-99 object-cover" // h-96 ≈ 384px
                 controls
                 poster={images[0]}
               >
                 <source src="vf2.mp4" type="video/mp4" />
                 Votre navigateur ne supporte pas la lecture de vidéos.
               </video>
             </div>
             
              )}

              {/* Image Gallery */}
              {activeSection === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {images.map((img, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl card-hover">
                    <img 
                      src={img}
                      alt={`Célébration ${index + 1}`}
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
              
              )}

              {/* Message Section */}
              {activeSection === 1 && (
                  <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-center relative">
                    {/* Première section avec image et introduction */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative group overflow-hidden rounded-2xl card-hover">
                        <img 
                          src={images[0]} 
                          alt="Félicité 1" 
                          className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <div className="bg-white/50 p-8 rounded-2xl card-hover md:col-span-1">
                        <h2 className="text-3xl font-semibold text-purple-600 mb-6">
                          À toi, Félicité, en ce jour enchanté 🌸🎉
                        </h2>
                        <p className="italic leading-relaxed text-lg">
                          Aujourd'hui, le ciel chante et les fleurs dansent,<br />
                          Car c'est ton jour, Félicité, pleine de grâce et d'élégance.<br />
                          Ton sourire illumine nos vies chaque matin,<br />
                          Ton cœur généreux réchauffe nos chemins.
                        </p>
                      </div>
                      <div className="relative group overflow-hidden rounded-2xl card-hover">
                        <img 
                          src={images[1]} 
                          alt="Félicité 2" 
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                    </div>
            
                    {/* Deuxième section avec poème et image */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="bg-white/50 p-8 rounded-2xl card-hover md:col-span-1">
                        <p className="italic leading-relaxed text-lg">
                          Que cette journée te comble de bonheur,<br />
                          Remplie de rires, d'amour, et de douceurs.<br />
                          Puissent tes rêves s'épanouir sans fin,<br />
                          Comme les étoiles scintillantes au lointain.
                        </p>
                      </div>
                      <div className="relative group overflow-hidden rounded-2xl card-hover">
                        <img 
                          src={images[2]} 
                          alt="Félicité 3" 
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <div className="bg-white/50 p-8 rounded-2xl card-hover md:col-span-1">
                        <p className="italic leading-relaxed text-lg">
                          Lève les yeux, sens la magie de l'instant,<br />
                          Les vœux d'amitié t'entourent tendrement.<br />
                          Je te souhaite des moments merveilleux,<br />
                          Des souvenirs dorés, des instants précieux.
                        </p>
                      </div>
                    </div>
            
                    {/* Troisième section avec conclusion et image */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="relative group overflow-hidden rounded-2xl card-hover">
                        <img 
                          src={images[3]} 
                          alt="Félicité 4" 
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <div className="bg-white/50 p-8 rounded-2xl card-hover md:col-span-1">
                        <p className="italic leading-relaxed text-lg">
                          Alors, Félicité, en ce jour éclatant,<br />
                          Reçois ces mots simples mais sincères et touchants :<br />
                          <strong>Joyeux anniversaire, chère amie adorée,</strong><br />
                          Que ta vie soit belle, heureuse et illuminée ! ✨🎂💖
                        </p>
                      </div>
                      <div className="relative group overflow-hidden rounded-2xl card-hover">
                        <img 
                          src="felicite1.jpg" 
                          alt="Félicité 5" 
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
