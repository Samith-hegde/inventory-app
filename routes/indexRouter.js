const { Router } = require('express');
const indexController = require('../controllers/indexController');
const gamesRouter = require('./gamesRouter');
const genreRouter = require('./genreRouter');
const developerRouter = require('./developerRouter');

const indexRouter = Router();

indexRouter.get('/', indexController.getHomePage);
indexRouter.use('/games', gamesRouter);
indexRouter.use('/genres', genreRouter);
indexRouter.use('/developers', developerRouter);

module.exports = indexRouter;

