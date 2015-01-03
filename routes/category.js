/*
 * Category
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Antonio López Martínez
 *
 * */

var Category = require('../models/category.js');

/*
 * Find and retrieves all categories
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * */
exports.findAll = function(req, res)
{
  console.log("GET - /categories");
  return Category.find(function(err, categories)
      {
        if(!err)
        {
          return res.send(categories);
        }
        else 
        {
          res.statusCode = 500;
          console.log('Internal error (%d): %s', res.statusCode, err.message);
          return res.send({error: 'Server error'});
        }
      }    
  );
}

/*
 * Find and retrieves the categories by their name or description
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * */
exports.findByName = function(req, res)
{
  console.log("GET - /category/:name");
  var regExpression = new RegExp(req.params.name, 'i');

  return Category.find({ $or:[{name : regExpression}, {description: regExpression}]}, function(err, categories) 
      {
        if(!err)
        {
          console.log(req.params.name);
          return res.send(categories);
        }
        else
        {
          res.statusCode = 500;
          console.log('Internal error (%d): %s', res.statusCode, err.message);
          return res.send({error: 'Server error'});
        }
      }
  );
}

/*
 * Find and retrieves a single category by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * */
exports.findById = function(req, res)
{
  console.log("GET - /category/:id");
  return Category.findById(req.params.id, function(err, category) 
      {
        if(!category)
        {
          res.statusCode = 404;
          return res.send({error: 'Not found'});
        }

        if(!err)
        {
          return res.send({status: 'OK', category:category});
        }
        else
        {
          res.statusCode = 500;
          console.log('Internal error (%d): %s', res.statusCode, err.message);
          return res.send({error: 'Server error'});
        }
      }
  );
}

/*
 * Creates a new category from the data request
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * */
exports.add = function(req, res)
{
  console.log('POST - /category -');
  var category = new Category(
       {
         name        : req.body.name,
         description : req.body.description
       }
   );

   category.save(function(err)
       {
          if(err)
          {
            console.log('Error while saving category: ' + err);
            res.send({error:err});
          }
          else
          {
            console.log("Category created");
            return res.send({status: 'OK', category:category});
          }
       }
   );
}
  
/*
 * Update a category by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * */
exports.update = function(req, res)
{
  console.log("PUT - /category/:id");
  return Category.findById(req.params.id, function(err, category)
      {
        if(!category)
        {
          res.statusCode = 404;
          return res.send({error: 'Not found'});
        }
        
        category.modified = new Date();
        
        if(req.body.name != null) 
        {
          category.name = req.body.name;
        }

        if(req.body.description != null) 
        {
          category.description = req.body.description;   
        } 
        
        return category.save(function(err)
        {
          if(!err)
          {
            console.log("Updated");
            return res.send({status: 'OK', category:category});
          }
          else
          {
            if(err.name == 'ValidationError')
            {
              res.statusCode = 400;
              res.send({error: 'Validation error'});
            }
            else
            {
              res.statusCode = 500;
              res.send({error: 'Server error'});
            }

            console.log("Internal error(%d): %s", res.statusCode, err.message);
          }

          res.send(category);
        } 
          
       );
      
      }
  
  );
}

/*
 * Deletes a category by its ID
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 * */
exports.remove = function(req, res)
{
  console.log("DELETE - /category/:id");
  return Category.findById(req.params.id, function(err, category)
      {
        if(!category)
        {
          res.statusCode = 404;
          return res.send({error: 'Not found'});
        }

        return category.remove(function(err)
          {
            if(!err)
            {
              console.log('Removed category');
              return res.send({status: 'OK'});
            }
            else
            {
              res.statusCode = 500;
              console.log('Internal error(%d): %s', res.statusCode, err.message);
              return send.send({error: 'Server error'});
            }
          }  
        );
      }
  );
}
