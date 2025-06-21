import React from 'react';
import { motion } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hints: string[];
  currentHint: number;
  onUseHint: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  hints,
  currentHint,
  onUseHint
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800">Hint Available</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          {currentHint < hints.length ? (
            <div>
              <p className="text-gray-600 mb-4">
                Would you like to use a hint? This will reduce your score by 20 points.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Hint {currentHint + 1}:</strong> {hints[currentHint]}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">
                No more hints available for this level.
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          {currentHint < hints.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onUseHint();
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Use Hint (-20 points)
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};