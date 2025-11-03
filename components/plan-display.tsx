"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Loader2, Download, Copy, Check } from "lucide-react"
import VoicePlayer from "./voice-player"
import ExerciseCard from "./exercise-card"
import MealCard from "./meal-card"

interface PlanDisplayProps {
  plan: any
  userInput: any
  onRegenerate?: () => void
  onClear: () => void
  loading: boolean
  planType?: "workout" | "diet" | "tips"  
}


function parseExercises(text: string) {
  const exercises = []
  // Match lines with exercise names and details
  const exercisePattern = /(?:^|\n)(?:\d+\.\s*)?([^:\n]+?)(?:\s*[-–]\s*|:\s*)([^(\n]*?)(?:$$([^)]+)$$)?/gm
  let match

  // Parse exercise sections more intelligently
  const lines = text.split("\n").filter((l) => l.trim())
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("**") && trimmed.length > 5) {
      // Extract exercise name
      const nameMatch = trimmed.match(/^(?:\d+\.\s*)?([^-–:\d\n]+?)(?:\s*[-–:]|$)/)
      if (nameMatch) {
        const name = nameMatch[1].trim()
        if (name.length > 2 && !name.toLowerCase().includes("day") && !name.toLowerCase().includes("week")) {
          exercises.push({
            name,
            description:
              trimmed
                .substring(name.length)
                .replace(/^[-–:\s]+/, "")
                .trim() || "Exercise",
          })
        }
      }
    }
  }

  return exercises.slice(0, 6) // Limit to 6 exercises
}

function parseMeals(text: string) {
  const meals = []
  const lines = text.split("\n").filter((l) => l.trim())

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("**") && trimmed.length > 5) {
      // Look for meal-related keywords
      if (/(breakfast|lunch|dinner|snack|meal|food|dish)/i.test(trimmed)) {
        const nameMatch = trimmed.match(/^(?:\d+\.\s*)?([^-–:\n]+?)(?:\s*[-–:]|$)/)
        if (nameMatch) {
          const name = nameMatch[1].trim()
          if (name.length > 2) {
            meals.push({
              name,
              description:
                trimmed
                  .substring(name.length)
                  .replace(/^[-–:\s]+/, "")
                  .trim() || "Meal",
            })
          }
        }
      }
    }
  }

  return meals.slice(0, 4) // Limit to 4 meals
}

