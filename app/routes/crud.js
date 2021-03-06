const facade = require('facade/facade');

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const recipe = require('controllers/api/recipe');
const rating = require('controllers/api/rating');
const list = require('controllers/api/list');
const discussion = require('controllers/api/discussion');

const fieldChecker = require('middleware/fieldChecker');

router.param('recipeId', function(req, res, next, id) {
    facade.recipeDetail({_id: id});
    req.recipeId = id;
    return next();
});

router.get('/recipes/:recipeId', recipe.detail);
router.get('/recipes', recipe.list);
router.get('/list/:name', list.listOut);
router.get('/recipes/:recipeId/discussion', discussion.list);
router.delete('/recipes/:recipeId/discussion/:commId', discussion.remove);
router.delete('/recipes/:recipeId', recipe.delete);
router.delete('/recipes', facade.recipePurge);
router.delete('/list/:name/:item', list.removeItem);
router.delete('/list/:name', list.removeList);
router.put('/recipes/:recipeId', recipe.update);
router.post('/recipes/:recipeId/discussion', discussion.add);
router.post('/recipes', fieldChecker.bodyMandatory(['name', 'description']), recipe.create);
router.post('/recipes/:recipeId/ratings', fieldChecker.bodyMandatory(['score']), rating.create);
router.post('/list/:name', list.addItem);

module.exports = router;
