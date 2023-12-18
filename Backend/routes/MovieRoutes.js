const router = require('express').Router()
const MovieController = require('../controllers/MovieController')
const verifyToken = require('../helpers/verify-token')
const Admin = require('../helpers/admin-authorize')

router.post('/create', verifyToken, Admin.authorizeAdmin, MovieController.create)
router.get('/', MovieController.getAll)
router.get('/search', verifyToken, MovieController.search);
router.get('/:id', MovieController.getMovieById)
router.delete('/:id', verifyToken, Admin.authorizeAdmin, MovieController.removeMovieById)
router.patch('/:id', verifyToken, Admin.authorizeAdmin, MovieController.updateMovie)
module.exports = router
