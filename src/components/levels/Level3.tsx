import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lightbulb, CheckCircle, Cpu } from 'lucide-react';
import { base64Decode } from '../../utils/ciphers';
import { generateChallenge } from '../../utils/gameData';
import { levels } from '../../utils/gameData';

interface Level3Props {
  onComplete: (score: number) => void;
  onHint: () => void;
  hintsUsed: number;
}

export const Level3: React.FC<Level3Props> = ({ onComplete, onHint, hintsUsed }) => {
  const [userInput, setUserInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> SYSTEM INITIALIZED',
    '> SCANNING FOR ENCRYPTED TRANSMISSIONS...',
    '> TRANSMISSION INTERCEPTED',
    '> DECRYPTION PROTOCOL REQUIRED',
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  
  const level = levels[2];
  const challenge = generateChallenge(level);

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalLines(prev => [
        ...prev,
        `> ${Math.random() > 0.5 ? 'SCANNING...' : 'ANALYZING...'}`
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const executeCommand = (command: string) => {
    const newLines = [...terminalLines, `> ${command}`];
    
    if (command.toLowerCase().includes('decode') || command.toLowerCase().includes('base64')) {
      const decoded = base64Decode(challenge.encoded);
      newLines.push(`> DECODED: ${decoded}`);
    } else if (command.toLowerCase().includes('help')) {
      newLines.push('> AVAILABLE COMMANDS: decode, base64, help, clear');
    } else if (command.toLowerCase().includes('clear')) {
      setTerminalLines(['> TERMINAL CLEARED']);
      return;
    } else {
      newLines.push('> COMMAND NOT RECOGNIZED');
    }
    
    setTerminalLines(newLines.slice(-10)); // Keep only last 10 lines
  };

  const checkSolution = () => {
    if (userInput.toUpperCase().trim() === challenge.solution) {
      setShowSolution(true);
      const score = Math.max(100, level.maxScore - (hintsUsed * 30));
      setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-green font-mono text-sm"
            style={{ left: `${(i * 2) % 100}%` }}
            animate={{
              y: [-100, window.innerHeight + 100],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {Math.random().toString(36).substring(2, 15)}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Terminal Header */}
          <div className="bg-gray-900 p-4 rounded-t-lg border-2 border-neon-green">
            <div className="flex items-center space-x-4">
              <Terminal className="w-6 h-6 text-neon-green" />
              <motion.h1
                className="text-2xl font-mono text-neon-green"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                HACKER_TERMINAL_v2.1
              </motion.h1>
              <div className="flex space-x-2 ml-auto">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-black p-6 border-2 border-neon-green border-t-0 rounded-b-lg font-mono text-neon-green">
            <div className="mb-6">
              <h2 className="text-xl mb-4 text-center animate-pulse">
                {level.title}
              </h2>
              <p className="text-sm text-gray-400 text-center mb-6">
                {level.description}
              </p>
            </div>

            {/* Terminal Output */}
            <div className="bg-gray-900 p-4 rounded-lg mb-4 h-64 overflow-y-auto border border-gray-700">
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-1 text-sm"
                >
                  {line}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-neon-green ml-1"
              />
            </div>

            {/* Encrypted Message Display */}
            <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-4">
              <div className="text-red-400 text-sm mb-2">
                INTERCEPTED TRANSMISSION:
              </div>
              <div className="text-red-300 font-bold tracking-wider break-all">
                {challenge.encoded}
              </div>
            </div>

            {/* Command Input */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-neon-green">$</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      executeCommand(currentCommand);
                      setCurrentCommand('');
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-neon-green"
                  placeholder="Enter command..."
                />
              </div>
              <div className="text-xs text-gray-500">
                Try: decode, base64, help, clear
              </div>
            </div>

            {/* Solution Input */}
            <div className="border-t border-gray-700 pt-4">
              <div className="mb-4">
                <label className="block text-sm text-neon-green mb-2">
                  DECODED MESSAGE:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-neon-green rounded focus:border-neon-blue focus:outline-none text-neon-green"
                  placeholder="Enter the decoded transmission..."
                  onKeyPress={(e) => e.key === 'Enter' && checkSolution()}
                />
              </div>
              
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkSolution}
                  className="flex-1 px-6 py-3 bg-neon-green text-black rounded hover:bg-neon-green/80 transition-all font-semibold"
                >
                  {showSolution ? (
                    <span className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>ACCESS GRANTED</span>
                    </span>
                  ) : (
                    'EXECUTE'
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onHint}
                  className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Lightbulb className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="bg-gray-900 border-2 border-neon-green p-8 rounded-lg shadow-2xl text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Cpu className="w-16 h-16 text-neon-green mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-neon-green mb-2">SYSTEM BREACHED!</h3>
                <p className="text-gray-300">Accessing next security layer...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};