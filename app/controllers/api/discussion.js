const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

exports.list = (req, res, next) => {
  Recipe.findById(req.params.recipeId, (err, doc)=>{
    if(doc == null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested recipe not found"};
      return next();
    }
    else{
      res.out = doc.discussion;
      return next();
    }
  });
};

exports.add = (req, res, next) => {
  Recipe.findById(req.params.recipeId, (err, doc)=>{
    if(doc == null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested recipe not found"};
      return next();
    }
    else{
      if(typeof req.body.nick === 'string' && typeof req.body.comment === 'string'){
        const post = {
          nick: req.body.nick,
          comment: req.body.comment
        };
        doc.discussion.set(doc.discussion.length, post);
        doc.save();
        res.out = post;
        res.status(200);
        return next();
      }
      else{
        res.status(400);
        res.out = {"status": 400, "description": "Invalid API request"};
        return next();
      }
    }
  });
};

exports.remove = (req, res, next) => {
  Recipe.findById(req.params.recipeId, (err, doc)=>{
    if(doc == null){
      res.status(404);
      res.out = {"status": 404, "description": "Requested recipe not found"};
      return next();
    }
    else{
      if(doc.discussion[req.params.commId] !== undefined){
        doc.discussion.splice(req.params.commId, 1);
        doc.save();
        res.out = {};
        res.status(204);
        return next();
      }
      else{
        res.status(404);
        res.out = {"status": 404, "description": "Comment not found"};
        return next();
      }
    }
  });
};