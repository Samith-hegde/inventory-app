const db = require('../models/queries');

async function getAllGames(req, res) {
    const games = await db.getAllGames();
    res.render('games', { title: 'Games', games });
}

async function getAddGame(req, res) {
    const developers = await db.getAllDevelopers();
    res.render('gamesForm', { title: 'Add Game', developers, edit: false, game: {} });
}

async function postAddGame(req, res) {
    const gameDetails = req.body;
    await db.addGame(gameDetails);
    res.redirect('/games');
}

async function getEditGame(req, res) {
    const id = req.params.id;
    const game = await db.getGame(id);
    const developers = await db.getAllDevelopers();
    res.render('gamesForm', { title: 'Edit Game', developers, edit: true, game });
}

async function postEditGame(req, res) {
    const id = req.params.id;
    const { name, description, price, genres, developer } = req.body;

    const filteredGenres = genres.filter(genre => genre.trim() !== '');
    const gameDetails = {
        name,
        description,
        price,
        genres: filteredGenres,
        developer
    };

    await db.updateGame(id, gameDetails);
    res.redirect('/games');
}

async function postDeleteGame(req, res) {
    const id = req.params.id;
    await db.deleteGame(id);
    res.redirect('/games');
}

module.exports = {
    getAllGames,
    getAddGame,
    postAddGame,
    getEditGame,
    postEditGame,
    postDeleteGame
}