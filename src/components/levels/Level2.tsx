import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Lightbulb, CheckCircle, Cog, Target } from 'lucide-react';
import { atbashEncode } from '../../utils/ciphers';
import { generateChallenge } from '../../utils/gameData';
import { levels } from '../../utils/gameData';

interface Level2Props {
  onComplete: (score: number) => void;
  onHint: () => void;
  hintsUsed: number;
}

export const Level2: React.FC<Level2Props> = ({ onComplete, onHint, hintsUsed }) => {
  const [userInput, setUserInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [activeRunes, setActiveRunes] = useState<number[]>([]);
  const [hexTechPower, setHexTechPower] = useState(0);
  
  const level = levels[1];
  const challenge = generateChallenge(level);

  const runes = ['⚡', '🔮', '⚙️', '🧪', '💎', '🔥'];

  const toggleRune = (index: number) => {
    setActiveRunes(prev => {
      const newActive = prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index];
      setHexTechPower(newActive.length * 16.67);
      return newActive;
    });
  };

  const checkSolution = () => {
    if (userInput.toUpperCase().trim() === challenge.solution) {
      setShowSolution(true);
      const score = Math.max(75, level.maxScore - (hintsUsed * 25));
      setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Enlarged background image */}
      <div className="absolute inset-0 flex items-center justify-start z-0">
        <img 
          src="/images/jnx.png" 
          alt="Arcane background" 
          className="h-full object-contain object-left"
          style={{ width: 'auto', maxWidth: '120%' }}
        />
      </div>
      
      {/* Dark overlay - only outside the image */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-lime-400 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth * 0.6],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Game container - left-aligned and scaled down */}
      <div className="container mx-auto px-4 py-8 relative z-30 w-full max-w-[50%]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="scale-90 origin-left" // Scales down the UI while keeping it left-aligned
        >
          {/* Header */}
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border-2 border-lime-400 shadow-2xl mb-6">
            <motion.h1
              className="text-3xl font-bold text-lime-400 mb-3 text-center"
              style={{ textShadow: '0 0 20px #84cc16' }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              ⚡ {level.title}
            </motion.h1>
            <p className="text-lg text-gray-300 text-center">
              {level.description}
            </p>
            <div className="text-center mt-3">
              <span className="text-lime-300 text-sm font-mono">
                "THERE IS A MONSTER INSIDE ALL OF US"
              </span>
            </div>
          </div>

          {/* Main Interface - scaled down */}
          <div className="bg-black/85 backdrop-blur-sm p-6 border-2 border-lime-400 shadow-2xl rounded-lg">
            {/* HexTech Power Core */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-lime-400 mb-4">HexTech Power Core</h3>
              
              <div className="mb-4">
                <div className="w-full bg-gray-800 rounded-full h-4 border border-lime-400">
                  <motion.div
                    className="h-full bg-gradient-to-r from-lime-400 to-yellow-400 rounded-full"
                    style={{ width: `${hexTechPower}%` }}
                    animate={{ boxShadow: `0 0 ${hexTechPower/5}px #84cc16` }}
                  />
                </div>
                <div className="text-lime-400 text-sm mt-1">
                  Power: {Math.round(hexTechPower)}%
                </div>
              </div>
              
              <motion.div
                className="relative w-40 h-40 mx-auto mb-6" // Smaller rune circle
                animate={{ rotate: hexTechPower > 50 ? 360 : 0 }}
                transition={{ duration: 4, repeat: hexTechPower > 50 ? Infinity : 0, ease: "linear" }}
              >
                <div className="absolute inset-0 border-2 border-lime-400 rounded-full" 
                     style={{ boxShadow: `0 0 20px #84cc16` }}>
                  {runes.map((rune, index) => {
                    const angle = (index * 60) * (Math.PI / 180);
                    const x = Math.cos(angle) * 70;
                    const y = Math.sin(angle) * 70;
                    
                    return (
                      <motion.button
                        key={index}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                          activeRunes.includes(index)
                            ? 'bg-lime-400 text-black shadow-lg'
                            : 'bg-black border-2 border-lime-400 text-lime-400 hover:bg-lime-400/20'
                        }`}
                        style={{
                          left: `calc(50% + ${x}px - 16px)`,
                          top: `calc(50% + ${y}px - 16px)`,
                          boxShadow: activeRunes.includes(index) ? '0 0 15px #84cc16' : 'none'
                        }}
                        onClick={() => toggleRune(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {rune}
                      </motion.button>
                    );
                  })}
                </div>
                
                <div className="absolute inset-5 border border-yellow-400 rounded-full flex items-center justify-center">
                  <Target className="w-10 h-10 text-yellow-400" />
                </div>
              </motion.div>
            </div>

            {/* Decoding Terminal */}
            <div className="bg-black p-3 rounded-lg border border-lime-400 mb-4">
              <div className="text-lime-400 text-sm mb-1 font-mono">
                {'> INTERCEPTED_ZAUN_TRANSMISSION.hex'}
              </div>
              <div className="text-yellow-400 text-md tracking-wider font-mono animate-pulse">
                {challenge.encoded}
              </div>
            </div>
            
            <div className="bg-black p-3 rounded-lg border border-yellow-400 mb-4">
              <div className="text-yellow-400 text-sm mb-1 font-mono">
                {'> ATBASH_DECODER.exe [ACTIVE]'}
              </div>
              <div className="text-lime-400 text-xs font-mono">
                CIPHER_MAP: A↔Z, B↔Y, C↔X, D↔W, E↔V...
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-lime-400 mb-2">
                DECODED_OUTPUT:
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-3 py-1 bg-black border-2 border-lime-400 rounded-lg text-lime-400 font-mono"
                placeholder="Enter decoded message..."
                onKeyPress={(e) => e.key === 'Enter' && checkSolution()}
              />
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkSolution}
                className="flex-1 px-4 py-2 bg-lime-400 text-black rounded-lg font-bold text-sm"
              >
                {showSolution ? 'HEXTECH ACTIVATED!' : 'EXECUTE DECODE'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onHint}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
              >
                <Lightbulb className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="bg-black border-2 border-lime-400 p-6 rounded-lg text-center">
                <Zap className="w-12 h-12 text-lime-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-lime-400 mb-2">HEXTECH CRYSTAL ACTIVATED!</h3>
                <p className="text-gray-300">Advancing to next sector...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};