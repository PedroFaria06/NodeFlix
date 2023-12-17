const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/PlaylistController');
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, PlaylistController.createPlaylist);
router.post('/:playlistId/add/:movieId', verifyToken, PlaylistController.addMovieToPlaylist);
router.get('/', PlaylistController.getAllPlaylists);
router.delete('/:playlistId', verifyToken, PlaylistController.deletePlaylist);
router.delete('/:playlistId/remove/:movieId', verifyToken, PlaylistController.removeMovieFromPlaylist);


module.exports = router;
