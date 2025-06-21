import express from 'express';
import Event from '../models/Event.js';
import Post from '../models/Post.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community features
 */

/**
 * @swagger
 * /api/community/events:
 *   get:
 *     summary: Get all community events
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Error fetching events
 *   post:
 *     summary: Create a new event (auth required)
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 *       500:
 *         description: Error creating event
 */
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

router.post('/events', authenticateToken, async (req, res) => {
  try {
    const { title, description, date, location, category } = req.body;
    const event = new Event({ title, description, date, location, category });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

/**
 * @swagger
 * /api/community/posts:
 *   get:
 *     summary: Get all community posts
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Error fetching posts
 *   post:
 *     summary: Create a new post (auth required)
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 *       500:
 *         description: Error creating post
 */
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

router.post('/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = new Post({ title, content, author: req.user.userId, category });
    await post.save();
    await post.populate('author', 'name');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

/**
 * @swagger
 * /api/community/volunteer:
 *   get:
 *     summary: Get volunteer opportunities
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: List of volunteer opportunities
 */
router.get('/volunteer', (req, res) => {
  const opportunities = [
    { id: 1, title: 'Community Food Drive', organization: 'Local Food Bank', date: 'Every Saturday', description: 'Help distribute food to families in need' },
    { id: 2, title: 'Youth Mentoring Program', organization: 'City Youth Center', date: 'Weekdays 3-5 PM', description: 'Mentor high school students with academics' },
    { id: 3, title: 'Environmental Cleanup', organization: 'Green Campus Initiative', date: 'First Sunday of each month', description: 'Campus and community environmental projects' }
  ];
  res.json(opportunities);
});

export default router; 