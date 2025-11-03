"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("authUser")
    if (!user) {
      router.push("/")
    } else {
      setIsAuthed(true)
    }
    setLoading(false)
  }, [router])

  if (loading) return null
  if (!isAuthed) return null

  return <>{children}</>
}
