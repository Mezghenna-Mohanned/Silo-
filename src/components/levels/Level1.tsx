import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lightbulb, CheckCircle, Lock, Unlock, Code, Zap } from 'lucide-react';
import { caesarDecode } from '../../utils/ciphers';
import { generateChallenge } from '../../utils/gameData';
import { levels } from '../../utils/gameData';

interface Level1Props {
  onComplete: (score: number) => void;
  onHint: () => void;
  hintsUsed: number;
}

export const Level1: React.FC<Level1Props> = ({ onComplete, onHint, hintsUsed }) => {
  const [shift, setShift] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showExample, setShowExample] = useState(true);
  
  const level = levels[0];
  const challenge = generateChallenge(level);
  const decodedText = caesarDecode(challenge.encoded, shift);

  // Example for demonstration
  const exampleCipher = "KHOOR";
  const exampleShift = 3;
  const exampleDecoded = caesarDecode(exampleCipher, exampleShift);

  const checkSolution = () => {
    if (userInput.toUpperCase().trim() === challenge.solution) {
      setShowSolution(true);
      const score = Math.max(50, level.maxScore - (hintsUsed * 20));
      setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 relative overflow-hidden">
      {/* Matrix-style background effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            style={{ left: `${(i * 3.33) % 100}%` }}
            animate={{
              y: [-50, window.innerHeight + 50],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {Math.random().toString(36).substring(2, 8)}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-green-500/30">
              <Terminal className="w-6 h-6 text-green-400" />
              <h1 className="text-2xl font-bold text-white">
                HACK <span className="text-green-400">INITIATION</span>
              </h1>
            </div>
            <p className="text-gray-300 mt-4 text-lg">
              Learn the basics of Caesar Cipher decryption
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Instructions Panel */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Code className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-green-400">MISSION BRIEFING</h2>
              </div>

              <div className="space-y-6">
                {/* Instructions */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-white font-bold mb-3 flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-yellow-400" />
                    <span>CAESAR CIPHER BASICS</span>
                  </h3>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>• Each letter is shifted by a fixed number of positions</p>
                    <p>• A → D (shift of 3), B → E, C → F, etc.</p>
                    <p>• Use the cipher wheel to find the correct shift</p>
                    <p>• When the decoded text makes sense, you've found it!</p>
                  </div>
                </div>

                {/* Example */}
                {showExample && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-green-900/20 p-4 rounded-lg border border-green-500/50"
                  >
                    <h3 className="text-green-400 font-bold mb-3 flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>EXAMPLE</span>
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Encrypted:</span>
                        <span className="text-red-400 font-mono">{exampleCipher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shift:</span>
                        <span className="text-yellow-400 font-mono">{exampleShift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Decrypted:</span>
                        <span className="text-green-400 font-mono">{exampleDecoded}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowExample(false)}
                      className="mt-3 text-xs text-gray-500 hover:text-gray-400"
                    >
                      Hide example
                    </button>
                  </motion.div>
                )}

                {/* Current Challenge */}
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/50">
                  <h3 className="text-red-400 font-bold mb-3 flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>YOUR MISSION</span>
                  </h3>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">Encrypted Message:</div>
                    <div className="text-red-400 font-mono text-lg tracking-wider bg-gray-900/50 p-2 rounded">
                      {challenge.encoded}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decryption Panel */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-green-400">DECRYPTION TERMINAL</h2>
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

              <div className="space-y-6">
                {/* Cipher Wheel */}
                <div className="text-center">
                  <h3 className="text-white font-bold mb-4">SHIFT CONTROL</h3>
                  <motion.div
                    className="relative w-32 h-32 mx-auto mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-gray-700 rounded-full border-2 border-green-400">
                      <motion.div
                        className="absolute inset-2 bg-gray-800 rounded-full border border-green-300 flex items-center justify-center"
                        animate={{ rotate: shift * 14.4 }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        <span className="text-2xl font-bold text-green-400">
                          {shift}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div className="flex justify-center space-x-4 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShift(Math.max(0, shift - 1))}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      ← -1
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShift(Math.min(25, shift + 1))}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      +1 →
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShift(0)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    RESET
                  </motion.button>
                </div>

                {/* Decoding Result */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                  <div className="text-gray-400 text-sm mb-2">Decoded with shift {shift}:</div>
                  <div className="text-green-400 font-mono text-lg tracking-wider bg-black/30 p-2 rounded">
                    {decodedText}
                  </div>
                </div>
                
                {/* Solution Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-green-400">
                    ENTER DECRYPTED MESSAGE:
                  </label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-green-500/50 rounded-lg focus:border-green-400 focus:outline-none text-green-400 font-mono"
                    placeholder="Type the decoded message..."
                    onKeyPress={(e) => e.key === 'Enter' && checkSolution()}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={checkSolution}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-bold"
                  >
                    {showSolution ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>ACCESS GRANTED!</span>
                      </span>
                    ) : (
                      'SUBMIT SOLUTION'
                    )}
                  </motion.button>
                </div>
              </div>
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
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Unlock className="w-16 h-16 text-green-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">HACK SUCCESSFUL!</h3>
                <p className="text-gray-300 mb-4">First encryption cracked</p>
                <div className="text-green-400 text-sm font-mono">
                  "Welcome to the underground..."
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};