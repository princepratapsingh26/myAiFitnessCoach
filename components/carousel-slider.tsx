"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CarouselSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const slides = [
    {
      image: "/fit-muscular-man-in-gym-doing-barbell-squat-workou.jpg",
      title: "Strength Training",
      subtitle: "Build muscle and get stronger every day",
    },
    {
      image: "/fit-woman-athlete-doing-yoga-stretching-exercise-f.jpg",
      title: "Flexibility & Mobility",
      subtitle: "Improve your range of motion and prevent injuries",
    },
    {
      image: "/people-doing-cardio-running-on-treadmill-in-gym-fi.jpg",
      title: "Cardio & Endurance",
      subtitle: "Build stamina and boost your cardiovascular health",
    },
    {
      image: "/healthy-food-diet-nutrition-vegetables-fruits-prot.jpg",
      title: "Nutrition & Diet",
      subtitle: "Fuel your body with the right nutrients",
    },
  ]

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoplay, slides.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
  }

  return (
    <div
      className="relative w-full h-96 md:h-96 rounded-2xl overflow-hidden shadow-lg"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image || "/placeholder.svg"}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-2 text-balance"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/90"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-8" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
