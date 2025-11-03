import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function GET() {
  try {
    const prompt = `You are a professional fitness and wellness coach. Generate a daily set of short, practical, and motivational health tips in the following format:

**MOTIVATIONAL QUOTE:**
[One powerful, short motivational quote - max 2 sentences]

**POSTURE TIP:**
[One posture correction tip with a simple benefit]

**HEALTHY FOOD TIP:**
[One nutrition tip including a specific food or habit]

**EXERCISE TIP:**
[One actionable exercise or movement tip that can be done anywhere]

**WELLNESS TIP:**
[One mental health, recovery, or lifestyle tip]

Each tip must be short (1–2 sentences), practical, and distinct.`

    // ✅ Use Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text()?.trim() || "";

    console.log("🧠 Gemini Tips Response:", text);

    // 🧹 Clean up text
    const cleanText = text
      .replace(/\r/g, "")
      .replace(/\*/g, "")
      .replace(/\#/g, "")
      .trim();

    // ✅ Safe section extractor
    function extractSection(label: string) {
      const pattern = new RegExp(`${label}:?\\s*([\\s\\S]*?)(?=(MOTIVATIONAL QUOTE|POSTURE TIP|HEALTHY FOOD TIP|EXERCISE TIP|WELLNESS TIP|$))`, "i");
      const match = cleanText.match(pattern);
      if (!match) {
        console.warn(`⚠️ Section not found: ${label}`);
        return "";
      }
      return match[1].trim();
    }

    const motivationalQuote = extractSection("MOTIVATIONAL QUOTE") || "Push yourself — no one else will do it for you.";
    const postureTip = extractSection("POSTURE TIP") || "Keep your shoulders back and core tight to avoid strain.";
    const healthyFoodTip = extractSection("HEALTHY FOOD TIP") || "Add a serving of fruits or greens to every meal.";
    const exerciseTip = extractSection("EXERCISE TIP") || "Do 10 squats and stretches every couple of hours.";
    const wellnessTip = extractSection("WELLNESS TIP") || "Take a few deep breaths and practice gratitude daily.";

    return Response.json({
      success: true,
      motivationalQuote,
      postureTip,
      healthyFoodTip,
      exerciseTip,
      wellnessTip,
    });
  } catch (error) {
    console.error("❌ Daily Tips API Error:", error);

    // ✅ Fallback values
    const fallbacks = {
      success: true,
      motivationalQuote: "Every rep you do is a step towards your goal. Stay focused, stay strong!",
      postureTip: "Keep your shoulders relaxed and back, chest open. This improves breathing and reduces tension.",
      healthyFoodTip: "Add leafy greens to every meal - they're rich in nutrients and keep you full longer.",
      exerciseTip: "Do 10 bodyweight squats every hour to improve circulation and strengthen your legs.",
      wellnessTip: "Sleep 7-9 hours daily for optimal recovery and muscle growth.",
    };

    return Response.json(fallbacks, { status: 200 });
  }
}
