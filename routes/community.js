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
router
  .route('/events')
  .get(async (req, res) => {
    try {
      const events = await Event.find().sort({ date: 1 });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  })
  .post(authenticateToken, async (req, res) => {
    try {
      const { title, description, date, location, category } = req.body;
      const event = new Event({
        title,
        description,
        date,
        location,
        category,
        createdBy: req.user.userId,
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error: error.message });
    }
  });

/**
 * @swagger
 * /api/community/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Event updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error updating event
 *   delete:
 *     summary: Delete an event
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error deleting event
 */
router
  .route('/events/:id')
  .put(authenticateToken, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to update this event' });
      }

      const { title, description, date, location, category } = req.body;
      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;
      event.category = category || event.category;

      await event.save();
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Error updating event', error: error.message });
    }
  })
  .delete(authenticateToken, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to delete this event' });
      }

      await event.deleteOne();
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error: error.message });
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
router
  .route('/posts')
  .get(async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('author', 'name')
        .populate('comments.user', 'name')
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
  })
  .post(authenticateToken, async (req, res) => {
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
 * /api/community/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error updating post
 *   delete:
 *     summary: Delete a post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error deleting post
 */
router
  .route('/posts/:id')
  .put(authenticateToken, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to update this post' });
      }

      const { title, content, category } = req.body;
      post.title = title || post.title;
      post.content = content || post.content;
      post.category = category || post.category;

      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error: error.message });
    }
  })
  .delete(authenticateToken, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }

      await post.deleteOne();
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error: error.message });
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