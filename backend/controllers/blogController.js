const BlogPost = require('../models/BlogPost');
const path = require('path');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;
    const newPost = await BlogPost.create({ title, content, image_path });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await BlogPost.delete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
}; 