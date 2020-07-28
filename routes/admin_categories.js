const express = require('express');
const expressValidator = require('express-validator');
const {check , validationResult } =require('express-validator');

const router = express.Router();

//Get Category model
const Category = require('../models/category');



/* 
*GET categories index
*/
router.get('/', function(req,res){
    Category.find(function(err,categories){
        if(err)
            return console.log(err);
        res.render('admin/categories', {
            categories:categories
        });
    });
});

/* 
*GET add category
*/

router.get('/add-category', function(req,res){
    var title = "";
     

        res.render('admin/add_category', {
            title: title,
           
        });

});


/* 
* POST add category  
*/

router.post('/add-category',[
    check('title', 'Title must not be empty').not().isEmpty(),
   
], function(req, res, next){
    var title = req.body.title;
   
   var slug = title.replace(/\s+/g, '-').toLowerCase();


   
    
    const result= validationResult(req);
    var errors = result.errors;

  
  if (!result.isEmpty()) {
        res.render('admin/add_category', {
          errors: errors,
          title: title,
          
    });
  

 
    } else{
        Category.findOne({slug:slug}, function(err,category){
            if(category){
                req.flash('danger', 'Category title exists, choose another');
                res.render('admin/add_category',{
                    title:title,
                });
                    } else {
                        var category = new Category({
                            title: title,
                            slug:slug
                            
                        });

                        
        category.save(function (err){
            if(err)
            return console.log(err);

            req.flash('success', 'Category added!!');
            res.redirect('/admin/categories');
        });
     }
    });
}    
    
 });




  /* 
*GET Edit category
*/

router.get('/edit-category/:id', function(req,res){
    Category.findById(req.params.id, function(err, category){
            if(err) 
                return console.log(err);

                Category.find(function(err, categories){
                    if(err){
                        console.log(err);
                    }else{
                       req.app.locals.categories = categories;
                    }
                });

            res.render('admin/edit_category', {
                title:category.title,
                id: category._id

            });
    });    

});         

 /* 
* POST edit Category
*/

router.post('/edit-category/:id',[
    check('title', 'Title must not be empty').not().isEmpty(),
    
], function(req, res, next){
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;
   
    
    const result= validationResult(req);
    var errors = result.errors;

  
  if (!result.isEmpty()) {
        res.render('admin/edit_category', {
          errors: errors,
          title: title,   
          id: id
    });
  

 
    } else{
        Category.findOne({slug:slug, _id:{'$ne':id}}, function(err,category){
            if(category){
                req.flash('danger', 'Category title exists, choose another');
                res.render('admin/edit_category',{
                    title:title,                                    
                    id: id
        });
            } else {
                Category.findById(id, function(err, category){
                    if(err)
                        return console.log(err);
                        category.title = title;
                        category.slug = slug;
                        

                        category.save(function (err){
                            if(err)
                            return console.log(err);
                
                            Category.find(function(err, categories){
                                if(err){
                                    console.log(err);
                                }else{
                                    req.app.locals.categories = categories;
                                }
                            });

                    req.flash('success', 'Category modified!!');
                    res.redirect('/admin/categories/edit-category/'+id);
                });
        })

        
     }
    });
}    
    
 });

  /* 
*GET Delete category
*/

router.get('/delete-category/:id', function(req,res){
    Category.findByIdAndRemove(req.params.id, function(err){
        if(err) 
        return console.log(err);

        Category.find(function(err, categories){
            if(err){
                console.log(err);
            }else{
                req.app.locals.categories = categories;
            }
        });

        req.flash('success', 'Category deleted!!');
        res.redirect('/admin/categories/');
    }); 
   

}); 
//Exports
module.exports = router;