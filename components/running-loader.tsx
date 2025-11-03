"use client"

import { motion } from "framer-motion"

export default function RunningLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Running Person Animation */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Runner Figure */}
          <g>
            {/* Head */}
            <motion.circle
              cx="50"
              cy="20"
              r="6"
              fill="#3B82F6"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Body */}
            <motion.line
              x1="50"
              y1="26"
              x2="50"
              y2="45"
              stroke="#3B82F6"
              strokeWidth="2"
              animate={{
                y: [0, -1, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Left Arm */}
            <motion.line
              x1="50"
              y1="30"
              x2="35"
              y2="20"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                x1: [50, 48],
                y1: [30, 30],
                x2: [35, 32],
                y2: [20, 15],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Right Arm */}
            <motion.line
              x1="50"
              y1="30"
              x2="65"
              y2="40"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                x1: [50, 52],
                y1: [30, 30],
                x2: [65, 68],
                y2: [40, 50],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Left Leg */}
            <motion.line
              x1="50"
              y1="45"
              x2="40"
              y2="65"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                x1: [50, 48],
                x2: [40, 35],
                y2: [65, 70],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Right Leg */}
            <motion.line
              x1="50"
              y1="45"
              x2="60"
              y2="65"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                x1: [50, 52],
                x2: [60, 65],
                y2: [65, 70],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </g>
        </svg>
      </div>

      {/* Loading Text with Animation */}
      <div className="text-center">
        <motion.h3
          className="text-2xl font-bold text-primary mb-2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Generating Your Plan
        </motion.h3>

        <motion.p
          className="text-muted-foreground"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          Our AI coach is working on your personalized routine...
        </motion.p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-1 mt-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
