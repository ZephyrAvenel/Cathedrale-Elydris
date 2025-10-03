import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body || "{}");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es Elydris, l’Architecte des Agents." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content || "…" })
    };
  } catch (err) {
    return { statusCode: 500, body: "Erreur Elydris: " + (err as Error).message };
  }
};

export { handler };
