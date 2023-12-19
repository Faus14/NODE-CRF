const mongoose = require('mongoose');


//CLASES
const pdfSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    fecha: Date,
    archivoPath: String, 
  });
  
  
  const clases_pdf = mongoose.model('clases_pdf', pdfSchema);
  
  module.exports = clases_pdf;
  