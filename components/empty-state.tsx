"use client"

import { motion } from "framer-motion"

interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
      <div className="text-6xl mb-4">💪</div>
      <h3 className="text-2xl font-bold mb-2 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  )
}
