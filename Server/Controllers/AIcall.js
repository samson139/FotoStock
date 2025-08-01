require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const AIcall = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: message }
      ],
    });
    res.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

module.exports = AIcall;
