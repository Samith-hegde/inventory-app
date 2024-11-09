const pool = require('./pool');

async function getAllGames() {
    const query = 'SELECT * FROM games';
    const { rows } = await pool.query(query);
    return rows;
}

async function getGame(id) {
    const query = 'SELECT * FROM games WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

async function addGame(gameDetails) {
    const selectedDeveloper = gameDetails.developer;
    const developerID = await getDeveloperID(selectedDeveloper);
    const query = 'INSERT INTO games (name, developer_id, price, description) VALUES ($1, $2)';
    await pool.query(query, [gameDetails.name, developerID, gameDetails.price, gameDetails.description]);
}

async function updateGame(id, gameDetails) {
    const selectedDeveloper = gameDetails.developer;
    const developerID = await getDeveloperID(selectedDeveloper);
    const query = 'UPDATE games SET name = $2, developer_id = $3, price = $4, description = $5 WHERE id = $1';
    await pool.query(query, [id, gameDetails.name, developerID, gameDetails.price, gameDetails.description]);
}

async function deleteGame(id) {
    const query = 'DELETE FROM games WHERE id = $1';
    await pool.query(query, [id]);
}

async function getAllGenres() {
    const query = 'SELECT DISTINCT genre FROM genres';
    const { rows } = await pool.query(query);
    return rows;
}

async function getAllDevelopers() {
    const query = 'SELECT * FROM developers';
    const { rows } = await pool.query(query);
    return rows;
}

async function getDeveloper(id) {
    const query = 'SELECT * FROM developers WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

async function getDeveloperID(name) {
    const query = 'SELECT id FROM developers WHERE name = $1';
    const { rows } = await pool.query(query, [name]);
    return rows[0].id;
}

async function addDeveloper(developerDetails) {
    const query = 'INSERT INTO developers (name, founded, location) VALUES ($1, $2)';
    await pool.query(query, [developerDetails.name, developerDetails.founded, developerDetails.location]);
}

async function updateDeveloper(id, developerDetails) {
    const query = 'UPDATE developers SET name = $2, founded = $3, location = $4 WHERE id = $1';
    await pool.query(query, [id, developerDetails.name, developerDetails.founded, developerDetails.location]);
}

async function deleteDeveloper(id) {
    const query = 'DELETE FROM developers WHERE id = $1';
    await pool.query(query, [id]);
}

module.exports = {
    getAllGames,
    getGame,
    addGame,
    updateGame,
    deleteGame,
    getAllGenres,
    getAllDevelopers,
    getDeveloper,
    addDeveloper,
    updateDeveloper,
    deleteDeveloper
};