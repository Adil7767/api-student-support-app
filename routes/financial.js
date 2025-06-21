import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Financial
 *   description: Financial support
 */

/**
 * @swagger
 * /api/financial/scholarships:
 *   get:
 *     summary: Get scholarship information
 *     tags: [Financial]
 *     responses:
 *       200:
 *         description: List of scholarships
 */

router.get('/scholarships', (req, res) => {
  const scholarships = [
    { id: 1, title: 'Merit-Based Scholarship', amount: '$5,000', deadline: 'March 15, 2025', requirements: 'GPA 3.5+, Full-time student' },
    { id: 2, title: 'Need-Based Grant', amount: '$3,000', deadline: 'April 30, 2025', requirements: 'Financial need demonstration' },
    { id: 3, title: 'Research Assistant Grant', amount: '$2,500', deadline: 'May 1, 2025', requirements: 'Undergraduate research participation' }
  ];
  res.json(scholarships);
});

/**
 * @swagger
 * /api/financial/jobs:
 *   get:
 *     summary: Get job opportunities
 *     tags: [Financial]
 *     responses:
 *       200:
 *         description: List of job opportunities
 */

router.get('/jobs', (req, res) => {
  const jobs = [
    { id: 1, title: 'Campus Library Assistant', department: 'Library Services', hours: '15-20 hours/week', pay: '$12/hour' },
    { id: 2, title: 'Lab Teaching Assistant', department: 'Computer Science', hours: '10-15 hours/week', pay: '$15/hour' },
    { id: 3, title: 'Student Center Coordinator', department: 'Student Affairs', hours: '20 hours/week', pay: '$14/hour' }
  ];
  res.json(jobs);
});

export default router; 