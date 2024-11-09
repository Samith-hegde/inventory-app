const db = require('../models/queries');

async function getAllGenres(req, res) {
    const genres = await db.getAllGenres();
    res.render('genres', { title: 'Genres', genres });
}

module.exports = {
    getAllGenres
}