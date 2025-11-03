"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ImageModal from "./image-modal"

interface MealCardProps {
  name: string
  description: string
  calories?: string
  protein?: string
}

export default function MealCard({ name, description, calories, protein }: MealCardProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const generateImage = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName: name, type: "meal" }),
      })
      const data = await response.json()
      setImageUrl(data.imageUrl)
      setShowModal(true)
    } catch (error) {
      console.error("Failed to generate image:", error)
      alert("Failed to generate image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-card rounded-xl shadow-md p-4 mb-4 border border-border transition-all"
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2 text-card-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="text-sm text-card-foreground mb-3">
              {calories && (
                <p>
                  Calories: <strong>{calories}</strong>
                </p>
              )}
              {protein && (
                <p>
                  Protein: <strong>{protein}</strong>
                </p>
              )}
            </div>
            <button
              onClick={generateImage}
              disabled={loading}
              className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Generating..." : "📸 Show Meal"}
            </button>
          </div>
        </div>
      </motion.div>

      <ImageModal isOpen={showModal} onClose={() => setShowModal(false)} imageUrl={imageUrl} title={name} type="meal" />
    </>
  )
}
