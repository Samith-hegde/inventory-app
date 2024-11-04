const { Router } = require('express');
const gamesController = require('../controllers/gamesController');

const gamesRouter = Router();

gamesRouter.get('/', gamesController.getAllGames);
gamesRouter.get('/add', gamesController.getAddGame);
gamesRouter.post('/add', gamesController.postAddGame);
gamesRouter.get('/edit/:id', gamesController.getEditGame);
gamesRouter.post('/edit/:id', gamesController.postEditGame);
gamesRouter.post('/delete/:id', gamesController.postDeleteGame);

module.exports = gamesRouter;