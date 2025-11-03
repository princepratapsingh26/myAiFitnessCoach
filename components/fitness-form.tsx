"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface FitnessFormProps {
  onSubmit: (data: any) => void
  loading: boolean
}

export default function FitnessForm({ onSubmit, loading }: FitnessFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    fitnessGoal: "Weight Loss",
    fitnessLevel: "Beginner",
    workoutLocation: "Home",
    dietaryPreference: "Non-Veg",
    stressLevel: "",
    medicalHistory: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.age || Number.parseInt(formData.age) < 13 || Number.parseInt(formData.age) > 120) {
      newErrors.age = "Please enter a valid age"
    }
    if (!formData.height || Number.parseInt(formData.height) < 100 || Number.parseInt(formData.height) > 250) {
      newErrors.height = "Please enter height between 100-250cm"
    }
    if (!formData.weight || Number.parseInt(formData.weight) < 30 || Number.parseInt(formData.weight) > 500) {
      newErrors.weight = "Please enter weight between 30-150kg"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      ...formData,
      age: Number.parseInt(formData.age),
      height: Number.parseInt(formData.height),
      weight: Number.parseInt(formData.weight),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-card-foreground">Tell Us About Yourself</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-destructive" : ""}
              required
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Age * 
            </label>
            <Input
              id="age"
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? "border-destructive" : ""}
              required
            />
            {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
          </motion.div>
        </div>

        {/* Gender & Physical Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-ring"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </motion.div>
          <div></div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <label htmlFor="height" className="block text-sm font-medium mb-2">
              Height (cm) * 
            </label>
            <Input
              id="height"
              type="number"
              name="height"
              placeholder="e.g., 170"
              value={formData.height}
              onChange={handleChange}
              className={errors.height ? "border-destructive" : ""}
              required
            />
            {errors.height && <p className="text-xs text-destructive mt-1">{errors.height}</p>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label htmlFor="weight" className="block text-sm font-medium mb-2">
              Weight (kg) * 
            </label>
            <Input
              id="weight"
              type="number"
              name="weight"
              placeholder="e.g., 75"
              value={formData.weight}
              onChange={handleChange}
              className={errors.weight ? "border-destructive" : ""}
              required
            />
            {errors.weight && <p className="text-xs text-destructive mt-1">{errors.weight}</p>}
          </motion.div>
        </div>

        {/* Fitness Goals & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <label htmlFor="fitnessGoal" className="block text-sm font-medium mb-2">
              Fitness Goal
            </label>
            <select
              id="fitnessGoal"
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-ring"
            >
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Endurance</option>
              <option>General Fitness</option>
            </select>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label htmlFor="fitnessLevel" className="block text-sm font-medium mb-2">
              Fitness Level
            </label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-ring"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </motion.div>
        </div>

        {/* Location & Diet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
            <label htmlFor="workoutLocation" className="block text-sm font-medium mb-2">
              Workout Location
            </label>
            <select
              id="workoutLocation"
              name="workoutLocation"
              value={formData.workoutLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-ring"
            >
              <option>Home</option>
              <option>Gym</option>
              <option>Outdoor</option>
            </select>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <label htmlFor="dietaryPreference" className="block text-sm font-medium mb-2">
              Dietary Preference
            </label>
            <select
              id="dietaryPreference"
              name="dietaryPreference"
              value={formData.dietaryPreference}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-ring"
            >
              <option>Veg</option>
              <option>Non-Veg</option>
              <option>Vegan</option>
              <option>Keto</option>
            </select>
          </motion.div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
            <label htmlFor="stressLevel" className="block text-sm font-medium mb-2">
              Stress Level (Optional)
            </label>
            <select
              id="stressLevel"
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-ring"
            >
              <option value="">Select...</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <label htmlFor="medicalHistory" className="block text-sm font-medium mb-2">
              Medical History (Optional)
            </label>
            <Input
              id="medicalHistory"
              type="text"
              name="medicalHistory"
              placeholder="e.g., None or specify conditions"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-semibold">
            {loading ? "Generating Your Plan..." : "Generate My Plan"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
