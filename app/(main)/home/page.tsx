"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import CarouselSlider from "@/components/carousel-slider"
import { Dumbbell, Apple, Lightbulb, Users } from "lucide-react"

export default function HomePage() {
  const [userName] = useState(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("authUser")
      return user ? JSON.parse(user).name || "Fitness Enthusiast" : "Fitness Enthusiast"
    }
    return "Fitness Enthusiast"
  })

  const features = [
    {
      icon: Dumbbell,
      title: "Generate Workout Plan",
      description: "Get personalized exercises for your goals",
      href: "/workout-plan",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Lightbulb,
      title: "AI Tips",
      description: "Lifestyle, posture & motivation tips",
      href: "/ai-tips",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Users,
      title: "All Body Parts",
      description: "Workout routines for each body part",
      href: "/body-parts",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">
            My<span className="text-black">Fitness</span>Coach
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {userName}!</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                localStorage.removeItem("authUser")
                window.location.href = "/"
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Carousel Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold mb-6 text-balance">Be Stronger Than Excuses</h2>
          <CarouselSlider />
        </motion.section>

        {/* Feature Buttons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-balance">Your Fitness Journey Starts Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} href={feature.href}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`h-full bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Today's Challenge</h2>
          <p className="text-lg text-muted-foreground mb-4">
            "The only bad workout is the one that didn't happen. Start your fitness journey today!"
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">30 min</div>
              <div className="text-sm text-muted-foreground">Recommended Daily</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Days a Week</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Possible Results</div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
