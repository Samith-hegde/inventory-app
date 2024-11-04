const { Router } = require('express');
const developerController = require('../controllers/developerController');

const developerRouter = Router();

developerRouter.get('/', developerController.getAllDevelopers);
developerRouter.get('/add', developerController.getAddDeveloper);
developerRouter.get('/edit/:id', developerController.getEditDeveloper);
developerRouter.post('/edit/:id', developerController.postEditDeveloper);
developerRouter.post('/add', developerController.postAddDeveloper);
developerRouter.post('/delete/:id', developerController.postDeleteDeveloper);

module.exports = developerRouter;