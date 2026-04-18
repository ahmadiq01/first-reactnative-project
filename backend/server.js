import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages, systemPrompt, focusAreas, context } = req.body;

  const system = `${systemPrompt}

Additional context: ${context}
User's focus areas: ${focusAreas?.join(', ')}
Pakistan/South Asia market context: Always reference local examples, PKR pricing, and Pakistan-specific opportunities where relevant.
Keep responses under 150 words unless the user asks for detail.`;

  try {
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system,
      messages: messages.slice(-10),
    });
    res.json({ reply: response.content[0].text });
  } catch {
    res.status(500).json({ error: 'Chat failed' });
  }
});

app.post('/api/evaluate', async (req, res) => {
  const { domain, idea, userContext } = req.body;

  const prompt = `You are a business and life decision analyst specializing in Pakistan and South Asia markets.

Evaluate this ${domain} idea/decision:
"${idea}"

User context: ${userContext}

Respond with ONLY valid JSON in this exact format (no markdown, no backticks):
{
  "score": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "steps": ["<step 1>", "<step 2>", "<step 3>", "<step 4>", "<step 5>"],
  "marketSize": "<e.g. PKR 2-5 billion addressable market>",
  "timeToRevenue": "<e.g. 3-6 months>"
}

Score guide: 80-100 = strong opportunity, 60-79 = viable with refinement, 40-59 = needs significant changes, below 40 = high risk.
Use Pakistan-specific data, PKR pricing, local market conditions.`;

  try {
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].text.trim();
    const cleaned = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleaned);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Evaluation failed' });
  }
});

app.post('/api/orbit', async (req, res) => {
  const { focusAreas, userName } = req.body;

  const today = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const prompt = `You are writing the Daily Orbit for ${userName}, a morning briefing for ${today}.

Their focus areas: ${focusAreas?.join(', ')}
Context: Pakistan/South Asia professional, likely entrepreneur, freelancer, or career-focused.

Write a personalized morning briefing. Respond with ONLY valid JSON (no markdown):
{
  "headline": "<compelling 10-15 word headline with curiosity gap>",
  "body": "<150-200 word briefing mixing one relevant world/local signal, one opportunity, one observation. Mention Pakistan context.>",
  "action": "<one specific, concrete action they can take TODAY in 30-60 minutes>",
  "insight": "<a quote or mental model from philosophy, business, or science that applies to their focus areas>"
}`;

  try {
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].text.trim();
    const cleaned = text.replace(/```json|```/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch {
    res.status(500).json({ error: 'Orbit generation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`North Star API running on port ${PORT}`));

