const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

const config = require('./config/config').get(process.env.NODE_ENV);
const port = process.env.PORT||3001;

console.log('Mongoose Config', config);
mongoose.Promise = global.Promise;

async function prepareMongooseConnection(){
    await mongoose.connect(config.DATABASE,{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:true})
    .then(()=>console.log(`Connected to Mongo DB Book Shelf's ${config.type}!`))
    .catch((err)=>console.log(`Could not Connect to mongo DB ${err.message}`));
}
prepareMongooseConnection();

const {User} = require('./models/user');
const {Book} = require('./models/book');
const {auth} = require('./middlewares/auth');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));


//For Authentcation and validation for route access is valid for a undergoing user!
app.get('/api/auth',auth, (req, res)=>{
    res.json({
        isAuth:true,
        id: req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname  
    })
});

//Book Routes!
//--------------------------------------------------------------------------------------------------------------
//GET
app.get('/api/book', (req, res)=>{
    let id = req.query.id;
    Book.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
});

app.get('/api/books', (req, res)=>{
    let 
        skip = parseInt(req.query.skip),
        limit = parseInt(req.query.limit),
        orderBy = req.query.order;
    
    Book.find().skip(skip).sort({_id:orderBy}).limit(limit).exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
});

//POST
app.post('/api/book', (req, res)=>{
    const book = new Book(req.body);
    book.save((err, doc)=>{
        if(err) return res.status(400).send(err);
        
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })
});
//UPDATE
app.put('/api/book', (req, res)=>{
    Book.findByIdAndUpdate(req.body._id, req.body, {new :true}, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        });
    });
});

//DELETE
app.delete('/api/book', (req, res)=>{
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    });
});
//--------------------------------------------------------------------------------------------------------------
//User Routes!

//Get User Details!
app.get('/api/reviewer', (req, res)=>{
    let id= req.query.id;
    User.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);

        res.json({
            name:doc.name,
            lastname:doc.lastname,
        });
    });
});

app.get('/api/users', (req, res)=>{
    User.find({}, (err, users)=>{
        if(err) return res.status(400).send(err);
        
        res.status(200).send(users);
    });
});

app.get('/api/user/posts',(req,res)=>{
    Book.find({ownerId: req.query.user}).exec((err, docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs);
    });
});

app.get('/api/user/logout',auth, (req, res)=>{
    //res.send(req.user);
    req.user.deleteToken(req.token, (err, user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

//Post - User Register!
app.post('/api/user/register', (req, res)=>{
    const user = new User(req.body);
    user.save((err,doc)=>{
        if(err) return res.json({registeration:false})
        res.status(200).json({
            registeration:true, 
            user:doc
        });
    });
});
//Post - User Login!
app.post('/api/user/login', (req, res)=>{
    User.findOne({'email':req.body.email},(err, user)=>{
        if(!user) return res.json({isAuth:false, message:'Auth Failed, email not found!'});
        user.comparePassword(req.body.password,(err, isMatch)=>
        {
            if(!isMatch) 
                return res.json({
                    isAuth:false,
                    message:'Wrong Password!'
                });

            user.generateToken((err, userWithToken)=>
            {
                if(err) 
                    return res.status(400).send(err);
                
                res.cookie('auth', user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                });
            });
        });
    });
});
//--------------------------------------------------------------------------------------------------------------

//This is production specific!
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, '../client','build','index.html'));
    });
}

app.listen(port, ()=>{
    console.log(`Server running at the Port ${port}`);
});