'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <Link href="/">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
      >
        <span className="text-white font-bold text-lg leading-none">H</span>
      </motion.div>
    </Link>
  );
}