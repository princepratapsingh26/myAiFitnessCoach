"use client"
import { motion, AnimatePresence } from "framer-motion"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  title: string
  type: "exercise" | "meal"
}

export default function ImageModal({ isOpen, onClose, imageUrl, title, type }: ImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-card rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
              <div className="bg-primary text-primary-foreground p-4">
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              <div className="p-6">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-muted-foreground mb-4">
                  {type === "exercise"
                    ? "Follow proper form and technique. If you experience pain, stop immediately."
                    : "Nutrition facts and preparation instructions may vary based on ingredients used."}
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
