const { User, Blog } = require('../models');

const blogController = {
  getAllBlogs(req, res) {
    Blog.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then((blogData) => res.json(blogData))
      .catch((err) => res.status(400).json(err));
  },

  createBlog({ body }, res) {
    Blog.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { blogs: _id } },
          { new: true }
        );
      })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  getBlogById({ params }, res) {
    Blog.findOne({ _id: params.id })
      .select('-__v')
      .then((blogData) => {
        if (!blogData) {
          res.status(404).json({ message: 'No blog found with this id' });
          return;
        }
        res.json(blogData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  updateBlog({ params, body }, res) {
    Blog.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((blogData) => {
        if (!blogData) {
          res.status(404).json({ message: 'No blog found with this id!' });
          return;
        }
        res.json(blogData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteBlog({ params, body }, res) {
    Blog.findOneAndDelete({ _id: params.id }, body)
      .then((blogData) => {
        if (!blogData) {
          res.status(404).json({ message: 'No blog found with this id!' });
          return;
        }
        res.json(blogData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = blogController;
