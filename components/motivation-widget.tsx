"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function MotivationWidget() {
  const [motivation, setMotivation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const lastMotivation = localStorage.getItem("todayMotivation")
    const lastDate = localStorage.getItem("motivationDate")
    const today = new Date().toDateString()

    if (lastMotivation && lastDate === today) {
      setMotivation(lastMotivation)
    } else {
      fetchMotivation()
    }
  }, [])

  const fetchMotivation = async () => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch("/api/daily-motivation")
      if (!response.ok) throw new Error("Failed to fetch")

      const data = await response.json()
      setMotivation(data.motivation)
      localStorage.setItem("todayMotivation", data.motivation)
      localStorage.setItem("motivationDate", new Date().toDateString())
    } catch (error) {
      console.error("Failed to fetch motivation:", error)
      setError(true)
      setMotivation("Every rep you do is a step towards your goal. Stay focused, stay strong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary via-primary to-accent rounded-2xl shadow-lg p-6 mb-8 text-primary-foreground overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-4xl flex-shrink-0"
        >
          💪
        </motion.div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">Today's Motivation</h3>
          <p className="leading-relaxed text-base mb-3 min-h-12">{motivation || "Loading your daily motivation..."}</p>
          <button
            onClick={fetchMotivation}
            disabled={loading}
            className="text-sm opacity-75 hover:opacity-100 transition-opacity underline flex items-center gap-2"
          >
            {loading && <Loader2 className="w-3 h-3 animate-spin" />}
            {loading ? "Loading..." : "Get New Motivation"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
