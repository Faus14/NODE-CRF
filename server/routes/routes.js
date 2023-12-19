const express = require('express');
const route = express.Router()

//llamo a los render y controladores
const services = require('../services/render');
const controller = require('../controller/controller');

//configuracion para subir PDF A LA CARPETA
////////////////////////////////////////////////////////////////
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf');
  }
});
const upload = multer({ storage: storage });
////////////////////////////////////////////////////////////////
route.get('/', services.menu);
//GET LOGIN
route.get('/login', services.loginP);
//API LOGIN
route.post('/api/login', controller.login);

////////////////////////////////////////////////////////////////////

// GET USER
route.get('/home', services.homeRoutes);
route.get('/add-user', services.add_user)
route.get('/update-user', services.update_user)

// API USUARIOS
route.post('/api/users', controller.createUser);
route.get('/api/users', controller.findUser);
route.put('/api/users/:id', controller.updateUser);
route.delete('/api/users/:id', controller.deleteUser);

////////////////////////////////////////////////////////////////////

//CLASES
//GET CLASES
route.get('/clases', services.las_clases)
route.get('/add-clases', services.add_clases)
route.get('/update-clases', services.update_clases)

//API CLASES
route.post('/subir', upload.single('pdfFile'), controller.createClases);
route.get('/api/clases', controller.findClases);
route.delete('/api/clases/:id', controller.deleteClases);
route.put('/api/clases/:id', controller.updateClases);
//Descargar PDF
route.get('/download/:pdfId', controller.descargarPDF);

////////////////////////////////////////////////////////////
// LAS PARTES PRINCIPALES
route.get('/about', services.about)
route.get('/estudio', services.estudio)


module.exports=route;