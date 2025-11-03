import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function GET() {
  try {
    const prompt = `
Generate a comprehensive workout routine for all major body parts.
Structure your response with clear sections as follows:

**LEGS:**
- Exercise 1: [Name - Reps/Sets - Duration]
- Exercise 2: [Name - Reps/Sets - Duration]
- Exercise 3: [Name - Reps/Sets - Duration]

**BACK:**
- Exercise 1: [Name - Reps/Sets - Duration]
- Exercise 2: [Name - Reps/Sets - Duration]
- Exercise 3: [Name - Reps/Sets - Duration]

**CHEST:**
- Exercise 1: [Name - Reps/Sets - Duration]
- Exercise 2: [Name - Reps/Sets - Duration]
- Exercise 3: [Name - Reps/Sets - Duration]

**ARMS:**
- Exercise 1: [Name - Reps/Sets - Duration]
- Exercise 2: [Name - Reps/Sets - Duration]
- Exercise 3: [Name - Reps/Sets - Duration]

**CORE:**
- Exercise 1: [Name - Reps/Sets - Duration]
- Exercise 2: [Name - Reps/Sets - Duration]
- Exercise 3: [Name - Reps/Sets - Duration]

Each exercise should include proper form cues and the muscle groups targeted.
Include both compound and isolation exercises.
    `

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    const result = await model.generateContent(prompt)
    const exercisesText = result.response.text()

    // Helper to extract each section
    const parseSection = (name: string) => {
      const regex = new RegExp(`\\*\\*${name}:\\*\\*([\\s\\S]*?)(?=\\*\\*|$)`, "i")
      const match = exercisesText.match(regex)
      return match ? match[1].trim() : ""
    }

    const bodyPartExercises = {
      legs: parseSection("LEGS"),
      back: parseSection("BACK"),
      chest: parseSection("CHEST"),
      arms: parseSection("ARMS"),
      core: parseSection("CORE"),
      fullText: exercisesText,
    }

    return Response.json(bodyPartExercises)
  } catch (error) {
    console.error("Body Parts Exercises API Error:", error)
    return Response.json(
      { error: "Failed to generate body parts exercises. Please try again.", success: false },
      { status: 500 },
    )
  }
}
