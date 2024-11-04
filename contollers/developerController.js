const db = require('../models/queries');

async function getAllDevelopers(req, res) {
    const developers = await db.getAllDevelopers();
    res.render('developers', { title: 'Developers', developers });
}

async function getAddDeveloper(req, res) {
    res.render('developersForm', { title: 'Add Developer', edit: false, developer: {} });
}

async function postAddDeveloper(req, res) {
    const developerDetails = req.body;
    await db.addDeveloper(developerDetails);
    res.redirect('/developers');
}

async function getEditDeveloper(req, res) {
    const id = req.params.id;
    const developer = await db.getDeveloper(id);
    res.render('developersForm', { title: 'Edit Developer', edit: true, developer });
}

async function postEditDeveloper(req, res) {
    const id = req.params.id;
    const developerDetails = req.body;
    await db.updateDeveloper(id, developerDetails);
    res.redirect('/developers');
}

async function postDeleteDeveloper(req, res) {
    const id = req.params.id;
    await db.deleteDeveloper(id);
    res.redirect('/developers');
}

module.exports = {
    getAllDevelopers,
    getAddDeveloper,
    postAddDeveloper,
    getEditDeveloper,
    postEditDeveloper,
    postDeleteDeveloper
}