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
    <div 
      className="min-h-screen pt-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/jnx.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay to make content readable */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl"
        >
          {/* Header - positioned on the left */}
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

          {/* Main Interface - left side only */}
          <div className="bg-black/85 backdrop-blur-sm p-6 border-2 border-lime-400 shadow-2xl rounded-lg">
            {/* HexTech Power Core */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-lime-400 mb-4">HexTech Power Core</h3>
              
              {/* Power Level Display */}
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
              
              {/* Rune Circle */}
              <motion.div
                className="relative w-48 h-48 mx-auto mb-6"
                animate={{ rotate: hexTechPower > 50 ? 360 : 0 }}
                transition={{ duration: 4, repeat: hexTechPower > 50 ? Infinity : 0, ease: "linear" }}
              >
                <div className="absolute inset-0 border-2 border-lime-400 rounded-full" 
                     style={{ boxShadow: `0 0 20px #84cc16` }}>
                  {runes.map((rune, index) => {
                    const angle = (index * 60) * (Math.PI / 180);
                    const x = Math.cos(angle) * 80;
                    const y = Math.sin(angle) * 80;
                    
                    return (
                      <motion.button
                        key={index}
                        className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                          activeRunes.includes(index)
                            ? 'bg-lime-400 text-black shadow-lg'
                            : 'bg-black border-2 border-lime-400 text-lime-400 hover:bg-lime-400/20'
                        }`}
                        style={{
                          left: `calc(50% + ${x}px - 20px)`,
                          top: `calc(50% + ${y}px - 20px)`,
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
                
                <div className="absolute inset-6 border border-yellow-400 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Target className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Decoding Terminal */}
            <div className="bg-black p-4 rounded-lg border border-lime-400 mb-4">
              <div className="text-lime-400 text-sm mb-2 font-mono">
                > INTERCEPTED_ZAUN_TRANSMISSION.hex
              </div>
              <div className="text-yellow-400 text-lg tracking-wider font-mono animate-pulse">
                {challenge.encoded}
              </div>
            </div>
            
            <div className="bg-black p-4 rounded-lg border border-yellow-400 mb-4">
              <div className="text-yellow-400 text-sm mb-2 font-mono">
                > ATBASH_DECODER.exe [ACTIVE]
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
                className="w-full px-4 py-2 bg-black border-2 border-lime-400 rounded-lg focus:border-yellow-400 focus:outline-none text-lime-400 font-mono"
                placeholder="Enter decoded message..."
                onKeyPress={(e) => e.key === 'Enter' && checkSolution()}
                style={{ boxShadow: '0 0 10px rgba(132, 204, 22, 0.3)' }}
              />
            </div>
            
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px #84cc16' }}
                whileTap={{ scale: 0.95 }}
                onClick={checkSolution}
                className="flex-1 px-6 py-3 bg-lime-400 text-black rounded-lg hover:bg-lime-300 transition-all font-bold"
              >
                {showSolution ? (
                  <span className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>HEXTECH ACTIVATED!</span>
                  </span>
                ) : (
                  'EXECUTE DECODE'
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px #eab308' }}
                whileTap={{ scale: 0.95 }}
                onClick={onHint}
                className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-all"
              >
                <Lightbulb className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="bg-black border-2 border-lime-400 p-8 rounded-lg shadow-2xl text-center"
                   style={{ boxShadow: '0 0 50px #84cc16' }}>
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-16 h-16 text-lime-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-lime-400 mb-2">HEXTECH CRYSTAL ACTIVATED!</h3>
                <p className="text-gray-300">Advancing to next sector...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};