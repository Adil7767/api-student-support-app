import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Academic
 *   description: Academic support
 */

/**
 * @swagger
 * /api/academic/tutoring:
 *   get:
 *     summary: Get tutoring services
 *     tags: [Academic]
 *     responses:
 *       200:
 *         description: List of tutoring services
 */
router.get('/tutoring', (req, res) => {
  const tutoring = [
    { id: 1, subject: 'Mathematics', tutor: 'Dr. Sarah Johnson', availability: 'Mon-Wed 2-4 PM', location: 'Library Room 101' },
    { id: 2, subject: 'Computer Science', tutor: 'Prof. Mike Chen', availability: 'Tue-Thu 10-12 PM', location: 'CS Building Room 205' },
    { id: 3, subject: 'English Writing', tutor: 'Ms. Emily Davis', availability: 'Mon-Fri 1-3 PM', location: 'Writing Center' }
  ];
  res.json(tutoring);
});

/**
 * @swagger
 * /api/academic/resources:
 *   get:
 *     summary: Get academic resources
 *     tags: [Academic]
 *     responses:
 *       200:
 *         description: List of academic resources
 */
router.get('/resources', (req, res) => {
  const resources = [
    { id: 1, title: 'Study Guides Library', description: 'Comprehensive study materials for all subjects', link: '/study-guides' },
    { id: 2, title: 'Past Exam Papers', description: "Previous years' examination papers with solutions", link: '/exam-papers' },
    { id: 3, title: 'Academic Planning Tools', description: 'Course planners and academic tracking tools', link: '/planning-tools' }
  ];
  res.json(resources);
});

export default router; 