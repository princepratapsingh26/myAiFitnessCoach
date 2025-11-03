"use client"

import { motion } from "framer-motion"

const features = [
  {
    icon: "🤖",
    title: "AI Powered",
    description: "Advanced AI models create personalized plans",
  },
  {
    icon: "🎯",
    title: "Tailored Plans",
    description: "Customized for your goals and fitness level",
  },
  {
    icon: "🔊",
    title: "Voice Guidance",
    description: "Listen to plans with text-to-speech",
  },
  {
    icon: "📊",
    title: "Easy Export",
    description: "Download as PDF or text instantly",
  },
]

export default function FeatureHighlight() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all"
        >
          <div className="text-4xl mb-3">{feature.icon}</div>
          <h3 className="font-semibold mb-2 text-card-foreground">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
