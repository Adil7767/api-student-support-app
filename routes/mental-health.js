import express from 'express';
import OpenAI from 'openai';
import axios, { AxiosResponse } from 'axios';
import Resource from '../models/Resource.js';
import { openAIService } from '../api/OpenAIService.js';

const router = express.Router();

const openai = new OpenAI({
  apiKey: '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',
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - contact
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the resource
 *         title:
 *           type: string
 *           description: The title of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *         contact:
 *           type: string
 *           description: Contact information for the resource
 *         type:
 *           type: string
 *           description: The type of resource
 *           enum: [hotline, counseling, peer-support, wellness]
 *       example:
 *         id: d5fE_asz
 *         title: 24/7 Crisis Helpline
 *         description: Immediate support for mental health emergencies
 *         contact: 1-800-273-8255
 *         type: hotline
 */

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
 *     summary: Get all mental health resources
 *     tags: [Mental Health]
 *     responses:
 *       200:
 *         description: A list of mental health resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: Server error
 */
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve resources' });
  }
});

/**
 * @swagger
 * /api/mental-health/resources:
 *   post:
 *     summary: Create a new mental health resource
 *     tags: [Mental Health]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: The created resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid input
 */
router.post('/resources', async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/mental-health/resources/{id}:
 *   get:
 *     summary: Get a mental health resource by ID
 *     tags: [Mental Health]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: The resource data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.get('/resources/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve resource' });
  }
});

/**
 * @swagger
 * /api/mental-health/resources/{id}:
 *   put:
 *     summary: Update a mental health resource
 *     tags: [Mental Health]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: The updated resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Invalid input
 */
router.put('/resources/:id', async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/mental-health/resources/{id}:
 *   delete:
 *     summary: Delete a mental health resource
 *     tags: [Mental Health]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.delete('/resources/:id', async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resource' });
  }
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
console.log("mesaage",message)
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a compassionate and supportive mental health assistant for students. Provide helpful and encouraging responses. Do not give medical advice. If the situation seems serious, strongly advise the user to seek help from a qualified professional or a crisis hotline.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`, // ✅ Set this in your .env file
        },
      }
    );
console.log("response",response)
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to get response from AI assistant' });
  }
});

export default router;
