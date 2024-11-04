const { Router } = require('express');
const genreController = require('../controllers/genreController');

const genreRouter = Router();

genreRouter.get('/', genreController.getAllGenres);
genreRouter.get('/add', genreController.getAddGenre);
genreRouter.post('/add', genreController.postAddGenre);
genreRouter.post('/delete/:id', genreController.postDeleteGenre);

module.exports = genreRouter;