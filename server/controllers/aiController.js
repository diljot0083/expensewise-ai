import Groq from "groq-sdk";

export const getInsights = async (req, res) => {
    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
        const { expenses } = req.body;

        const total = expenses.reduce((sum, e) => sum + e.amount, 0);

        const prompt = `
You are a financial assistant.

Return ONLY valid JSON.

Format:
{
  "total": "",
  "topCategory": "",
  "advice": ""
}

Use this data:

Total: ₹${total}

Expenses:
${JSON.stringify(expenses)}

Rules:
- DO NOT calculate total yourself
- Use the provided total
- Keep responses short
`;

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "user", content: prompt }
            ],
        });

        const raw = response.choices[0].message.content;

        const cleaned = raw.replace(/```json|```/g, "").trim();

        let parsed;

        try {
            parsed = JSON.parse(cleaned);
        } catch (err) {
            console.error("Parse error:", cleaned);
            return res.status(500).json({ message: "Invalid AI response" });
        }

        res.json(parsed);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI error" });
    }
};