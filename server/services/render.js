
const axios = require('axios');


// LOGIN
exports.loginP = (req, res) =>{
    res.render('login');
}
// CLASES
exports.las_clases = (req, res) =>{
        // Make a get request to /api/clases
        axios.get('http://localhost:3000/api/clases')
        .then(function(response){
            res.render('clases', { cl : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
   
}

exports.add_clases = (req, res) =>{
    res.render('add_clases');
}

exports.update_clases = (req, res) =>{
    axios.get('http://localhost:3000/api/clases', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_clases", { clase : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}


////////////////////////////////////////////////////////////////////////////
// USUARIOS
exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}


exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}



////////////////////////////////////////////////////////////
// LAS PARTES PRINCIPALES
exports.menu = (req, res) =>{
    res.render('menu_principal');
}

exports.about = (req, res) =>{
    res.render('about');
}

exports.estudio = (req, res) =>{
        // Make a get request to /api/clases
        axios.get('http://localhost:3000/api/clases')
        .then(function(response){
            res.render('estudio', { cl : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
   
}
