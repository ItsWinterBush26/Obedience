import { motion } from 'framer-motion';
import { Facebook, Mail, MapPin, ExternalLink } from 'lucide-react';

const socialLinks = [
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61590350530125&mibextid=ZbWKwL',
    icon: Facebook,
    handle: 'Grade 10 - Obedience',
    color: 'from-blue-600 to-blue-700',
  },
  {
    platform: 'Email',
    url: 'mailto:obedience.grade10@school.edu',
    icon: Mail,
    handle: 'obedience.grade10@school.edu',
    color: 'from-accent to-accent-dark',
  },
  {
    platform: 'Location',
    url: '#',
    icon: MapPin,
    handle: 'Room 6767',
    color: 'from-primary to-primary-dark',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-dark via-primary-dark to-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-light font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Connect With Us</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg">
            Follow our class page and stay updated with our latest activities, announcements, and memorable moments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target={link.platform === 'Facebook' ? '_blank' : undefined}
              rel={link.platform === 'Facebook' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                    <link.icon className="w-8 h-8 text-accent group-hover:text-accent-light transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{link.platform}</h3>
                  <p className="text-white/60 text-sm mb-3">{link.handle}</p>
                  {link.platform === 'Facebook' && (
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                      Visit Page <ExternalLink className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-16">
          <p className="text-white/40 text-sm">Grade 10 - Obedience | S.Y. 2026-2027</p>
        </motion.div>
      </div>
    </section>
  );
}
