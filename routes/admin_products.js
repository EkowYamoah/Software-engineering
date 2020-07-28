const express = require('express');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');
const expressValidator = require('express-validator');
const {check , validationResult } =require('express-validator');

const router = express.Router();

//Get Product model
const Product = require('../models/product');

//Get category model
const Category = require('../models/category');


/* 
*GET product index
*/

router.get('/', function(req,res){
    var count;

    Product.countDocuments(
        
        
        function(err, c){
        count = c;
    });

    Product.find(function(err, products){
        res.render('admin/products', {
            products: products,
            count: count
        });
    });
});

/* 
*GET add product
*/

router.get('/add-product', function(req,res){
    var title = "";
    var desc = "";    
    var price = "";
 
Category.find(function (err, categories){
    res.render('admin/add_product', {
        title: title,                 
        desc : desc,   
        categories : categories, 
        price : price
        
    });

});

});
    


/* 
* POST add product
*/

router.post('/add-product', function(req, res){
    var imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : "";
    [

    check('image', 'Please upload an image').not().isEmpty,
    check('title', 'Title must not be empty').not().isEmpty(),
    check('desc', 'Description must not be empty').not().isEmpty(),
    check('price', 'Price must have a value').isDecimal(),
]
 
   
   
    if(!req.files){ imageFile =""; }
     if(req.files){
    // var imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : "";
    //
   }
 

   var title = req.body.title;
   var slug = title.replace(/\s+/g, '-').toLowerCase();
   var desc = req.body.desc;
   var price = req.body.price;
   var category = req.body.category;


   
   

   
    const result= validationResult(req);
    var errors = result.errors;
        
  if (errors) {
    Category.find(function (err, categories){
        res.render('admin/add_product', {
            errors: errors,
            title: title,                 
            desc : desc,   
            categories : categories, 
            price : price
        });
  
    });
 
    } else{
        Product.findOne({slug:slug}, function(err,product){
            if(product){
                req.flash('danger', 'Product title  exists, choose another');
                Category.find(function (err, categories){
                    res.render('admin/add_product', {
                        
                        title: title,                 
                        desc : desc,   
                        categories : categories, 
                        price : price
                    });
                        });
                    } else {
                        var price2 = parseFloat(price).toFixed(2);

                        var product = new Product({
                            title: title,
                            slug: slug,
                            desc: desc,
                            category : category, 
                            price : price2,
                            image: imageFile
        });

        product.save(function (err){
            if(err)
            return console.log(err);

            mkdirp('public/product_images/'+ product._id, function (err){
                return console.log(err);
            });

            mkdirp('public/product_images/'+ product._id/gallery, function (err){
                return console.log(err);
            });
            
            mkdirp('public/product_images/'+ product._id/gallery/thumbs, function (err){
                return console.log(err);
            });

           
            if(imageFile !=""){
                var productImage  = req.files.image;
                var path = 'public/product_image/'+ product._id + '/' + imageFile;

                productImage.mv(path, function (err){
                    return console.log(err);
                });
            }

            req.flash('success', 'Product added!!');
            res.redirect('/admin/products');
        });
     }
    });
}    
    
 });





  /*
*GET Edit products
*/

router.get('/edit-product/:id', function(req,res){

    var errors;
    if(req.session.errors)errors = req.session.errors;
    req.session.errors = null;

    Category.find(function (err, categories){

        product.findById(req.params.id, function(err,p){
            if(err){
                console.log(err);
                res.redirect('/admin/products');
            }else {
                var galleryDir = 'public/product_image/'+p._id+ ' gallery';
                var galleryImages = null;

                fs.readdir(galleryDir, function(err, files){
                    if (err){
                        console.log(err);

                    }else{
                        galleryImages = files;

                        res.render('admin/edit_product', {
                            title: p.title,  
                            errors: errors,               
                            desc : p.desc,   
                            categories : categories, 
                            category: p.categoryreplace(/\s+/g, '-').toLowerCase(),
                            price : parseFloat(p.price).toFixed(2),
                            image: p.image,
                            galleryImages: galleryImages,
                            id: p_id

                            
                        });
                    }
                });
            }
        });

        
    
    });
    
 
});         

 /* 
* POST edit product
*/

