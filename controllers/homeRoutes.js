const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
<<<<<<< HEAD
const randomUrlGen = require("random-youtube-music-video");

=======
// const rl = require('random-lyrics');
>>>>>>> 5c5933a337ba13bcb99494a922ace6740d1f167f

router.get('/', async (req, res) => {
  // const randomLyric = '';
  try {
<<<<<<< HEAD
    const youtubeUrl = await randomUrlGen.getRandomMusicVideoUrl();
    console.log(youtubeUrl.replace("watch?v=", "embed/"));
    const newYoutubeUrl = youtubeUrl.replace("watch?v=", "embed/");
    //youtubeUrl = youtubeUrl.replace("watch?v=", "v/");
=======
    // rl().then((data) => (randomLyric = data));
>>>>>>> 5c5933a337ba13bcb99494a922ace6740d1f167f
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
<<<<<<< HEAD
      newYoutubeUrl
=======
      // randomLyric,
>>>>>>> 5c5933a337ba13bcb99494a922ace6740d1f167f
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created'],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
