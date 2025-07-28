const pool = require('./db');

const BlogPost = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    return rows;
  },
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ title, content, image_path }) {
    const [result] = await pool.query(
      'INSERT INTO blog_posts (title, content, image_path, created_at) VALUES (?, ?, ?, NOW())',
      [title, content, image_path]
    );
    return { id: result.insertId, title, content, image_path };
  },
  async delete(id) {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);
  }
};

module.exports = BlogPost; 