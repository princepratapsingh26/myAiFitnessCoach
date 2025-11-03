"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Lightbulb, Heart, Utensils, Zap, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Tips {
  motivationalQuote: string
  postureTip: string
  healthyFoodTip: string
  exerciseTip: string
  wellnessTip: string
}

export default function AITipsPage() {
  const [tips, setTips] = useState<Tips | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/daily-motivation")
        if (!response.ok) throw new Error("Failed to fetch tips")
        const data = await response.json()
        setTips(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching tips:", err)
        setError("Failed to load tips. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [])

  const tipCards = tips
    ? [
        {
          icon: Lightbulb,
          title: "Daily Motivation",
          content: tips.motivationalQuote,
          color: "from-yellow-500 to-yellow-600",
        },
        {
          icon: Heart,
          title: "Posture Tip",
          content: tips.postureTip,
          color: "from-red-500 to-red-600",
        },
        {
          icon: Utensils,
          title: "Healthy Food Tip",
          content: tips.healthyFoodTip,
          color: "from-green-500 to-green-600",
        },
        {
          icon: Zap,
          title: "Exercise Tip",
          content: tips.exerciseTip,
          color: "from-blue-500 to-blue-600",
        },
        {
          icon: Smile,
          title: "Wellness Tip",
          content: tips.wellnessTip,
          color: "from-purple-500 to-purple-600",
        },
      ]
    : []

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/home" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Daily AI Tips</h1>
          <p className="text-muted-foreground">
            Get personalized health, posture, nutrition, and exercise tips powered by AI
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
          >
            {error}
            <Button onClick={() => window.location.reload()} className="ml-4">
              Retry
            </Button>
          </motion.div>
        )}

        {tips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {tipCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow h-full`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                  <p className="text-sm leading-relaxed opacity-95">{card.content}</p>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-200"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Pro Tips for Success</h2>
          <ul className="space-y-3 text-blue-900">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Consistency is key - follow your routine even on rest days to maintain momentum</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Track your progress - keep a log of your workouts and nutrition to stay accountable</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Listen to your body - rest is just as important as training for muscle recovery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Stay hydrated - drink water throughout the day, especially during workouts</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </main>
  )
}
