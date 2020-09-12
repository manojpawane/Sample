const { findByIdAndUpdate, findOneAndUpdate } = require('../model/recipe.model.js')
const Recipe = require('../model/recipe.model.js')


exports.createRecipe = async function (req, res) {
    
    var recipeExists = await Recipe.findOne({
        name: req.body.name
    })
    if (recipeExists) {
        res.status(400).send({
            message: 'Recipe Name already exists, please try with different name. '
        })
    }
    else {
    
        var imageUrl ='file:///E:/Projects/Sample/' + req.file.path 
        console.log(imageUrl);
        let recipe = new Recipe({
          name: req.body.name,
          imageUrl :imageUrl,
          description: req.body.description,
          calories: req.body.calories,
          ingredient: req.body.ingredient              
        })
        
        let recipeCreated = await Recipe.create(recipe)
        res.status(200).send(recipeCreated)
    }
}


exports.update = async function (req, res) {
    var recipeExists = await Recipe.findOne({
        _id: { $not: req.params.id },
        name: req.body.name
    })
    if (recipeExists) {
        res.status(400).send({
            message: 'Recipe Name already exists, please try with another name..'
        })
    }
    else {
        var updatedRecipe = await findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updatedRecipe);
    }
}

exports.get = async function (req, res) {
    var allRecipe = await Recipe.find();
    res.send(allRecipe)
}

exports.delete = async function (req, res) {
    await Recipe.findByIdAndDelete(req.params.id)
}



