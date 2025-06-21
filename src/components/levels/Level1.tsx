import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Lightbulb, CheckCircle } from 'lucide-react';
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
  
  const level = levels[0];
  const challenge = generateChallenge(level);
  const decodedText = caesarDecode(challenge.encoded, shift);

  const checkSolution = () => {
    if (userInput.toUpperCase().trim() === challenge.solution) {
      setShowSolution(true);
      const score = Math.max(50, level.maxScore - (hintsUsed * 20));
      setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Chalkboard Header */}
          <div className="bg-slate-800 p-8 rounded-t-lg border-4 border-amber-800 shadow-2xl">
            <motion.h1
              className="text-4xl font-serif text-chalk-white mb-4 text-center"
              style={{ color: '#f8f8ff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              📚 {level.title}
            </motion.h1>
            <p className="text-lg text-gray-300 text-center font-serif">
              {level.description}
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-amber-50 p-8 border-4 border-amber-800 border-t-0 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cipher Wheel */}
              <div className="text-center">
                <h3 className="text-2xl font-serif text-amber-900 mb-4">Caesar Cipher Wheel</h3>
                <motion.div
                  className="relative w-64 h-64 mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-amber-200 rounded-full border-4 border-amber-800 shadow-lg">
                    <div className="absolute inset-4 bg-amber-100 rounded-full border-2 border-amber-600">
                      <motion.div
                        className="absolute inset-2 bg-white rounded-full border border-amber-400 flex items-center justify-center"
                        animate={{ rotate: shift * 13.85 }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        <span className="text-3xl font-bold text-amber-900">
                          {shift}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex justify-center space-x-4 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShift(Math.max(0, shift - 1))}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    ← Shift Left
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShift(Math.min(25, shift + 1))}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Shift Right →
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShift(0)}
                  className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </motion.button>
              </div>

              {/* Decoding Area */}
              <div>
                <h3 className="text-2xl font-serif text-amber-900 mb-4">Decode the Message</h3>
                
                <div className="bg-white p-4 rounded-lg border-2 border-amber-300 mb-4 shadow-inner">
                  <p className="text-sm text-gray-600 mb-2">Encoded Message:</p>
                  <p className="font-mono text-lg text-red-700 font-bold tracking-wider">
                    {challenge.encoded}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-amber-300 mb-4 shadow-inner">
                  <p className="text-sm text-gray-600 mb-2">Decoded with shift {shift}:</p>
                  <p className="font-mono text-lg text-blue-700 font-bold tracking-wider">
                    {decodedText}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    Enter your solution:
                  </label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="Type the decoded message here..."
                    onKeyPress={(e) => e.key === 'Enter' && checkSolution()}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={checkSolution}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    {showSolution ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Correct!</span>
                      </span>
                    ) : (
                      'Submit Solution'
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onHint}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Level Complete!</h3>
                <p className="text-gray-600">Moving to next level...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};