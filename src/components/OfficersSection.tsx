import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { officers } from '@/data/officers';
import type { Officer } from '@/types';
import { Quote } from 'lucide-react';

function TiltCard({ officer, index }: { officer: Officer; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['-50%', '50%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['-50%', '50%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${officer.isAdviser ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : ''
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 blur-xl" />
        </motion.div>

        {/* Image Container */}
        <div
          className={`relative overflow-hidden ${
            officer.isAdviser ? 'h-80' : 'h-72'
          }`}
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary" />

          {/* Decorative circles */}
          <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full" />
          <div className="absolute bottom-8 left-8 w-32 h-32 border border-white/10 rounded-full" />

          <motion.img
            src={officer.image}
            alt={officer.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: 'translateZ(30px)',
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Role Badge */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            {officer.roleShort}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="font-display text-xl font-bold text-dark mb-1">
            {officer.name}
          </h3>
          <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-4">
            {officer.role}
          </p>

          {/* Motto */}
          <div className="relative bg-light rounded-xl p-4">
            <Quote className="absolute -top-3 -left-1 w-6 h-6 text-accent/40" />
            <p className="text-gray-600 text-sm italic leading-relaxed pl-2">
              {officer.motto}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function OfficersSection() {
  const adviser = officers.find((o) => o.isAdviser);
  const otherOfficers = officers.filter((o) => !o.isAdviser);

  return (
    <section id="officers" className="py-24 lg:py-32 bg-gradient-to-b from-light to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">
            Our Leaders
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-dark mt-3 mb-4">
            Class Officers
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg">
            Meet the dedicated leaders who serve our class with passion, 
            commitment, and the spirit of Obedience.
          </p>
        </motion.div>

        {/* Adviser - Featured */}
        {adviser && (
          <div className="max-w-md mx-auto mb-12">
            <TiltCard officer={adviser} index={0} />
          </div>
        )}

        {/* Officers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {otherOfficers.map((officer, index) => (
            <TiltCard key={officer.id} officer={officer} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
