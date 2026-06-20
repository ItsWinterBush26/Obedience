import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';
import { stats } from '@/data/stats';
import { BookOpen, Users, Heart } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Officers': <Users className="w-6 h-6" />,
  'Adviser': <BookOpen className="w-6 h-6" />,
  'Memories': <Heart className="w-6 h-6" />,
};

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const numericValue = stat.value === '∞' ? 100 : parseInt(stat.value);
  const { count, ref } = useCountUp(numericValue, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-light rounded-2xl p-6 text-center group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="text-primary mb-3 flex justify-center group-hover:scale-110 transition-transform">
        {iconMap[stat.label]}
      </div>
      <div className="font-display text-3xl font-bold text-primary mb-1">
        {stat.value === '∞' ? '∞' : count}
      </div>
      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
    </motion.div>
  );
}

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent font-semibold text-sm tracking-widest uppercase"
          >
            Who We Are
          </motion.span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-dark mt-3 mb-4">
            About Our Class
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            We are Grade 10 - Obedience, a vibrant community of learners committed to 
            academic excellence and character development throughout our high school journey.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              <img
                src="/mnt/agents/upload/1000143685.jpg"
                alt="Obedience Class Logo"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent" />
            </div>

            {/* Decorative Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-4 -left-4 w-full h-full border-2 border-accent rounded-3xl -z-10"
            />

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-accent text-white px-6 py-3 rounded-2xl shadow-lg"
            >
              <span className="font-display font-bold text-lg">OK</span>
              <span className="block text-xs opacity-80">Obedience</span>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-display text-3xl font-bold text-dark mb-6">
              Our Identity & Values
            </h3>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The olive branch in our logo symbolizes peace and growth, while the 
                circular form represents unity and wholeness. As the Obedience section, 
                we strive to embody discipline, respect, and cooperation in everything we do.
              </p>
              <p>
                Under the guidance of our dedicated class adviser, we work together to 
                achieve our goals and support one another through the challenges of senior 
                high school preparation.
              </p>
            </div>

            {/* Values List */}
            <div className="mt-8 space-y-4">
              {[
                { title: 'Discipline', desc: 'Following rules with dedication' },
                { title: 'Unity', desc: 'Working together as one class' },
                { title: 'Excellence', desc: 'Striving for the best in all we do' },
              ].map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-light transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="font-display font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark">{value.title}</h4>
                    <p className="text-sm text-gray-500">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
