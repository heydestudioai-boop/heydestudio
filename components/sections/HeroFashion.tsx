'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function HeroFashion() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center min-h-screen"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Text */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Overline */}
            <motion.div
              variants={itemVariants}
              className="inline-block"
            >
              <p className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                AI Visual Systems
              </p>
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="block">Visual</span>
                <span className="block">Systems</span>
                <span className="block text-gray-400">for Brands</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                We do not generate images.
                <br />
                We build the systems that make them work.
              </p>
            </motion.div>

            {/* Capabilities List */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 pt-4"
            >
              <p className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                Core Capabilities
              </p>
              <ul className="space-y-3">
                {[
                  'Digital Identity Systems',
                  'AI Campaign Architecture',
                  'Visual Direction & Art',
                  'Motion & Multiformat',
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Download Proposal
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-12 pt-8 border-t border-gray-200"
            >
              {[
                { number: '50+', label: 'Projects' },
                { number: '30+', label: 'Clients' },
                { number: '12+', label: 'Years' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-full min-h-screen"
          >
            <div className="sticky top-0 h-screen flex items-center">
              <motion.div
                className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/s3-solea.jpg"
                  alt="HEYDE Studio Visual Systems"
                  fill
                  className="object-cover"
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
                  quality={85}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={imageLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-lg shadow-xl"
              >
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Current Project
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Soleá</h3>
                <p className="text-sm text-gray-600">
                  AI Campaign System — Mediterranean Light
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
