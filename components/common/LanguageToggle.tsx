'use client';

import { motion } from 'framer-motion';

export function LanguageToggle() {
  // Language toggle removed - currently using hardcoded EN language
  // Can be re-enabled with language context/state management

  return (
    <motion.button
      className="px-3 py-2 rounded-full text-sm font-medium bg-black/10 hover:bg-black/20 transition-colors cursor-default"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled
    >
      EN
    </motion.button>
  );
}