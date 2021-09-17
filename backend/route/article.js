const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth')
const authadmin = require('../middleware/authadmin')

router.post('/create', auth, articleCtrl.create);
router.post('/deleteonearticle', auth, articleCtrl.deleteOneArticle);
router.post('/deleteonearticleadmin', authadmin, articleCtrl.deleteOneArticle);
router.post('/postcomment', auth, articleCtrl.postComment);
router.post('/deleteonecomment', auth, articleCtrl.deleteOneComment);
router.post('/deletecommentadmin', authadmin, articleCtrl.deleteCommentAdmin);
router.get('/getall', auth, articleCtrl.getall);
router.get('/getuserarticle', auth, articleCtrl.getUserArticle);
router.get('/getonearticle', auth, articleCtrl.getOneArticle);
router.get('/getallcommentary', auth, articleCtrl.getAllCommentary);
router.get('/getusercomment', auth, articleCtrl.getUserComment);

module.exports = router;