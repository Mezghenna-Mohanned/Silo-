import { Level, CipherChallenge } from '../types/game';
import { caesarEncode, atbashEncode, base64Encode, hexEncode, xorEncode, vigenereEncode } from './ciphers';

export const levels: Level[] = [
  {
    id: 1,
    title: "Simple Cryptology",
    theme: "academic",
    cipher: "Caesar Cipher",
    description: "Welcome to the world of cryptography. Decode this simple message using a Caesar cipher.",
    solution: "HELLO WORLD",
    hints: [
      "Try shifting each letter by a fixed number of positions in the alphabet",
      "The shift value is between 1 and 25",
      "The shift value is 13 (ROT13)"
    ],
    maxScore: 100
  },
  {
    id: 2,
    title: "Arcane & Jinx",
    theme: "cyberpunk",
    cipher: "Atbash Cipher",
    description: "In the depths of Zaun, decode this alchemical formula using HexTech power.",
    solution: "HEXTECH CRYSTAL",
    hints: [
      "This cipher reverses the alphabet: A becomes Z, B becomes Y, etc.",
      "Each letter maps to its opposite position in the alphabet",
      "A=Z, B=Y, C=X, and so on..."
    ],
    maxScore: 150
  },
  {
    id: 3,
    title: "Silo Security Terminal",
    theme: "terminal",
    cipher: "Multi-part Puzzle",
    description: "Uncover the truth hidden in the silo's security system. Access all nodes to reveal the complete message.",
    solution: "If you've gotten this far, you already know. The game is rigged. We think we're the chosen ones but we're only one of many. The founders didn't build a single silo. They built fifty. And they created the safeguard. We have been lied to.",
    hints: [
      "Use 'access [1-5]' to enter each security node",
      "Type 'help' when inside a node to get specific guidance",
      "Each node requires a specific phrase to unlock"
    ],
    maxScore: 200
  },
  {
    id: 4,
    title: "Egyptian Tomb of Codes",
    theme: "egyptian",
    cipher: "Hieroglyphic Substitution",
    description: "Ancient secrets await. Match the hieroglyphs to reveal the pharaoh's message.",
    solution: "ANCIENT WISDOM",
    hints: [
      "Each hieroglyph represents a letter of the alphabet",
      "Look for patterns in the symbols",
      "The eye symbol represents 'A', the bird represents 'N'"
    ],
    maxScore: 250
  },
  {
    id: 5,
    title: "Cyber Tokyo Street",
    theme: "tokyo",
    cipher: "XOR Cipher",
    description: "Neon lights flicker with hidden messages. Decode using logical operations.",
    solution: "NEON DREAMS",
    hints: [
      "XOR cipher uses exclusive OR operations",
      "You need a key to XOR with each character",
      "The key is 'TOKYO'"
    ],
    maxScore: 300
  },
  {
    id: 6,
    title: "Medieval Wizard Lab",
    theme: "medieval",
    cipher: "Vigenère Cipher",
    description: "Ancient magic requires the right incantation. Use the keyword to unlock the spell.",
    solution: "MAGIC SPELL",
    hints: [
      "This is a Vigenère cipher - it uses a keyword",
      "The keyword repeats to match the message length",
      "The keyword is 'MERLIN'"
    ],
    maxScore: 350
  },
  {
    id: 7,
    title: "Noir Detective Case",
    theme: "noir",
    cipher: "Book Cipher",
    description: "The evidence is in the details. Use the newspaper clues to crack the case.",
    solution: "CASE CLOSED",
    hints: [
      "Look for numbers that might reference page, line, and word",
      "The newspaper contains the key to decoding",
      "Format: page-line-word references"
    ],
    maxScore: 400
  },
  {
    id: 8,
    title: "Alien Language Interface",
    theme: "alien",
    cipher: "Alien Substitution",
    description: "First contact protocol initiated. Decode their message to establish communication.",
    solution: "GREETINGS HUMAN",
    hints: [
      "Each alien symbol represents a letter",
      "Look for repeated patterns",
      "The spiral symbol means 'G', the triangle means 'R'"
    ],
    maxScore: 450
  },
  {
    id: 9,
    title: "Time Traveler's Dashboard",
    theme: "steampunk",
    cipher: "Time-based Caesar",
    description: "Set the temporal coordinates correctly to decode the chronometer's message.",
    solution: "TIME PARADOX",
    hints: [
      "The shift value changes based on time",
      "Use the year 1885 as your key",
      "Apply the last two digits as the Caesar shift"
    ],
    maxScore: 500
  },
  {
    id: 10,
    title: "The Final Firewall",
    theme: "firewall",
    cipher: "Multi-layer",
    description: "The ultimate challenge. Break through multiple encryption layers to escape.",
    solution: "FREEDOM ACHIEVED",
    hints: [
      "This message has multiple layers of encryption",
      "First decode the Base64, then apply Caesar shift",
      "Finally, reverse the Atbash cipher"
    ],
    maxScore: 1000
  }
];

