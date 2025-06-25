import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lightbulb, CheckCircle, Play, ArrowRight, Cpu, Binary, Target } from 'lucide-react';
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
  const [phase1Complete, setPhase1Complete] = useState(false);
  const [phase2Complete, setPhase2Complete] = useState(false);
  
  const level = levels[1];

  // Phase 1: Atbash cipher that decodes to "S2E1"
  const phase1Cipher = "H2V1"; // Atbash: S=H, 2=2, E=V, 1=1
  const phase1Solution = "S2E1";
  
  // Phase 2: Binary that decodes to "10:15"
  const phase2Cipher = "00110001 00110000 00111010 00110001 00110101";
  const phase2Solution = "10:15";

  const finalAnswer = "You crazy. Talking to dead people?";

  const normalizeText = (text: string): string => {
    return text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  };

  const checkPhase1 = () => {
    const normalizedInput = phase1Input.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (normalizedInput === phase1Solution) {
      setPhase1Complete(true);
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
      setPhase2Complete(true);
      setShowSolution(true);
      const score = Math.max(75, level.maxScore - (hintsUsed * 25));
      setTimeout(() => onComplete(score), 2000);
    }
  };

  const checkFinalAnswer = (input: string) => {
    return normalizeText(input) === normalizeText(finalAnswer);
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
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Glitch overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-purple-900/30" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
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
            <div className="inline-flex items-center space-x-3 bg-gray-900/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-green-500/50">
              <Target className="w-6 h-6 text-green-400" />
              <h1 className="text-2xl font-bold text-white">
                JINX <span className="text-green-400">PROTOCOL</span>
              </h1>
            </div>
            <p className="text-gray-200 mt-4 text-lg">
              "There is a monster inside all of us"
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Current Phase */}
            <div className="bg-gray-900/90 backdrop-blur-sm border border-green-500/50 rounded-lg p-6 flex flex-col">
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
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <h2 className="text-xl font-bold text-green-400">ARCANE EPISODE REFERENCE</h2>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="bg-gray-800/80 p-4 rounded-lg border border-green-500/30">
                        <div className="text-green-400 text-sm mb-2 font-mono">
                          {'> ENCRYPTED_EPISODE_CODE.jinx'}
                        </div>
                        <div className="text-green-400 text-3xl tracking-wider font-mono text-center py-4">
                          {phase1Cipher}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                        <div className="text-gray-300 text-sm mb-2">MISSION OBJECTIVE:</div>
                        <div className="text-white text-sm italic mb-2">
                          Find the episode where Jinx says:
                        </div>
                        <div className="text-green-400 text-lg font-bold text-center py-2">
                          "You crazy. Talking to dead people?"
                        </div>
                        <div className="text-gray-400 text-xs mt-2">
                          Hint: Use Atbash cipher (A↔Z, B↔Y, C↔X...)
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-green-400">
                          EPISODE REFERENCE (Format: S#E#):
                        </label>
                        <input
                          type="text"
                          value={phase1Input}
                          onChange={(e) => setPhase1Input(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border-2 border-green-500/50 rounded-lg focus:border-green-400 focus:outline-none text-green-400 font-mono text-lg"
                          placeholder="S2E1"
                          onKeyPress={(e) => e.key === 'Enter' && checkPhase1()}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={checkPhase1}
                          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold"
                        >
                          DECODE PHASE 1
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
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <h2 className="text-xl font-bold text-purple-400">TIMESTAMP CIPHER</h2>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="bg-gray-800/80 p-4 rounded-lg border border-purple-500/30">
                        <div className="text-purple-400 text-sm mb-2 font-mono flex items-center space-x-2">
                          <Binary className="w-4 h-4" />
                          <span>{'> BINARY_TIMESTAMP.jinx'}</span>
                        </div>
                        <div className="text-green-400 text-sm font-mono leading-relaxed text-center py-2">
                          {phase2Cipher}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                        <div className="text-gray-300 text-sm mb-2">MISSION OBJECTIVE:</div>
                        <div className="text-white text-sm mb-2">
                          Decode the binary to find the timestamp when Jinx says the line in S2E1
                        </div>
                        <div className="text-gray-400 text-xs">
                          Hint: Binary → ASCII → MM:SS format
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-purple-400">
                          TIMESTAMP (MM:SS):
                        </label>
                        <input
                          type="text"
                          value={phase2Input}
                          onChange={(e) => setPhase2Input(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border-2 border-purple-500/50 rounded-lg focus:border-purple-400 focus:outline-none text-purple-400 font-mono text-lg"
                          placeholder="10:15"
                          onKeyPress={(e) => e.key === 'Enter' && checkPhase2()}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={checkPhase2}
                          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold"
                        >
                          {showSolution ? (
                            <span className="flex items-center justify-center space-x-2">
                              <CheckCircle className="w-5 h-5" />
                              <span>PROTOCOL COMPLETE!</span>
                            </span>
                          ) : (
                            'DECODE PHASE 2'
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel - Status & Visual */}
            <div className="bg-gray-900/90 backdrop-blur-sm border border-green-500/50 rounded-lg p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-green-400">JINX PROTOCOL STATUS</h3>
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
                  phase1Complete ? 'bg-green-900/30 border-green-500/50' : phase >= 1 ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-700/30 border-gray-600'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    phase1Complete ? 'bg-green-500 text-white' : phase >= 1 ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    {phase1Complete ? '✓' : '1'}
                  </div>
                  <span className={phase >= 1 ? 'text-green-400' : 'text-gray-500'}>
                    Episode Reference
                  </span>
                  {phase1Complete && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                </div>

                <div className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  phase2Complete ? 'bg-purple-900/30 border-purple-500/50' : phase >= 2 ? 'bg-purple-900/20 border-purple-500/30' : 'bg-gray-700/30 border-gray-600'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    phase2Complete ? 'bg-purple-500 text-white' : phase >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    {phase2Complete ? '✓' : '2'}
                  </div>
                  <span className={phase >= 2 ? 'text-purple-400' : 'text-gray-500'}>
                    Timestamp Cipher
                  </span>
                  {phase2Complete && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                </div>
              </div>

              {/* Quote Display */}
              <div className="flex-1 relative">
                <motion.div
                  className={`w-full h-full bg-gradient-to-br from-green-900/20 to-purple-900/20 rounded-lg border border-gray-600 flex items-center justify-center p-6 ${
                    glitchEffect ? 'animate-pulse' : ''
                  }`}
                  animate={glitchEffect ? {
                    scale: [1, 1.05, 0.95, 1],
                    rotate: [0, 1, -1, 0],
                  } : {}}
                >
                  <div className="text-center">
                    {phase === 1 ? (
                      <div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <div className="text-green-400 font-mono">SCANNING ARCANE ARCHIVES...</div>
                      </div>
                    ) : (
                      <div>
                        <motion.div
                          animate={{ 
                            boxShadow: [
                              '0 0 20px rgba(168, 85, 247, 0.5)',
                              '0 0 40px rgba(168, 85, 247, 0.8)',
                              '0 0 20px rgba(168, 85, 247, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-20 h-20 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center"
                        >
                          <Binary className="w-8 h-8 text-purple-400" />
                        </motion.div>
                        <div className="text-purple-400 font-mono">DECODING TIMESTAMP...</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Final Answer Display */}
              {phase2Complete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-900/30 rounded-lg border border-green-500/50"
                >
                  <div className="text-green-400 text-sm mb-2">FINAL ANSWER:</div>
                  <div className="text-white text-lg font-bold text-center">
                    "{finalAnswer}"
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="bg-gray-900 border-2 border-green-400 p-8 rounded-lg shadow-2xl text-center max-w-md"
                   style={{ boxShadow: '0 0 50px rgba(34, 197, 94, 0.5)' }}>
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-16 h-16 text-green-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">JINX PROTOCOL BREACHED!</h3>
                <p className="text-gray-300 mb-4">Chaos encryption cracked</p>
                <div className="text-green-400 text-sm font-mono">
                  "You crazy. Talking to dead people?"
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};