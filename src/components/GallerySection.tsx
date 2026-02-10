"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Roofing", "Masonry", "Concrete", "Waterproofing", "Stucco"];

const galleryProjects = [
  {
    id: "1",
    title: "Shingle Roof Installation",
    category: "Roofing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "Full roof replacement with architectural shingles.",
    location: "Queens",
    duration: "3 days",
  },
  {
    id: "2",
    title: "Brick Pointing",
    category: "Masonry",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    description: "Historic brownstone repointing and restoration.",
    location: "Brooklyn",
    duration: "1 week",
  },
  {
    id: "3",
    title: "Flat Roof Coating",
    category: "Roofing",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    description: "EPDM flat roof repair and coating.",
    location: "Queens",
    duration: "2 days",
  },
  {
    id: "4",
    title: "Concrete Driveway",
    category: "Concrete",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    description: "New concrete driveway with broom finish.",
    location: "Long Island",
    duration: "4 days",
  },
  {
    id: "5",
    title: "Basement Waterproofing",
    category: "Waterproofing",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    description: "Interior drainage and waterproofing system.",
    location: "Queens",
    duration: "1 week",
  },
  {
    id: "6",
    title: "Stucco Application",
    category: "Stucco",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
    description: "Exterior stucco finish and repair.",
    location: "Brooklyn",
    duration: "5 days",
  },
];

export function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<typeof galleryProjects[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered =
    filter === "All"
      ? galleryProjects
      : galleryProjects.filter((i) => i.category === filter);

  const openLightbox = (item: typeof galleryProjects[0], index: number) => {
    setLightbox(item);
    setLightboxIndex(index);
  };

  const currentIndex = lightbox
    ? galleryProjects.findIndex((i) => i.id === lightbox.id)
    : 0;

  const goPrev = () => {
    const idx = currentIndex <= 0 ? galleryProjects.length - 1 : currentIndex - 1;
    setLightbox(galleryProjects[idx]);
  };

  const goNext = () => {
    const idx = currentIndex >= galleryProjects.length - 1 ? 0 : currentIndex + 1;
    setLightbox(galleryProjects[idx]);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-h2 text-gray-900">Project Gallery</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Shingle roof installation, masonry, concrete, waterproofing, and more.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === cat
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openLightbox(item, galleryProjects.indexOf(item))}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-xs font-medium px-2 py-1 bg-primary-600 rounded">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Project gallery lightbox"
          >
            <div
              className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-video">
                <Image
                  src={lightbox.image}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold">{lightbox.title}</h3>
                <p className="mt-2 text-gray-300">{lightbox.description}</p>
                <p className="mt-2 text-sm text-gray-400">
                  {lightbox.location} · {lightbox.duration}
                </p>
              </div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