export const generateChallenge = (level: Level): CipherChallenge => {
  switch (level.id) {
    case 1:
      return {
        encoded: caesarEncode(level.solution, 13),
        solution: level.solution,
        key: 13
      };
    case 2:
      return {
        encoded: atbashEncode(level.solution),
        solution: level.solution
      };
    case 3:
      return {
        encoded: "MULTI_PART_PUZZLE",
        solution: level.solution
      };
    case 4:
      return {
        encoded: "𓂀𓈖𓎡𓇋𓇋𓈖𓏏 𓅱𓇋𓋴𓂧𓅱𓅓",
        solution: level.solution,
        additionalData: {
          hieroglyphMap: {
            '𓂀': 'A', '𓈖': 'N', '𓎡': 'C', '𓇋': 'I', '𓇋': 'E', '𓈖': 'N', '𓏏': 'T',
            '𓅱': 'W', '𓇋': 'I', '𓋴': 'S', '𓂧': 'D', '𓅱': 'O', '𓅓': 'M'
          }
        }
      };
    case 5:
      return {
        encoded: Array.from(xorEncode(level.solution, 'TOKYO')).map(c => c.charCodeAt(0).toString(16)).join(' '),
        solution: level.solution,
        key: 'TOKYO'
      };
    case 6:
      return {
        encoded: vigenereEncode(level.solution, 'MERLIN'),
        solution: level.solution,
        key: 'MERLIN'
      };
    case 7:
      return {
        encoded: "1-3-4 2-1-7",
        solution: level.solution,
        additionalData: {
          newspaper: [
            "DAILY NEWS - Page 1: The detective found the CASE in the old warehouse.",
            "SPORTS - Page 2: The game was CLOSED due to rain yesterday evening."
          ]
        }
      };
    case 8:
      return {
        encoded: "◊∆∑∑†∞≈⊕∫ ∏∪∅∆≈",
        solution: level.solution,
        additionalData: {
          alienMap: {
            '◊': 'G', '∆': 'R', '∑': 'E', '†': 'T', '∞': 'I', '≈': 'N', '⊕': 'G', '∫': 'S',
            '∏': 'H', '∪': 'U', '∅': 'M', '∆': 'A'
          }
        }
      };
    case 9:
      return {
        encoded: caesarEncode(level.solution, 85 % 26),
        solution: level.solution,
        key: 1885
      };
    case 10:
      const step1 = atbashEncode(level.solution);
      const step2 = caesarEncode(step1, 7);
      const step3 = base64Encode(step2);
      return {
        encoded: step3,
        solution: level.solution,
        additionalData: {
          layers: ['Base64', 'Caesar (7)', 'Atbash']
        }
      };
    default:
      return {
        encoded: level.solution,
        solution: level.solution
      };
  }
};