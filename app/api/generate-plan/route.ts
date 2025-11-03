import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const input = await req.json();

    const prompt = `You are an expert fitness coach and nutritionist. Create a personalized fitness plan for:
- Name: ${input.name}, Age: ${input.age}, Gender: ${input.gender}
- Height: ${input.height}cm, Weight: ${input.weight}kg
- Goal: ${input.fitnessGoal}
- Fitness Level: ${input.fitnessLevel}
- Workout Location: ${input.workoutLocation}
- Dietary Preference: ${input.dietaryPreference}
${input.stressLevel ? `- Stress Level: ${input.stressLevel}` : ""}
${input.medicalHistory ? `- Medical History: ${input.medicalHistory}` : ""}

Structure your response clearly in sections like this:

**WORKOUT PLAN:**
[Workout details]

**DIET PLAN:**
[Diet details]

**TIPS & ADVICE:**
[Tips and advice]`;

    // ✅ Use Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const planText = result.response.text();

    console.log("🧠 Gemini Raw Response:", planText);

    // 🧹 Clean and normalize text
    const cleanText = planText
      .replace(/\r/g, "")
      .replace(/\*/g, "")
      .replace(/\#/g, "")
      .trim();

    // ✅ Section extraction (robust against markdown)
    function extractSection(label: string) {
      const pattern = new RegExp(
        `${label}:?\\s*([\\s\\S]*?)(?=(WORKOUT PLAN|DIET PLAN|TIPS & ADVICE|$))`,
        "i"
      );
      const match = cleanText.match(pattern);
      if (!match) {
        console.warn(`⚠️ Section not found: ${label}`);
        return "";
      }
      return match[1].trim();
    }

    const workoutPlan = extractSection("WORKOUT PLAN");
    const dietPlan = extractSection("DIET PLAN");
    const tips = extractSection("TIPS & ADVICE");

    console.log("✅ Parsed sections:", {
      hasWorkout: !!workoutPlan,
      hasDiet: !!dietPlan,
      hasTips: !!tips,
    });

    return Response.json({
      success: true,
      workoutPlan,
      dietPlan,
      tips,
    });
  } catch (error) {
    console.error("❌ Gemini Plan Generation Error:", error);
    return Response.json(
      { success: false, error: "Failed to generate fitness plan." },
      { status: 500 }
    );
  }
}
