const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [numRowsUpdated, updatedPosts] = await Post.update(
      {
        content: req.body.content
      },
      { 
        where: { 
          id: req.params.id, 
          user_id: req.session.user_id 
        },
        returning: true // This option is to return the updated post
      }
    );
    console.log(updatedPosts);

    if (numRowsUpdated === 0) {
      res.status(404).json({ message: 'No post found with this id or unauthorized to update!' });
      return;
    }

    res.json(updatedPosts); // Return the updated post
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