router.post('/edit-product/:id',function(req,res,next){[
  
  check('title', 'Title must not be empty').not().isEmpty(),
  check('desc', 'Description must not be empty').not().isEmpty(),
  check('price', 'Price must have a value').isDecimal(),
  // check('image', 'Image not uploaded!!').isImage(imageFile),
]

 
 
  if(!req.files){ imageFile =""; }
   if(req.files){
  var imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : "";
  //
 }


 var title = req.body.title;
 var slug = title.replace(/\s+/g, '-').toLowerCase();
 var desc = req.body.desc;
 var price = req.body.price;
 var category = req.body.category;
 var pimage = req.body.pimage;
 var id = req.params.id;

 
 

 
  const result= validationResult(req);
  var errors = result.errors;  
        
        if(errors){
            req.session.errors = errors;
            res.redirect('/admin/products/edit-product/'+id);
        }else{
            Product.findOne({slug: slug, _id:{'$ne':id}}, function(err, p){
                    if(err)
                    console.log(err);

                    if(p){
                        req.flash('danger','Product title exists choose another.');
                        res.redirect('/admin/products/edit-product'+id);
                    }else{
                        Product.findById(id, function (err,p){
                            if(err)
                                console.log(err);

                                p.title = title;
                                p.slug = slug;
                                p.desc = desc;
                                p.price = parseFloat(price).toFixed(2);
                                p.category = category;
                                if(imageFile !=""){
                                    p.image = imageFile;
                                }
                                p.save(function(err){
                                    if(err)
                                        console.log(err);

                                    if(imageFile != ""){
                                        if(pimage !=""){
                                            fs.remove('public/product_images/'+ id+ '/'+ pimage, function(err){
                                                if(err)
                                                    console.log(err);
                                            });

                                        }

                                        var productImage = req.files.image;
                                        var path  = 'public/product_images/'+ id +'/'+ imageFile;

                                        productImage.mv(path, function(err){
                                            return console.log(err);
                                        });
                                    }
                                    req.flash('success', 'Product modified!');
                                    res.redirect('/admin/products/edit-product/'+id);

                                });
                        });
                    }
            });
        }



 });

  /* 
*POST product gallery
*/

router.get('/product-gallery/:id', function(req,res){
   var productImage = req.files.file;
   var id = req.params.id;
   var path = 'public/product_images/'+ id + '/gallery' + req.files.file.name;
   var thumbsPath = 'public/product_images/'+ id + '/gallery/thumbs/' + req.files.file.name;


   productImage.mv(path, function(err){
       if(err)
       console.log(err);

       resizeImg(fs.readFileSync(path), {width: 100, height: 100}).then (function(buf){
           fs.writeFileSync(thumbsPath, buf);
       })
    });
    res.sendStatus(200);
}); 


  /* 
*GET Delete image
*/

router.get('/delete-image/:image', function(req,res){
    var originalImage = 'public/product_images/'+ re.query.id + '/gallery' + req.params.image;
    var thumbPath = 'public/product_images/'+ re.query.id + '/gallery/thumbs/' + req.params.image
 
    fs.remove(originalImage, function(err){
        if(err) {
        console.log(err);
        } else {
            fs.remove(thumbPath, function(err){
                if(err){
                    console.log(err);
                }else{
                    req.flash('success', 'Image Deleted');
                    res.redirect('/admin/products/edit-product/'+req.query.id);
                }
            })
        }
    });
}); 

  /* 
*GET Delete Product
*/

router.get('/delete-product/:id', function(req,res){
    var id =req.params.id;
    var path = 'public/product_images/'+ id;
   
    fs.remove(path, function(err){
        if(err){
            console.log(err);
        }else{
            Product.findByIdAndRemove(id, function(err){
                console.log(err);
            });
            req.flash('success', 'Product deleted');
            res.redirect('/admin/products/');
        }
    });

}); 
//Exports
module.exports = router;