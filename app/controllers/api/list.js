const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const List = require('models/mongo/list');

exports.listOut = (req, res, next) => {
  List.findOne({name: req.params.name}, (err, doc)=>{
    if(doc === null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested list not found"};
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

exports.removeList = (req, res, next) => {
  List.findOneAndRemove({name: req.params.name}, (err, doc)=>{
    if(doc === null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested list not found"};
    }
    else{
      res.out = {};
      res.status(204);
    }
    return next();
  });
};

exports.addItem = (req, res, next) => {
  Recipe.findById(req.body.recipe, (err, recDoc)=>{
    if(recDoc == null){
      res.status(404);
      res.out = {"status": 404, "description": "Recipe not found"};
      return next();
    }
    else{
      List.findOne({name: req.params.name}, (err, lisDoc)=>{
        if(lisDoc === null){
          const newList = new List({
            name: req.params.name,
            recipes: [req.body.recipe]
          });
          newList.save();
        }
        else{
          if(!lisDoc.recipes.includes(req.body.recipe)){
            lisDoc.recipes.set(lisDoc.recipes.length, req.body.recipe);
            lisDoc.save();
          }
          else{
            res.out = {"status": 409, "description": "Recipe already in the list"};
            res.status(409);
            return next();
          }
        }
        res.out = {};
        res.status(204);
        return next();
      });
    }
  });
};

exports.removeItem = (req, res, next) => {
  List.findOne({name: req.params.name}, (err, doc)=>{
    if(doc === null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested list not found"};
    }
    else{
      let idx = doc.recipes.indexOf(req.params.item);
      if(idx === -1){
        res.status(404);
        res.out = {"status": 404, "description": "Recipe not found in the list"};
        return next();
      }
      doc.recipes.splice(idx, 1);
      if(doc.recipes.length === 0){
        doc.remove();
      }
      else{
        doc.save();
      }
      res.out = {};
      res.status(204);
    }
    return next();
  });
};