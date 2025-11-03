import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct import

// Initialize Gemini client
const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const input = await req.json();

    const prompt = `Create a personalized 7-day diet plan for:
- Age: ${input.age}
- Gender: ${input.gender}
- Height: ${input.height} cm
- Weight: ${input.weight} kg
- Goal: ${input.fitnessGoal}
- Dietary Preference: ${input.dietaryPreference}
- Medical History: ${input.medicalHistory || "None"}

Provide the diet plan **only** in this strict JSON format:
{
  "meals": [
    {
      "day": "Monday",
      "breakfast": { "name": "meal name", "calories": 400, "protein": "20g", "carbs": "50g", "fat": "10g" },
      "lunch": { "name": "meal name", "calories": 600, "protein": "30g", "carbs": "70g", "fat": "15g" },
      "dinner": { "name": "meal name", "calories": 500, "protein": "35g", "carbs": "50g", "fat": "12g" },
      "snacks": ["apple", "almonds"]
    }
  ],
  "hydration": "2-3 liters daily",
  "tips": ["tip 1", "tip 2", "tip 3"]
}

Make sure your response is **pure JSON only** (no markdown, no extra text).`;

    // ✅ Use Gemini 2.5 Flash (fast + free-tier compatible)
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    // ✅ Extract text correctly from Gemini SDK response
    const text =
      result?.response?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        ?.join("")
        ?.trim() || "No response";

    console.log("🧠 Gemini Raw Output:\n", text);

    // ✅ Try to extract JSON safely
    let dietPlan;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      dietPlan = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not parse plan" };
    } catch (err) {
      console.error("⚠️ JSON parse error:", err);
      dietPlan = { error: "Invalid JSON format in AI response", raw: text };
    }

    return Response.json({
      rawText: text,
      structured: dietPlan,
      success: true,
    });
  } catch (error) {
    console.error("❌ Diet plan generation error:", error);
    return Response.json({ error: "Failed to generate diet plan", success: false }, { status: 500 });
  }
}
