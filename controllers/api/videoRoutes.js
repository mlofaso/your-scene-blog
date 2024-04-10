// const { Video } = require('../models');
const router = express.Router();
const randomUrlGen = require("random-youtube-music-video");
const Video = require("../../models/Video");

router.get('/video', async (req, res) => {
    try {
        const youtubeUrl = await randomUrlGen.getRandomMusicVideoUrl();
        console.log(youtubeUrl);
    } catch (error) {
        // Handle error
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// router.post('/video', async (req, res) => {
//     try {
//         const youtubeUrl = await randomUrlGen.getRandomMusicVideoUrl();
//         console.log(youtubeUrl);
//         res.render('video', { youtubeUrl });
//     } catch (error) {
//         // Handle error
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.post('/', async (req, res) => {
    console.log(req.body);
    console.log(req.session);
    try {
      const randomVid = await Video.create({
        ...req.body,
        user_id: req.session.user_id,
      });

    //  res.render('video', { youtubeUrl });
    //   console.log(randomVid);
  
      res.status(200).json(randomVid);
    } catch (err) {
      res.status(400).json(err);
    }
  });
module.exports = router;