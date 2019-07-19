const express = require('express');
const app = express();
const server = app.listen(9000);
const io = require('socket.io')(server);
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
const flash = require('express-flash')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/product', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(express.static( __dirname + '/public/dist/public' ));
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Over 9000!",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000
    }
}))

//===================================================================
// Schemas
//===================================================================
var ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
        minlength: [2, 'Name must be 2 characters long'],
    },
    content: {
        type: String,
        required: [true, 'Content required'],
        minlength: [2, 'Content must be 2 characters long'],
    },
    
}, {
    timestamps: true
})


var ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
        minlength: [2, 'Title must be 2 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Price required'],
        
    },
    url: {
        type: String,
        required: [true, 'Url required'],
        
    },
    review: [ReviewSchema]
}, {
    timestamps: true
})
mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');
mongoose.model('Review', ReviewSchema);
var Review = mongoose.model('Review');

//===================================================================
// Route to show all
//===================================================================


app.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: products
            })
        }
    })
})

//===================================================================
// Route to show by id
//===================================================================

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: products
            })
        }
    })
})

//===================================================================
// Route to add 
//===================================================================

app.post('/new', (req, res) => {
    Product.create(req.body, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success",
                data: products
            })
        }
    })
})

//===================================================================
// Route to edit
//===================================================================

app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    }, (err, products) => {
        if (err) {
            console.log("Returned error", err);
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success",
                data: products
            })
        }
    })
})

//===================================================================
// Route to delete 
//===================================================================

app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({
                message: "Error",
                error: err
            })
        } else {
            // respond with JSON
            res.json({
                message: "Success"
            })
        }
    })
})

//===================================================================
// 404 re-routing 
//===================================================================

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });