export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      const { text } = req.body;
  
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: [
            { role: "user", content: `Summarize this: ${text}` }
          ],
        }),
      });
  
      const data = await response.json();
      const summary = data.choices?.[0]?.message?.content || "No summary returned.";
  
      return res.status(200).json({ summary });
  
    } catch (err) {
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  }
  