import { useState, useRef, useEffect } from 'react';
import type { GalleryItem } from '@/types';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { galleryItems } from '@/data/gallery';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" ref={containerRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Memories</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-dark mt-3 mb-4">Class Gallery</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg">
            Cherished moments and memories from our journey together as Grade 10 - Obedience.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item: GalleryItem, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
              className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-lg aspect-square"
            >
              <img src={item.src} alt={item.title} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <motion.div initial={{ y: 20, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} className="transform">
                  <h4 className="text-white font-display text-xl font-bold">{item.title}</h4>
                  <p className="text-accent-light text-sm">{item.subtitle}</p>
                </motion.div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
              <X className="w-8 h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goToPrev(); }} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
              <ChevronRight className="w-8 h-8" />
            </button>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-[90vw] max-h-[85vh] aspect-[4/5] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                <img src={galleryItems[selectedImage].src} alt={galleryItems[selectedImage].title} className="w-full h-full object-cover object-center" />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-white font-display text-2xl font-bold">{galleryItems[selectedImage].title}</h3>
                <p className="text-white/60">{galleryItems[selectedImage].subtitle}</p>
              </div>
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
              {galleryItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImage ? 'border-accent scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
