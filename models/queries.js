const pool = require('./pool');

async function getAllGames() {
    const query = `
    SELECT g.*, 
           array_agg(DISTINCT gn.genre) AS genres,
           d.name AS developer_name
    FROM game g
    JOIN genre gn ON g.game_id = gn.game_id
    JOIN developer d ON g.developer_id = d.developer_id
    GROUP BY g.game_id, d.name`;
  
  try {
    const { rows } = await pool.query(query);
  
    const allGames = rows.map(game => ({
      ...game,
      developer: game.developer_name,
      genres: game.genres || []
    }));
  
    return allGames;
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

async function getGame(id) {
    const query = 'SELECT * FROM game WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

async function addGame(gameDetails) {
    const selectedDeveloper = gameDetails.developer;
    const developerID = await getDeveloperID(selectedDeveloper);

    const query_game = 'INSERT INTO game (name, developer_id, price, description) VALUES ($1, $2, $3, $4)';
    await pool.query(query_game, [gameDetails.name, developerID, gameDetails.price, gameDetails.description]);

    const query_game_id = 'SELECT game_id FROM game WHERE name = $1';
    const { rows } = await pool.query(query_game_id, [gameDetails.name]);
    const game_id = rows[0].game_id;

    const query_genre = 'INSERT INTO genre (game_id, genre) VALUES ($1, $2)';
    gameDetails.genres.forEach(async genre => {
        await pool.query(query_genre, [game_id, genre]);
    });
}

async function updateGame(id, gameDetails) {
    const selectedDeveloper = gameDetails.developer;
    const developerID = await getDeveloperID(selectedDeveloper);
    const query = 'UPDATE game SET name = $2, developer_id = $3, price = $4, description = $5 WHERE id = $1';
    await pool.query(query, [id, gameDetails.name, developerID, gameDetails.price, gameDetails.description]);
}

async function deleteGame(id) {
    const query = 'DELETE FROM game WHERE id = $1';
    await pool.query(query, [id]);
}

async function getAllGenres() {
    const query = 'SELECT DISTINCT genre FROM genre';
    const { rows } = await pool.query(query);
    return rows;
}

async function getAllDevelopers() {
    const query = 'SELECT * FROM developer';
    const { rows } = await pool.query(query);
    return rows;
}

async function getDeveloper(id) {
    const query = 'SELECT * FROM developer WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

async function getDeveloperID(name) {
    const query = 'SELECT developer_id FROM developer WHERE name = $1';
    const { rows } = await pool.query(query, [name]);
    return rows[0].developer_id;
}

async function addDeveloper(developerDetails) {
    const query = 'INSERT INTO developer (name, founded, location) VALUES ($1, $2, $3)';
    await pool.query(query, [developerDetails.name, developerDetails.founded, developerDetails.location]);
}

async function updateDeveloper(id, developerDetails) {
    const query = 'UPDATE developer SET name = $2, founded = $3, location = $4 WHERE id = $1';
    await pool.query(query, [id, developerDetails.name, developerDetails.founded, developerDetails.location]);
}

async function deleteDeveloper(id) {
    const query = 'DELETE FROM developer WHERE id = $1';
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