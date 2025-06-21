import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MentalHealth
 *   description: Mental health support
 */

/**
 * @swagger
 * /api/mental-health/resources:
 *   get:
 *     summary: Get mental health resources
 *     tags: [MentalHealth]
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
 *     tags: [MentalHealth]
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
router.post('/chat', (req, res) => {
  const responses = [
    "I understand you're going through a difficult time. Remember that it's okay to ask for help.",
    "Your feelings are valid. Consider reaching out to our counseling services for professional support.",
    "Self-care is important. Try taking some deep breaths and remember you're not alone.",
    "Have you considered talking to a counselor? They can provide personalized strategies to help you cope."
  ];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  res.json({ response: randomResponse });
});

export default router; 