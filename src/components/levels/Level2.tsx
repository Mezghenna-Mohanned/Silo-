import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lightbulb, CheckCircle, Play, ArrowRight, Cpu, Binary } from 'lucide-react';
import { atbashEncode } from '../../utils/ciphers';
import { levels } from '../../utils/gameData';

interface Level2Props {
  onComplete: (score: number) => void;
  onHint: () => void;
  hintsUsed: number;
}

export const Level2: React.FC<Level2Props> = ({ onComplete, onHint, hintsUsed }) => {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [phase1Input, setPhase1Input] = useState('');
  const [phase2Input, setPhase2Input] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  const level = levels[1];

  // Phase 1: Decode to "S2E1"
  const phase1Cipher = "F2R1"; // Simple cipher that decodes to S2E1
  const phase1Solution = "S2E1";
  
  // Phase 2: Decode to "10:15"
  const phase2Cipher = "01001000 00110001 00110000 00111010 00110001 00110101"; // Binary for "10:15"
  const phase2Solution = "10:15";

  const checkPhase1 = () => {
    const normalizedInput = phase1Input.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (normalizedInput === phase1Solution) {
      setGlitchEffect(true);
      setTimeout(() => {
        setPhase(2);
        setGlitchEffect(false);
      }, 1500);
    }
  };

  const checkPhase2 = () => {
    const normalizedInput = phase2Input.replace(/[^0-9:]/g, '');
    if (normalizedInput === phase2Solution) {
      setShowSolution(true);
      const score = Math.max(75, level.maxScore - (hintsUsed * 25));
      setTimeout(() => onComplete(score), 2000);
    }
  };

  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 200);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20" />
        
        {/* Glitch Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
            style={{ top: `${10 + i * 12}%` }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
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

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyan-500/30">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">
                ARCANE <span className="text-pink-400">PROTOCOL</span>
              </h1>
            </div>
            <p className="text-gray-300 mt-4 text-lg">
              Jinx's chaotic encryption system - Two phases to breach
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            {/* Left Panel - Current Phase */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 flex flex-col">
              <AnimatePresence mode="wait">
                {phase === 1 ? (
                  <motion.div
                    key="phase1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <h2 className="text-xl font-bold text-pink-400">EPISODE REFERENCE</h2>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="bg-gray-900/80 p-4 rounded-lg border border-pink-500/30">
                        <div className="text-pink-400 text-sm mb-2 font-mono">
                          {'> INTERCEPTED_TRANSMISSION.arcane'}
                        </div>
                        <div className="text-cyan-400 text-2xl tracking-wider font-mono">
                          {phase1Cipher}
                        </div>
                      </div>

                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                        <div className="text-gray-400 text-sm mb-2">DECODE HINT:</div>
                        <div className="text-white text-sm italic">
                          "You crazy. Talking to dead people?"
                        </div>
                        <div className="text-gray-500 text-xs mt-2">
                          - Find the episode reference where this line appears
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-cyan-400">
                          DECODED OUTPUT:
                        </label>
                        <input
                          type="text"
                          value={phase1Input}
                          onChange={(e) => setPhase1Input(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900 border-2 border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-cyan-400 font-mono text-lg"
                          placeholder="Enter episode reference..."
                          onKeyPress={(e) => e.key === 'Enter' && checkPhase1()}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={checkPhase1}
                          className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all font-bold"
                        >
                          EXECUTE PHASE 1
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="phase2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <h2 className="text-xl font-bold text-cyan-400">TIMESTAMP CIPHER</h2>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500/30">
                        <div className="text-cyan-400 text-sm mb-2 font-mono flex items-center space-x-2">
                          <Binary className="w-4 h-4" />
                          <span>{'> BINARY_SEQUENCE.jinx'}</span>
                        </div>
                        <div className="text-green-400 text-sm font-mono leading-relaxed">
                          {phase2Cipher}
                        </div>
                      </div>

                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                        <div className="text-gray-400 text-sm mb-2">DECODE HINT:</div>
                        <div className="text-white text-sm">
                          Binary sequence → ASCII → Timestamp format
                        </div>
                        <div className="text-gray-500 text-xs mt-2">
                          When does Jinx say that line in the episode?
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-cyan-400">
                          TIMESTAMP OUTPUT:
                        </label>
                        <input
                          type="text"
                          value={phase2Input}
                          onChange={(e) => setPhase2Input(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900 border-2 border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-cyan-400 font-mono text-lg"
                          placeholder="MM:SS format..."
                          onKeyPress={(e) => e.key === 'Enter' && checkPhase2()}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={checkPhase2}
                          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-bold"
                        >
                          {showSolution ? (
                            <span className="flex items-center justify-center space-x-2">
                              <CheckCircle className="w-5 h-5" />
                              <span>PROTOCOL BREACHED!</span>
                            </span>
                          ) : (
                            'EXECUTE PHASE 2'
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel - Status & Visual */}
            <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-purple-400">SYSTEM STATUS</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onHint}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>HINT</span>
                </motion.button>
              </div>

              {/* Phase Progress */}
              <div className="space-y-4 mb-8">
                <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  phase >= 1 ? 'bg-pink-900/30 border-pink-500/50' : 'bg-gray-700/30 border-gray-600'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    phase >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    {phase > 1 ? '✓' : '1'}
                  </div>
                  <span className={phase >= 1 ? 'text-pink-400' : 'text-gray-500'}>
                    Episode Reference
                  </span>
                  {phase > 1 && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                </div>

                <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  phase >= 2 ? 'bg-cyan-900/30 border-cyan-500/50' : 'bg-gray-700/30 border-gray-600'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    phase >= 2 ? 'bg-cyan-500 text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    {showSolution ? '✓' : '2'}
                  </div>
                  <span className={phase >= 2 ? 'text-cyan-400' : 'text-gray-500'}>
                    Timestamp Cipher
                  </span>
                  {showSolution && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                </div>
              </div>

              {/* Visual Effect Area */}
              <div className="flex-1 relative">
                <motion.div
                  className={`w-full h-full bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg border border-gray-600 flex items-center justify-center ${
                    glitchEffect ? 'animate-pulse' : ''
                  }`}
                  animate={glitchEffect ? {
                    scale: [1, 1.05, 0.95, 1],
                    rotate: [0, 1, -1, 0],
                  } : {}}
                >
                  {phase === 1 ? (
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <div className="text-pink-400 font-mono">SCANNING ARCHIVES...</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            '0 0 20px rgba(6, 182, 212, 0.5)',
                            '0 0 40px rgba(6, 182, 212, 0.8)',
                            '0 0 20px rgba(6, 182, 212, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 bg-cyan-500/20 rounded-full mx-auto mb-4 flex items-center justify-center"
                      >
                        <Binary className="w-8 h-8 text-cyan-400" />
                      </motion.div>
                      <div className="text-cyan-400 font-mono">DECODING BINARY...</div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="bg-gray-900 border-2 border-cyan-400 p-8 rounded-lg shadow-2xl text-center max-w-md"
                   style={{ boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)' }}>
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">PROTOCOL BREACHED!</h3>
                <p className="text-gray-300 mb-4">Jinx's encryption cracked</p>
                <div className="text-pink-400 text-sm font-mono">
                  "Chaos is the only constant..."
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};