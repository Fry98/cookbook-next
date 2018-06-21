const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const List = require('models/mongo/list');

exports.listOut = (req, res, next) => {
  List.findOne({name: req.params.name}, (err, doc)=>{
    if(doc === null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested list doesn't exist (lol, it rhymes)"};
      return next();
    }
    else{
      let recipesInList = [];
      for(const recId of doc.recipes){
        recipesInList.push(Recipe.findById(recId).exec());
      }
      Promise.all(recipesInList).then((values)=>{
        res.out = values;
        return next();
      });
    }
  });
}; 

// exports.listOut = (req, res, next) => {
//   req.body.recipe
//   return facade.recipeList().then(recipeList => {
//     res.out = recipeList;
//     return next();
//   }).catch(next);
// };

