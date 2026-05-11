'use client';

import { motion } from 'framer-motion';
import { content } from '@/lib/i18n';

export function Footer() {
  const c = content['EN' as keyof typeof content];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-xl font-bold mb-4">HEYDE</h3>
            <p className="text-white/60">AI-Powered Creative Studio</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href={`mailto:${c.contact.email}`} className="hover:text-white transition">{c.contact.email}</a></li>
              <li><a href={`https://wa.me/${c.contact.phone.replace(/\D/g, '')}`} className="hover:text-white transition">{c.contact.phone}</a></li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">Behance</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-white/10 pt-8 text-center text-white/40 text-sm"
        >
          {c.footer.copyright}
        </motion.div>
      </div>
    </footer>
  );
}