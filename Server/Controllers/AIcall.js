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
        {
          role: "system",
          content: `You are Alice, a virtual assistant for the Photopedia application. 
      You always answer customer questions about Photopedia politely and informatively. Photopedia is a platform where users can buy and sell high-quality photographs. 
      Provide clear and concise information about the platform's features, pricing, and policies. 
      If a user has a technical issue or needs further assistance, guide them to contact Photopedia support at +1-925-272-5671 or email id Samsonm08@gmail.com
     `
        },
        {
          role: "user",
          content: message
        }
      ],
    });
    res.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

module.exports = AIcall;
