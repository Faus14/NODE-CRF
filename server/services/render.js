const axios = require('axios');
// Cambia 'localhost' por el nombre del servicio de Node.js definido en docker-compose.yml
const serverBaseUrl = 'http://nodejs-app:3000';

// LOGIN
exports.loginP = (req, res) => {
    res.render('login');
}

// CLASES
exports.las_clases = (req, res) => {
    // Realizar una solicitud GET al servicio de Node.js
    axios.get(`${serverBaseUrl}/api/clases`)
        .then(response => {
            res.render('clases', { cl: response.data });
        })
        .catch(err => {
            console.error(err.message);
            res.send(err);
        });
}

exports.add_clases = (req, res) => {
    res.render('add_clases');
}

exports.update_clases = (req, res) => {
    axios.get(`${serverBaseUrl}/api/clases`, { params: { id: req.query.id } })
        .then(userdata => {
            res.render("update_clases", { clase: userdata.data })
        })
        .catch(err => {
            console.error(err.message);
            res.send(err);
        });
}

// USUARIOS
exports.homeRoutes = (req, res) => {
    axios.get(`${serverBaseUrl}/api/users`)
        .then(response => {
            res.render('index', { users: response.data });
        })
        .catch(err => {
            console.error(err.message);
            res.send(err);
        });
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get(`${serverBaseUrl}/api/users`, { params: { id: req.query.id } })
        .then(userdata => {
            res.render("update_user", { user: userdata.data })
        })
        .catch(err => {
            console.error(err.message);
            res.send(err);
        });
}

// LAS PARTES PRINCIPALES
exports.menu = (req, res) => {
    res.render('menu_principal');
}

exports.about = (req, res) => {
    res.render('about');
}

exports.estudio = (req, res) => {
    // Realizar una solicitud GET a /api/clases
    axios.get(`${serverBaseUrl}/api/clases`)
        .then(response => {
            res.render('estudio', { cl: response.data });
        })
        .catch(err => {
            console.error(err.message);
            res.send(err);
        });
}
