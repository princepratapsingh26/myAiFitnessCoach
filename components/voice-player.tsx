"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface VoicePlayerProps {
  text: string
  sectionId: string
  onSpeakingChange?: (isPlaying: boolean) => void
}

export default function VoicePlayer({ text, sectionId, onSpeakingChange }: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    setIsSupported("speechSynthesis" in window)
  }, [])

  const handleToggleSpeak = () => {
    if (!isSupported) {
      alert("Speech synthesis is not supported in your browser")
      return
    }

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      onSpeakingChange?.(false)
    } else {
      // Stop any other playing audio
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onend = () => {
        setIsPlaying(false)
        onSpeakingChange?.(false)
      }

      utterance.onerror = () => {
        setIsPlaying(false)
        onSpeakingChange?.(false)
      }

      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
      onSpeakingChange?.(true)
    }
  }

  if (!isSupported) return null

  return (
    <button
      onClick={handleToggleSpeak}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
        isPlaying
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "bg-accent text-accent-foreground hover:opacity-90"
      }`}
    >
      {isPlaying ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Stop Reading</span>
        </>
      ) : (
        <>
          <span>🔊</span>
          <span>Read to Me</span>
        </>
      )}
    </button>
  )
}
