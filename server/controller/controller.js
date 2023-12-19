var Userdb = require('../model/model');
var clases_pdf = require('../model/modelClases');

/////////////////////////////////////////////
//LOGIN
exports.login = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).send({ message: "Debe ingresar nombre y email" });
        return;
    }

    try {
        const personByName = await Userdb.findOne({ name });
        const personByEmail = await Userdb.findOne({ email });

        if (personByName && personByEmail) {

            res.redirect('/home');
        } else if (personByName) {
            res.redirect('/home');
          //  res.redirect('/');
        } else if (personByEmail) {
            res.redirect('/home');
          //  res.redirect('/');
        } else {
            res.redirect('/home');
         //   res.redirect('/');
        }
    } catch (error) {
        console.error("error durante el login", error);
        res.status(500).send({ message: "Internal server error" });
    }
};





//////////////////////////////////////////////////////////////////////////////////////////
// USUARIOS
exports.createUser = (req,res)=>{

    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }


    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    user
        .save(user)
        .then(data => {

            res.redirect('/home');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


exports.findUser = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


exports.updateUser = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


exports.deleteUser = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASES
exports.findClases = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        clases_pdf.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id })
            })

    } else {
        clases_pdf.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}



exports.createClases = async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).send({ message: "No se ha proporcionado ningún archivo PDF." });
        return;
      }
  
      const { nombre, descripcion, fecha } = req.body;
  
      if (!nombre || !descripcion || !fecha) {
        res.status(400).send({ message: "Todos los campos son obligatorios." });
        return;
      }
  
      const newClase = new clases_pdf({
        nombre,
        descripcion,
        fecha,
        archivoPath: req.file.path // Guarda la ruta del PDF en la base de datos
      });
  
      await newClase.save();
  
      res.redirect('/clases'); // Redirige a la página de clases después de subir el PDF
    } catch (error) {
      console.error("Error durante la subida del PDF", error);
      res.status(500).send({ message: "Error interno del servidor al subir el PDF." });
    }
  };


  
  exports.deleteClases = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await clases_pdf.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Clase no encontrada');
        }

        res.status(200).send('Clase eliminada exitosamente');
    } catch (error) {
        console.error('Error al eliminar la clase', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.updateClases = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    clases_pdf.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}



///////////////////////////////////////////////////////////////////////////////////////////////
// Descargar el PDF
  exports.descargarPDF = async (req, res) => {
    const pdfId = req.params.pdfId;

    try {
        const clasePdf = await clases_pdf.findById(pdfId);
        if (!clasePdf) {
            return res.status(404).send('PDF no encontrado');
        }

        const pdfPath = clasePdf.archivoPath;

        // Envia el archivo como respuesta
        res.download(pdfPath, 'nombre_archivo.pdf', (err) => {
            if (err) {
                console.error('Error al descargar el PDF', err);
                res.status(500).send('Error al descargar el PDF');
            }
        });
    } catch (error) {
        console.error('Error al obtener la ruta del PDF desde la base de datos', error);
        res.status(500).send('Error interno del servidor');
    }
};

