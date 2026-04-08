// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Public: View all approved articles
router.get('/published', async (req, res) => {
    const articles = await Article.find({ isApproved: true }).populate('author', 'name');
    res.json(articles);
});

// Educator: Upload an article/video link
router.post('/upload', async (req, res) => {
    const newArticle = new Article(req.body); 
    await newArticle.save();
    res.status(201).send("Pending Admin Approval");
});

// Admin: Manage Articles (Approve/Delete)
router.patch('/approve/:id', async (req, res) => {
    await Article.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.send("Article Approved");
});