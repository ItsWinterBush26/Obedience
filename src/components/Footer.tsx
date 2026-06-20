import { motion } from 'framer-motion';
import { Heart, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-white">Obedience</span>
          </div>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse inline" /> by Grade 10 - Obedience
          </p>
          <p className="text-white/30 text-xs">S.Y. 2026-2027 | All rights reserved</p>
        </motion.div>
      </div>
    </footer>
  );
}
