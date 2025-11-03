export async function POST(request: Request) {
  try {
    const { itemName, type } = await request.json();

    if (!itemName || !type) {
      return Response.json({ error: "Missing item name or type" }, { status: 400 });
    }

    // Construct search query
    const query =
      type === "exercise"
        ? `${itemName} gym exercise`
        : `${itemName} food`;

    // Call Pexels API
    if (!process.env.PEXELS_API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string, // ✅ NO Bearer
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Pexels API error:", errorText);
      return Response.json({ error: "Failed to fetch image from Pexels", details: errorText }, { status: 500 });
    }

    const data = await res.json();
    const imageUrl = data.photos?.[0]?.src?.medium || data.photos?.[0]?.src?.original;

    if (!imageUrl) {
      return Response.json({ error: "No image found for this item" }, { status: 404 });
    }

    return Response.json({
      imageUrl,
      itemName,
      type,
      success: true,
    });
  } catch (error) {
    console.error("🧨 Image Fetch Error:", error);
    return Response.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
