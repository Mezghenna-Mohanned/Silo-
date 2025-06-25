import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lightbulb, CheckCircle, Lock, Unlock, Shield, Database, Cpu } from 'lucide-react';
import { levels } from '../../utils/gameData';

interface Level3Props {
  onComplete: (score: number) => void;
  onHint: () => void;
  hintsUsed: number;
}

interface AccessNode {
  id: number;
  name: string;
  riddle: string;
  phrase: string;
  unlocked: boolean;
  helpText: string;
}

export const Level3: React.FC<Level3Props> = ({ onComplete, onHint, hintsUsed }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'SILO SECURITY SYSTEM v3.7.1',
    'Initializing access nodes...',
    '5 NODES DETECTED - ALL LOCKED',
    'Authentication required for each node',
    'Type "help" for available commands',
    ''
  ]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [finalInput, setFinalInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const [accessNodes, setAccessNodes] = useState<AccessNode[]>([
    {
      id: 1,
      name: 'MEM-TRACE.001',
      riddle: 'I am found when the forbidden is accessed.\nI speak only when the seeker dares decode history.\nI am the whisper of an erased memory.',
      phrase: "If you've gotten this far, you already know.",
      unlocked: false,
      helpText: 'Recovered from: LEGACY_DATA.bin > memTrace[Juliette]\nHint: This phrase acknowledges the seeker\'s journey into forbidden knowledge.'
    },
    {
      id: 2,
      name: 'SYSLOG.002',
      riddle: 'They said you had a choice.\nThey said the system was fair.\nThey lied.',
      phrase: 'The game is rigged.',
      unlocked: false,
      helpText: 'SYSLOG: Root entry = G***e *** R****D\nHint: The system was never meant to be fair. It was designed with predetermined outcomes.'
    },
    {
      id: 3,
      name: 'ECHO_CORE.003',
      riddle: 'You think you\'re special.\nBut zoom out...\nYou\'re just one dot in a circle of 50.',
      phrase: "We think we're the chosen ones but we're only one of many.",
      unlocked: false,
      helpText: 'Visual detected: [● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●]\nHint: Each dot represents a silo. You are not unique.'
    },
    {
      id: 4,
      name: 'GEN_ARCHIVE.004',
      riddle: 'They engineered the lie.\nNot one cage, but fifty.\nEach wired with a silent trigger.',
      phrase: "The founders didn't build a single silo. They built fifty. And they created the safeguard.",
      unlocked: false,
      helpText: 'Blueprint_Schema: SILO_NETWORK.blueprint\n├── Primary_Silo_01\n├── Backup_Silo_02-50\n└── Safeguard_Protocol.exe\nHint: The founders planned for redundancy and control.'
    },
    {
      id: 5,
      name: 'CONCLUSION.005',
      riddle: 'From the start.\nBy the ones who made it.\nAnd the ones who kept it.',
      phrase: 'We have been lied to.',
      unlocked: false,
      helpText: 'Truth_Status: DECEPTION_CONFIRMED\nSource: [FOUNDERS] + [MAINTAINERS]\nDuration: FROM_INCEPTION\nHint: The deception was systematic and complete.'
    }
  ]);

  const level = levels[2];
  const fullSolution = "If you've gotten this far, you already know. The game is rigged. We think we're the chosen ones but we're only one of many. The founders didn't build a single silo. They built fifty. And they created the safeguard. We have been lied to.";

  const normalizeText = (text: string): string => {
    return text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const newOutput = [...terminalOutput, `> ${command}`];

    if (cmd === 'help' && currentNode !== null) {
      const node = accessNodes[currentNode - 1];
      newOutput.push('');
      newOutput.push('=== HELP SYSTEM ===');
      newOutput.push(node.helpText);
      newOutput.push('');
      newOutput.push('Enter the correct phrase to unlock this node.');
    } else if (cmd === 'help') {
      newOutput.push('');
      newOutput.push('=== AVAILABLE COMMANDS ===');
      newOutput.push('access [1-5] - Access specific node');
      newOutput.push('status - Show node status');
      newOutput.push('help - Show this help (or node-specific help when in a node)');
      newOutput.push('clear - Clear terminal');
      newOutput.push('exit - Exit current node');
    } else if (cmd.startsWith('access ')) {
      const nodeNum = parseInt(cmd.split(' ')[1]);
      if (nodeNum >= 1 && nodeNum <= 5) {
        setCurrentNode(nodeNum);
        const node = accessNodes[nodeNum - 1];
        newOutput.push('');
        newOutput.push(`=== ACCESSING ${node.name} ===`);
        newOutput.push(node.unlocked ? '[UNLOCKED]' : '[LOCKED]');
        newOutput.push('');
        newOutput.push('RIDDLE:');
        node.riddle.split('\n').forEach(line => newOutput.push(line));
        newOutput.push('');
        newOutput.push('Enter the command "help" for assistance.');
      } else {
        newOutput.push('ERROR: Invalid node number. Use 1-5.');
      }
    } else if (cmd === 'status') {
      newOutput.push('');
      newOutput.push('=== NODE STATUS ===');
      accessNodes.forEach(node => {
        newOutput.push(`${node.name}: ${node.unlocked ? '[UNLOCKED]' : '[LOCKED]'}`);
      });
      const unlockedCount = accessNodes.filter(n => n.unlocked).length;
      newOutput.push('');
      newOutput.push(`Progress: ${unlockedCount}/5 nodes unlocked`);
      if (unlockedCount === 5) {
        newOutput.push('All nodes unlocked! Use "final" to access final terminal.');
      }
    } else if (cmd === 'final') {
      const unlockedCount = accessNodes.filter(n => n.unlocked).length;
      if (unlockedCount === 5) {
        setShowFinalInput(true);
        newOutput.push('');
        newOutput.push('=== FINAL ACCESS TERMINAL ===');
        newOutput.push('All nodes have been unlocked.');
        newOutput.push('Enter the complete decryption string to proceed.');
      } else {
        newOutput.push('ERROR: Not all nodes are unlocked yet.');
      }
    } else if (cmd === 'exit') {
      setCurrentNode(null);
      newOutput.push('Exited node access mode.');
    } else if (cmd === 'clear') {
      setTerminalOutput(['Terminal cleared']);
      return;
    } else if (currentNode !== null) {
      const node = accessNodes[currentNode - 1];
      if (normalizeText(command) === normalizeText(node.phrase)) {
        const updatedNodes = [...accessNodes];
        updatedNodes[currentNode - 1].unlocked = true;
        setAccessNodes(updatedNodes);
        
        newOutput.push('');
        newOutput.push('✓ PHRASE ACCEPTED');
        newOutput.push(`${node.name} UNLOCKED`);
        newOutput.push('');
        
        const unlockedCount = updatedNodes.filter(n => n.unlocked).length;
        if (unlockedCount === 5) {
          newOutput.push('ALL NODES UNLOCKED!');
          newOutput.push('Use "final" command to access the final terminal.');
        }
        
        setCurrentNode(null);
      } else {
        newOutput.push('ACCESS DENIED - Incorrect phrase');
      }
    } else {
      newOutput.push('Command not recognized. Type "help" for available commands.');
    }

    setTerminalOutput(newOutput.slice(-25));
  };

  const checkFinalSolution = () => {
    if (normalizeText(finalInput) === normalizeText(fullSolution)) {
      setShowSolution(true);
      const score = Math.max(100, level.maxScore - (hintsUsed * 30));
      setTimeout(() => onComplete(score), 1500);
    } else {
      setTerminalOutput(prev => [...prev, 'ACCESS DENIED — Fragment mismatch.', 'Try again with the complete phrase.']);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-12 relative overflow-hidden">
      <div className="container mx-auto px-6 py-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">CIPHERQUEST</h1>
            <div className="inline-flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm px-6 py-2 rounded-lg border border-green-500/30">
              <Shield className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold text-white">
                SILO SECURITY TERMINAL
              </h2>
            </div>
            <p className="text-gray-300 mt-2 text-sm">
              Uncover the truth hidden in the system logs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Terminal Output - Takes 2 columns */}
            <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur-sm border border-green-500/30 rounded-lg">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="font-mono text-green-400 text-xs">SILO_SECURITY_TERMINAL_v3.7.1</span>
                </div>
              </div>

              {/* Terminal Output Area */}
              <div className="p-4 font-mono text-green-400 text-sm h-64 overflow-y-auto bg-black/20">
                {terminalOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-1 break-all"
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-green-400 ml-1"
                />
              </div>

              {/* Command Input */}
              <div className="p-3 border-t border-gray-700 bg-gray-900/50">
                {!showFinalInput ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono text-sm"></span>
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
                      className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm"
                      placeholder="Enter command..."
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center text-yellow-400 font-bold font-mono text-sm">
                      === FINAL ACCESS TERMINAL ===
                    </div>
                    <textarea
                      value={finalInput}
                      onChange={(e) => setFinalInput(e.target.value)}
                      className="w-full h-20 bg-black/50 border border-green-400 rounded p-2 text-green-400 text-xs font-mono resize-none"
                      placeholder="Enter the complete decryption string..."
                    />
                    <button
                      onClick={checkFinalSolution}
                      className="w-full px-3 py-2 bg-green-600 text-black rounded hover:bg-green-500 transition-colors font-bold text-sm"
                    >
                      EXECUTE FINAL DECODE
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Node Status Panel */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <h3 className="text-green-400 font-mono text-sm">ACCESS NODES</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onHint}
                  className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors flex items-center space-x-1 text-xs"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>HINT</span>
                </motion.button>
              </div>

              <div className="space-y-2">
                {accessNodes.map((node) => (
                  <motion.div
                    key={node.id}
                    className={`p-2 rounded border transition-all ${
                      node.unlocked 
                        ? 'border-green-400 bg-green-900/20' 
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center space-x-2">
                      {node.unlocked ? (
                        <Unlock className="w-3 h-3 text-green-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-gray-500" />
                      )}
                      <span className={`text-xs font-mono ${
                        node.unlocked ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {node.name}
                      </span>
                    </div>
                    <div className={`text-xxs mt-1 ${
                      node.unlocked ? 'text-green-300' : 'text-gray-500'
                    }`}>
                      {node.unlocked ? 'UNLOCKED' : 'LOCKED'}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-600">
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu className="w-3 h-3 text-green-400" />
                  <div className="text-green-400 text-xs font-mono">PROGRESS</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                  <motion.div
                    className="h-full bg-green-400 rounded-full"
                    style={{ 
                      width: `${(accessNodes.filter(n => n.unlocked).length / 5) * 100}%` 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-xxs text-gray-400 font-mono">
                  {accessNodes.filter(n => n.unlocked).length}/5 nodes unlocked
                </div>
              </div>

              <div className="mt-3 text-xxs text-gray-500 font-mono space-y-0.5">
                <div className="text-gray-400 mb-1">COMMANDS:</div>
                <div>• access [1-5]</div>
                <div>• status</div>
                <div>• help</div>
                <div>• clear</div>
                <div>• exit</div>
              </div>
            </div>
          </div>

          {showSolution && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            >
              <div className="bg-gray-900 border-2 border-green-400 p-6 rounded-lg shadow-2xl text-center max-w-sm"
                   style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                </motion.div>
                <h3 className="text-xl font-bold text-green-400 mb-1">TRUTH REVEALED!</h3>
                <p className="text-gray-300 mb-3 text-sm">The silo's secrets have been exposed</p>
                <div className="text-green-400 text-xs font-mono">
                  "The truth will set you free..."
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};