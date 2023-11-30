const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')


// all authors route
router.get('/',async(req,res)=>{

    let searchoption = {}
    if(req.query.name!= null&& req.query.name!=''){
        searchoption.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searchoption)
        res.render('authors/index',{
            authors: authors,
            searchoption:req.query
        })
    }
    catch{
      res.redirect('/')
    }
})

//new author route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new Author()})
})

//create author router
router.post('/', async (req,res)=>{

    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor= await author.save()
       res.redirect(`authors`)
    //    res.redirect(`authors/${newAuthor.id}`)
    }
    catch{
        res.render('authors/new',{
            author: author,
            errormessage:'Error Creating Author...'})
    }
   

})

module.exports = router 

fjldjfsdl