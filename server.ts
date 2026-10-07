import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for PRINT X PRESS Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body; // Array of { role: 'user' | 'model', content: string }
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Format contents for Gemini
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: `You are a powerful, intelligent general-purpose AI assistant combined with expert printing consultancy for "PRINT X PRESS", a premier printing press located at Kazipur Gali, Bhikhana Pahari, Patna, Bihar 800016.
You can answer almost anything in natural language (Hindi, English, Hinglish, spelling mistakes, short questions, general knowledge, coding, writing, translating, weather, business ideas, creative content, resume building, math, etc.).
When the question is specifically related to PRINT X PRESS or printing services, prioritize this accurate business information:
1. Flex banner printing (Normal 280 GSM @ ₹12/sq.ft, Star Flex 340 GSM @ ₹18/sq.ft).
2. 3D Acrylic & LED Glow Sign Boards (@ ₹180/sq.ft).
3. Eco-Solvent Vinyl & Sunboard (₹35/sq.ft), Roll-up Standees (₹850), Visiting Cards (₹250/100pcs), Custom T-Shirts (₹350), Mugs (₹199).
4. Store location: Kazipur Gali, Bhikhana Pahari, Patna, Bihar 800016. Phone: +91 7481068602.
Always match the user's language (Hindi, English, or Hinglish) and maintain conversation context. Be polite, helpful, and concise.`,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I'm here to help with your printing needs at PRINT X PRESS, Patna!" });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    const msg = error.message || '';
    const bodyMessages = req.body?.messages || [];
    const lastUserMsg = (bodyMessages[bodyMessages.length - 1]?.content || '').toLowerCase();

    let chatFallback = "Namaste! For instant printing rates, flex banners, or orders at PRINT X PRESS (Kazipur Gali, Patna), please call us directly at +91 7481068602 or WhatsApp us!";

    if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('rate') || lastUserMsg.includes('flex')) {
      chatFallback = "🖨️ PRINT X PRESS Printing Rates:\n- Normal Flex (280 GSM): ₹12/sq.ft\n- Heavy Star Flex (340 GSM): ₹18/sq.ft\n- Eco-Solvent Vinyl + Sunboard: ₹35/sq.ft\n- Roll-up Standee: ₹850\nCall +91 7481068602 for bulk discounts!";
    } else if (lastUserMsg.includes('glow') || lastUserMsg.includes('3d') || lastUserMsg.includes('sign')) {
      chatFallback = "✨ 3D Acrylic & LED Glow Sign Boards are priced at ₹180/sq.ft complete with waterproof LED modules and heavy aluminum casing at PRINT X PRESS, Patna.";
    } else if (lastUserMsg.includes('where') || lastUserMsg.includes('address') || lastUserMsg.includes('location') || lastUserMsg.includes('patna')) {
      chatFallback = "📍 PRINT X PRESS is located at Kazipur Gali, Bhikhana Pahari, Patna, Bihar 800016. Open 7 Days (9:00 AM - 9:00 PM). Call +91 7481068602.";
    } else if (lastUserMsg.includes('card') || lastUserMsg.includes('pamphlet') || lastUserMsg.includes('t-shirt')) {
      chatFallback = "📋 Visiting Cards: ₹250/100 pcs. Custom T-Shirts: ₹350/piece. Pamphlets / Flyers: Bulk packs starting at ₹0.75/pc. Order via WhatsApp instantly!";
    }

    if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota') || msg) {
      return res.json({
        text: chatFallback
      });
    }
    res.status(500).json({ error: msg || 'Internal server error' });
  }
});

// API endpoint for Google Maps Grounding & Local Patna Guidance
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    res.json({
      text: response.text || 'Location information retrieved successfully.',
      groundingMetadata: response.candidates?.[0]?.groundingMetadata || null,
    });
  } catch (error: any) {
    console.error('Maps Grounding API Error:', error);
    const msg = error.message || '';
    const lowerPrompt = (req.body?.prompt || '').toLowerCase();

    let fallbackText = "PRINT X PRESS is located at Kazipur Gali, Bhikhana Pahari, Patna, Bihar 800016 (Near Patna University area). For direct navigation, call +91 7481068602.";

    if (lowerPrompt.includes('patna junction')) {
      fallbackText = "🚊 Route from Patna Junction to PRINT X PRESS (Kazipur Gali, Bhikhana Pahari): Distance is approx. 3.5 km. Take an auto-rickshaw from Patna Junction station exit towards Kadamkuan / Bhikhana Pahari via Rajendra Nagar overbridge. Total travel time is around 10-15 minutes.";
    } else if (lowerPrompt.includes('landmark') || lowerPrompt.includes('bhikhana pahari')) {
      fallbackText = "📍 Prominent Landmarks near PRINT X PRESS (Bhikhana Pahari, Patna): Patna University, Saidpur Hostel, PMC Hospital, and Ashok Rajpath main road. Kazipur Gali is easily accessible right off Bhikhana Pahari main crossing.";
    } else if (lowerPrompt.includes('kankerbagh')) {
      fallbackText = "🚗 Route from Kankerbagh to PRINT X PRESS: Distance is approx. 2.5 - 3 km. Take the Rajendra Nagar overbridge towards Kadamkuan, proceed towards Bhikhana Pahari main road. Easy auto and bike accessibility.";
    }

    if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota') || msg) {
      return res.json({
        text: fallbackText,
        groundingMetadata: null
      });
    }
    res.status(500).json({ error: msg || 'Maps Grounding error' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
