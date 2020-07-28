const express = require('express');

const router = express.Router();
const fs = require('fs-extra');

// GET Product model
var Product = require('../models/product');

// GET Category model
var Category = require('../models/category');
const { fstat } = require('fs-extra');


/* GET all Products
*
*/
router.get('/', function(req,res){
  
   
    Product.find(function (err,products){
        if(err)
            console.log(err);
        
  
    res.render('all_products',{
        title: 'All Products',
        products: products
    });
});

});


/* GET by categories
*
*/
router.get('/:category', function(req,res){

    var categorySlug = req.params.category;

    Category.findOne({slug: categorySlug}, function(err, c){

        Product.find({category: categorySlug},function (err,products){
            if(err)
            console.log(err);

            res.render('cat_products',{
                title: c.title,
                products: products
            });

        });


    });
}); 

/* GET product details
*
*/
router.get('/:category/:product', function(req,res){

    var galleryImage = null;

    Prodyct.findOne({slug: req.params.product}, function(err, product){

        if(err) {
            console.log(err);
        }else {
            var galleryDir = 'public/product_images/'+ product._id + '/gallery';

            fs.readdir(galleryDir, function(err, files){
                if(err){
                    console.log(err);

                }else {
                    galleryImage = false;


                    res.render('product', {
                        title: product.title,
                        p: product,
                        galleryImages: galleryImages
                    });
                }
            });
        }
    });
  
}); 


//exports
module.exports = router;