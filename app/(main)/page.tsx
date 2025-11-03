"use client"

import { useState, useEffect } from "react"
import FitnessForm from "@/components/fitness-form"
import PlanDisplay from "@/components/plan-display"
import MotivationWidget from "@/components/motivation-widget"
import FeatureHighlight from "@/components/feature-highlight"
import { motion } from "framer-motion"

interface UserInput {
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  height: number
  weight: number
  fitnessGoal: string
  fitnessLevel: string
  workoutLocation: string
  dietaryPreference: string
  stressLevel?: string
  medicalHistory?: string
}

interface PlanData {
  workoutPlan: string
  dietPlan: string
  tips: string
}

export default function Home() {
  const [userInput, setUserInput] = useState<UserInput | null>(null)
  const [planData, setPlanData] = useState<PlanData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false)

  useEffect(() => {
    const savedPlan = localStorage.getItem("lastPlan")
    if (savedPlan) {
      try {
        const { input, plan } = JSON.parse(savedPlan)
        setUserInput(input)
        setPlanData(plan)
        setShowPlan(true)
      } catch (error) {
        console.error("Failed to load saved plan:", error)
      }
    }
    setHasLoadedFromStorage(true)
  }, [])

  const handleGeneratePlan = async (input: UserInput) => {
    setUserInput(input)
    setLoading(true)
    setShowPlan(false)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        throw new Error("Failed to generate plan")
      }

      const data = await response.json()
      setPlanData(data)
      setShowPlan(true)

      localStorage.setItem("lastPlan", JSON.stringify({ input, plan: data }))
    } catch (error) {
      console.error("Error generating plan:", error)
      alert("Failed to generate plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegeneratePlan = () => {
    if (userInput) {
      handleGeneratePlan(userInput)
    }
  }

  const handleClearPlan = () => {
    setPlanData(null)
    setUserInput(null)
    setShowPlan(false)
    localStorage.removeItem("lastPlan")
  }

  if (!hasLoadedFromStorage) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading your fitness coach...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:text-left"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-4xl"
            >
              💪
            </motion.div>
            <h1 className="text-5xl font-bold text-primary">AI Fitness Coach</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Your personalized fitness companion powered by artificial intelligence. Get customized workout and diet
            plans tailored to your goals.
          </p>
        </motion.div>

        {/* Motivation Widget */}
        <MotivationWidget />

        {/* Main Content with smooth transitions */}
        <motion.div
          key={showPlan ? "plan" : "form"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {!showPlan ? (
            <>
              <FitnessForm onSubmit={handleGeneratePlan} loading={loading} />
              <FeatureHighlight />
            </>
          ) : (
            <PlanDisplay
              plan={planData}
              userInput={userInput}
              onRegenerate={handleRegeneratePlan}
              onClear={handleClearPlan}
              loading={loading}
            />
          )}
        </motion.div>
      </div>
    </main>
  )
}
