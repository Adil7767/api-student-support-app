import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @swagger
 * tags:
 *   name: Mental Health
 *   description: Mental health support
 */

/**
 * @swagger
 * /api/mental-health/resources:
 *   get:
 *     summary: Get mental health resources
 *     tags: [Mental Health]
 *     responses:
 *       200:
 *         description: List of mental health resources
 */
router.get('/resources', (req, res) => {
  const resources = [
    { id: 1, title: '24/7 Crisis Helpline', description: 'Immediate support for mental health emergencies', contact: '1-800-273-8255', type: 'hotline' },
    { id: 2, title: 'Online Counseling Sessions', description: 'Schedule virtual sessions with licensed therapists', contact: 'book@counseling.edu', type: 'counseling' },
    { id: 3, title: 'Peer Support Groups', description: 'Connect with fellow students facing similar challenges', contact: 'groups@student.edu', type: 'peer-support' },
    { id: 4, title: 'Meditation & Mindfulness', description: 'Guided meditation sessions and mindfulness resources', contact: 'wellness@student.edu', type: 'wellness' }
  ];
  res.json(resources);
});

/**
 * @swagger
 * /api/mental-health/chat:
 *   post:
 *     summary: Get AI-powered mental health chat response
 *     tags: [Mental Health]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI chat response
 */
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a compassionate and supportive mental health assistant for students. Provide helpful and encouraging responses. Do not give medical advice. If the situation seems serious, strongly advise the user to seek help from a qualified professional or a crisis hotline.',
        },
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ message: 'Failed to get response from AI assistant' });
  }
});

export default router; 