"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import FitnessForm from "@/components/fitness-form"
import PlanDisplay from "@/components/plan-display"
import RunningLoader from "@/components/running-loader"
import { ArrowLeft } from "lucide-react"

export default function WorkoutPlanPage() {
  const [userInput, setUserInput] = useState(null)
  const [planData, setPlanData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPlan, setShowPlan] = useState(false)

  const handleGeneratePlan = async (input: any) => {
    setUserInput(input)
    setLoading(true)
    setShowPlan(false)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      if (!response.ok) throw new Error("Failed to generate plan")
      const data = await response.json()
      setPlanData(data);
      setShowPlan(true)
      localStorage.setItem("lastWorkoutPlan", JSON.stringify({ input, plan: data }))
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClearPlan = () => {
    setPlanData(null)
    setUserInput(null)
    setShowPlan(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/home" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {loading ? (
          <RunningLoader />
        ) : !showPlan ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2 text-balance">Generate Your Workout Plan</h1>
            <p className="text-muted-foreground mb-8">
              Tell us about yourself and we'll create a personalized workout routine just for you.
            </p>
            <FitnessForm onSubmit={handleGeneratePlan} loading={loading} />
          </motion.div>
        ) : (
          <PlanDisplay
            plan={planData}
            userInput={userInput}
            onClear={handleClearPlan}
            loading={loading}
            planType="workout"
          />
        )}
      </div>
    </main>
  )
}
