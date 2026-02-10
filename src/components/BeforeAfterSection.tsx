"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

const beforeAfterSlides = [
  {
    id: "1",
    title: "Brick Pointing Restoration",
    category: "Masonry",
    before: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
    after: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
  },
  {
    id: "2",
    title: "Roof Replacement",
    category: "Roofing",
    before: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&q=80",
    after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
  },
  {
    id: "3",
    title: "Concrete Driveway",
    category: "Concrete",
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
    after: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80",
  },
  {
    id: "4",
    title: "Flat Roof Coating",
    category: "Roofing",
    before: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
    after: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=80",
  },
];

function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  title,
}: {
  beforeUrl: string;
  afterUrl: string;
  title: string;
}) {
  const [position, setPosition] = useState(50); // 0 = all before, 100 = all after
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(pct);
    },
    []
  );

  const onPointerDown = () => {
    isDragging.current = true;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onPointerLeave = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] max-h-[500px] rounded-2xl overflow-hidden bg-gray-200 select-none touch-none"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "none" }}
    >
      {/* After image (full, behind) */}
      <div className="absolute inset-0">
        <Image
          src={afterUrl}
          alt={`${title} - After`}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1000px"
        />
      </div>
      {/* Before image (clipped by position) */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeUrl}
          alt={`${title} - Before`}
          fill
          className="object-cover object-left-top"
          sizes="(max-width: 1200px) 100vw, 1000px"
        />
      </div>
      {/* Draggable divider */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 cursor-ew-resize flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onPointerDown={onPointerDown}
        role="slider"
        aria-label={`Before and after slider for ${title}. Drag to compare.`}
        aria-valuenow={position}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-200">
          <GripVertical className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      {/* Labels */}
      <div className="absolute left-4 top-4 z-30 flex gap-4 text-sm font-semibold">
        <span className="px-3 py-1.5 bg-black/60 text-white rounded-lg backdrop-blur-sm">
          Before
        </span>
        <span className="px-3 py-1.5 bg-white/90 text-gray-900 rounded-lg backdrop-blur-sm">
          After
        </span>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = beforeAfterSlides[slideIndex];

  return (
    <section id="before-after" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-gray-900">Before & After</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Drag the slider to compare our transformations. Real projects, real results.
          </p>
        </motion.div>

        <motion.div
          key={slideIndex}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <BeforeAfterSlider
            beforeUrl={slide.before}
            afterUrl={slide.after}
            title={slide.title}
          />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{slide.title}</h3>
              <span className="text-sm text-primary-600">{slide.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setSlideIndex((i) => (i - 1 + beforeAfterSlides.length) % beforeAfterSlides.length)
                }
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                aria-label="Previous before/after"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 min-w-[4rem] text-center">
                {slideIndex + 1} / {beforeAfterSlides.length}
              </span>
              <button
                type="button"
                onClick={() => setSlideIndex((i) => (i + 1) % beforeAfterSlides.length)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                aria-label="Next before/after"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2">
          {beforeAfterSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlideIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === slideIndex ? "w-8 bg-primary-600" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
