import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, mode } = req.body;

  function getInstruction(mode) {
    switch (mode) {
      case "detailed":
        return "Write a long detailed summary with structure and clarity.";
      case "bullet":
        return "Summarize using bullet points only.";
      case "simple":
        return "Summarize in very simple language.";
      case "professional":
        return "Summarize in a professional tone.";
      default:
        return "Give a concise summary.";
    }
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: getInstruction(mode) },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await response.json();

    const summary = data?.choices?.[0]?.message?.content || "No summary returned.";

    res.status(200).json({ summary });

  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ summary: "Server error occurred." });
  }
}