export default function PlanDisplay({
  plan,
  userInput,
  onRegenerate,
  onClear,
  loading,
  planType = "workout",
}: PlanDisplayProps) {
 const normalizedPlan = {
  workoutPlan: plan?.workoutPlan || "",
  dietPlan: plan?.dietPlan || "",
  tips: Array.isArray(plan?.tips) ? plan.tips.join("\n• ") : plan?.tips || "",
};


  console.log("🧩 Incoming Plan:", plan);


  const [activeTab, setActiveTab] = useState<"workout" | "diet" | "tips">("workout")
  const [copySuccess, setCopySuccess] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "text">("pdf")

  const parsedExercises = useMemo(() => parseExercises(normalizedPlan.workoutPlan), [normalizedPlan.workoutPlan])
  const parsedMeals = useMemo(() => parseMeals(normalizedPlan.dietPlan), [normalizedPlan.dietPlan])

  const handleCopyToClipboard = async () => {
    const text = activeTab === "workout" ? normalizedPlan.workoutPlan : activeTab === "diet" ? normalizedPlan.dietPlan : normalizedPlan.tips

    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }


  const handleExportPDF = () => {
    const element = document.getElementById("plan-content")
    if (element) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Fitness Plan - ${userInput.name}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background: white;
                  padding: 40px;
                }
                .header {
                  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                  color: white;
                  padding: 30px;
                  border-radius: 10px;
                  margin-bottom: 30px;
                  page-break-after: avoid;
                }
                .header h1 { font-size: 28px; margin-bottom: 10px; }
                .user-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 10px;
                  font-size: 14px;
                  opacity: 0.9;
                }
                .section {
                  margin-bottom: 30px;
                  page-break-inside: avoid;
                }
                .section h2 {
                  color: #3B82F6;
                  font-size: 22px;
                  margin-bottom: 15px;
                  border-bottom: 2px solid #3B82F6;
                  padding-bottom: 10px;
                }
                .section p {
                  white-space: pre-wrap;
                  word-wrap: break-word;
                  font-size: 13px;
                  color: #555;
                }
                .footer {
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 2px solid #e0e0e0;
                  font-size: 12px;
                  color: #999;
                  text-align: center;
                }
                @page { margin: 20px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Personalized Fitness Plan</h1>
                <div class="user-info">
                  <div><strong>Name:</strong> ${userInput.name}</div>
                  <div><strong>Goal:</strong> ${userInput.fitnessGoal}</div>
                  <div><strong>Age:</strong> ${userInput.age}</div>
                  <div><strong>Level:</strong> ${userInput.fitnessLevel}</div>
                  <div><strong>Height:</strong> ${userInput.height}cm</div>
                  <div><strong>Weight:</strong> ${userInput.weight}kg</div>
                  <div><strong>Location:</strong> ${userInput.workoutLocation}</div>
                  <div><strong>Diet:</strong> ${userInput.dietaryPreference}</div>
                </div>
              </div>

              <div class="section">
                <h2>Workout Plan</h2>
                <p>${plan.workoutPlan || "Loading..."}</p>
              </div>

              <div class="section">
                <h2>Diet Plan</h2>
                <p>${plan.dietPlan || "Loading..."}</p>
              </div>

              <div class="section">
                <h2>Tips & Lifestyle Advice</h2>
                <p>${plan.tips || "Loading..."}</p>
              </div>

              <div class="footer">
                <p>Generated by AI Fitness Coach | ${new Date().toLocaleDateString()}</p>
                <p>Follow your plan consistently for best results!</p>
              </div>
            </body>
          </html>
        `
        printWindow.document.write(html)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const handleExportText = () => {
    const fullText = `AI FITNESS COACH - PERSONALIZED PLAN
Generated: ${new Date().toLocaleDateString()}

USER INFORMATION
================
Name: ${userInput.name}
Age: ${userInput.age}
Goal: ${userInput.fitnessGoal}
Fitness Level: ${userInput.fitnessLevel}
Height: ${userInput.height}cm
Weight: ${userInput.weight}kg
Workout Location: ${userInput.workoutLocation}
Dietary Preference: ${userInput.dietaryPreference}

WORKOUT PLAN
============
${plan.workoutPlan}

DIET PLAN
=========
${plan.dietPlan}

TIPS & LIFESTYLE ADVICE
=======================
${plan.tips}

---
Follow your plan consistently and track your progress!
`
    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `fitness-plan-${userInput.name}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* User Info Header */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome, {userInput?.name}!</h2>
        <p className="opacity-90">
          Your personalized {userInput?.fitnessGoal} plan is ready. Stay consistent and you will see results!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["workout", "diet", "tips"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab === "workout" ? "🏋️ Workout" : tab === "diet" ? "🥗 Diet" : "💡 Tips"}
          </button>
        ))}
      </div>

      {/* Content Display */}
      <div id="plan-content" className="bg-card rounded-2xl shadow-lg p-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
            <p className="text-lg">Generating your personalized plan...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === "workout" && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Your Personalized Workout Plan</h3>
                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Designed for: {userInput?.fitnessLevel} | Location: {userInput?.workoutLocation}
                  </p>
                  <p className="whitespace-pre-wrap leading-relaxed text-card-foreground text-sm">
                    {plan?.workoutPlan}
                  </p>
                </div>

                {parsedExercises.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-card-foreground">Exercise Details</h4>
                    <div className="space-y-3">
                      {parsedExercises.map((exercise, index) => (
                        <ExerciseCard key={index} name={exercise.name} description={exercise.description} />
                      ))}
                    </div>
                  </div>
                )}

                <VoicePlayer text={plan?.workoutPlan} sectionId="workout" />
              </div>
            )}

            {activeTab === "diet" && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Your Personalized Diet Plan</h3>
                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Preference: {userInput?.dietaryPreference} | Goal: {userInput?.fitnessGoal}
                  </p>
                  <p className="whitespace-pre-wrap leading-relaxed text-card-foreground text-sm">{plan?.dietPlan}</p>
                </div>

                {parsedMeals.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-card-foreground">Meal Suggestions</h4>
                    <div className="space-y-3">
                      {parsedMeals.map((meal, index) => (
                        <MealCard key={index} name={meal.name} description={meal.description} />
                      ))}
                    </div>
                  </div>
                )}

                <VoicePlayer text={plan?.dietPlan} sectionId="diet" />
              </div>
            )}

            {activeTab === "tips" && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Tips, Posture & Motivation</h3>
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <p className="whitespace-pre-wrap leading-relaxed text-card-foreground text-sm">{plan?.tips}</p>
                </div>
                <VoicePlayer text={plan?.tips} sectionId="tips" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          onClick={handleExportPDF}
          variant="outline"
          className="h-12 flex items-center justify-center gap-2 bg-transparent"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF</span>
        </Button>
        <Button
          onClick={handleExportText}
          variant="outline"
          className="h-12 flex items-center justify-center gap-2 bg-transparent"
        >
          <Download className="w-4 h-4" />
          <span>Export Text</span>
        </Button>
        <Button
          onClick={handleCopyToClipboard}
          variant="outline"
          className="h-12 flex items-center justify-center gap-2 bg-transparent"
        >
          {copySuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Section</span>
            </>
          )}
        </Button>
        <Button onClick={onRegenerate} disabled={loading} className="h-12">
          🔄 Regenerate
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-4">
        <Button onClick={onClear} variant="outline" className="flex-1 h-10 bg-transparent">
          ✕ Clear Plan
        </Button>
      </div>
    </motion.div>
  )
}
