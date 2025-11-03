"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LandingPage() {
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  const wordVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-8">
            <Image
              src="/fitness-logo.png"
              alt="My Fitness Coach Logo"
              width={400}
              height={300}
              priority
              className="w-full max-w-sm h-auto"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/sign-in" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-12 text-base font-semibold bg-white text-blue-600 hover:bg-gray-100">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-12 text-base font-semibold bg-blue-500 hover:bg-blue-400">
              Sign Up
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
