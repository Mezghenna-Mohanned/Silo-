import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Lightbulb, CheckCircle, Cog } from 'lucide-react';
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
  
  const level = levels[1];
  const challenge = generateChallenge(level);

  const runes = ['⚡', '🔮', '⚙️', '🧪', '💎', '🔥'];

  const toggleRune = (index: number) => {
    setActiveRunes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const checkSolution = () => {
    if (userInput.toUpperCase().trim() === challenge.solution) {
      setShowSolution(true);
      const score = Math.max(75, level.maxScore - (hintsUsed * 25));
      setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Cyberpunk Header */}
          <div className="bg-gradient-to-r from-purple-800/80 to-blue-800/80 p-8 rounded-t-lg border border-neon-blue shadow-2xl backdrop-blur-sm">
            <motion.h1
              className="text-4xl font-cyber text-neon-blue mb-4 text-center animate-glow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              ⚡ {level.title}
            </motion.h1>
            <p className="text-lg text-gray-300 text-center">
              {level.description}
            </p>
          </div>

          {/* Main Interface */}
          <div className="bg-gray-900/90 p-8 border border-neon-blue border-t-0 shadow-2xl backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Alchemical Interface */}
              <div className="text-center">
                <h3 className="text-2xl font-cyber text-neon-green mb-6">Hextech Decoder</h3>
                
                {/* Rune Circle */}
                <motion.div
                  className="relative w-64 h-64 mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-2 border-neon-blue rounded-full animate-pulse">
                    {runes.map((rune, index) => {
                      const angle = (index * 60) * (Math.PI / 180);
                      const x = Math.cos(angle) * 100;
                      const y = Math.sin(angle) * 100;
                      
                      return (
                        <motion.button
                          key={index}
                          className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                            activeRunes.includes(index)
                              ? 'bg-neon-blue text-black shadow-lg shadow-neon-blue/50'
                              : 'bg-gray-800 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/20'
                          }`}
                          style={{
                            left: `calc(50% + ${x}px - 24px)`,
                            top: `calc(50% + ${y}px - 24px)`,
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
                  
                  <div className="absolute inset-8 border border-neon-green rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <Cog className="w-16 h-16 text-neon-green" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="text-neon-blue text-sm">
                  Active Runes: {activeRunes.length}/6
                </div>
              </div>

              {/* Decoding Terminal */}
              <div>
                <h3 className="text-2xl font-cyber text-neon-green mb-4">Zaun Terminal</h3>
                
                <div className="bg-black p-4 rounded-lg border border-neon-green mb-4 font-mono">
                  <div className="text-neon-green text-sm mb-2">
                    &gt; INTERCEPTED_MESSAGE.hex
                  </div>
                  <div className="text-neon-blue text-lg tracking-wider animate-flicker">
                    {challenge.encoded}
                  </div>
                </div>
                
                <div className="bg-black p-4 rounded-lg border border-neon-blue mb-4 font-mono">
                  <div className="text-neon-blue text-sm mb-2">
                    &gt; ATBASH_DECODER.exe
                  </div>
                  <div className="text-neon-green text-sm">
                    A↔Z, B↔Y, C↔X, D↔W, E↔V...
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neon-green mb-2">
                    DECODED_OUTPUT:
                  </label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-neon-blue rounded-lg focus:border-neon-green focus:outline-none text-neon-blue font-mono"
                    placeholder="Enter decoded message..."
                    onKeyPress={(e) => e.key === 'Enter' && checkSolution()}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={checkSolution}
                    className="flex-1 px-6 py-3 bg-neon-green text-black rounded-lg hover:bg-neon-green/80 transition-all font-semibold"
                  >
                    {showSolution ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>DECODED!</span>
                      </span>
                    ) : (
                      'EXECUTE'
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onHint}
                    className="px-6 py-3 bg-neon-blue text-black rounded-lg hover:bg-neon-blue/80 transition-all"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <div className="bg-gray-900 border border-neon-green p-8 rounded-lg shadow-2xl text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-16 h-16 text-neon-green mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-neon-green mb-2">HEXTECH ACTIVATED!</h3>
                <p className="text-gray-300">Advancing to next sector...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};