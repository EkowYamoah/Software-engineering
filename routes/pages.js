const express = require('express');

const router = express.Router();

// GET Page model
var Page = require('../models/page');


/* GET
*
*/
router.get('/', function(req,res){
    Page.findOne({slug: 'home'}, function (err,page){
        if(err)
            console.log(err);
        
  
    res.render('index',{
        title: page.title,
        content: page.content
    });

});

});

/*
/ GET a Page
*/

router.get('/:slug', function(req,res){

    var slug = req.params.slug;
    
        Page.findOne({slug: slug}, function (err,page){
        if(err)
            console.log(err);
        
        if(!page){
            res.redirect('/');
        } else {
    res.render('index',{
        title: page.title,
        content: page.content
    });
}
});

});

//exports
module.exports = router;