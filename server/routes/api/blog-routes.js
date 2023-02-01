const router = require('express').Router();

const {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
} = require('../../controllers/blog-controller');

router.route('/').get(getAllBlogs).post(createBlog);

router.route('/:id').get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;
