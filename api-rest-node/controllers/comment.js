'use strict'

var validator = require('validator');
var Topic = require('../models/topic');

var controller ={
    add: function(req, res){

        // Recoger el id del topic de la url
        var topicId = req.params.topicId;
        // Find id del topic 
        Topic.findById(topicId).exec((err, topic)=>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error en la peticion'
                });
            }
            if (!topic) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No existe el tema'
                }); 
            }
            // Comprobar objeto usuario y validar datos
            if (req.body.content) {
                //validar datos
                try {
                    var validate_content = !validator.isEmpty(req.body.content); 
                 } catch(err) {
                     return res.status(200).send({
                         message: 'No has comentado nada'
                     });
                 }
                 if (validate_content) {

                    var comment = {
                        user: req.user.sub,
                        content: req.body.content
                    }
                        // En la propiedad comments del objeto resultante hacer un push
                        topic.comments.push(comment);
                        // Guardar el topic completo
                        topic.save((err)=>{
                            if(err){
                                return res.status(500).send({
                                    status: 'Error',
                                    message: 'Error al guardar comentario'
                                });
                            }
    
                        // Devolver respuesta
                        return res.status(200).send({
                            status: 'success',
                            topic
                        });
                    });
                 }else{
                    return res.status(200).send({
                        message: 'No se han validado los datos del comentario'
                    });
                 }
            } 
        });
    },
    update: function(req, res){
        
        // Conseguir id de comentario0 que llega de la url
        var commentId = req.params.commentId;
        // Recoger datos y validar
        var params = req.body;
        //validar datos
        try {
            var validate_content = !validator.isEmpty(params.content); 

         } catch(err) {
             return res.status(200).send({
                 message: 'No has comentado nada'
             });
         }
         if (validate_content) {
            // Find and update de subdocumento
            Topic.findOneAndUpdate(
                {"comments._id": commentId},
                {
                    "$set":{
                        "comments.$.content":params.content
                    }
                },
                {new:true},
                (err, topicUpdated)=>{
                    if(err){
                        return res.status(500).send({
                            status: 'Error',
                            message: 'Error en la peticion'
                        });
                    }
                    if (!topicUpdated) {
                        return res.status(404).send({
                            status: 'Error',
                            message: 'No existe el tema'
                        }); 
                    }
                    // Devolver datos
                    return res.status(200).send({
                        status: "success",
                        topic: topicUpdated
                    });
                });
         }
    },
    delete: function(req, res){

        // Sacar el id del topic y del comentario a borrar
        var topicId = req.params.topicId;
        var commentId = req.params.commentId;
        // buscar el topic
        Topic.findById(topicId, (err, topic)=>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error en la peticion'
                });
            }
            if (!topic) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No existe el tema'
                }); 
            }
            // Seleccionar el subdocumento (comentario)
            var comment = topic.comments.id(commentId);
            // Borrar el comentario
            if (comment) {
                comment.remove();
                // Guardar el topic
                topic.save((err)=>{
                    if(err){
                        return res.status(500).send({
                            status: 'Error',
                            message: 'Error en la peticion'
                        });
                    }
                    // Devolver un resultado 
                    return res.status(200).send({
                        status: 'success',
                        topic
                    });
                });
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el comentario'
                })
            }
        });
    }
};
module.exports = controller;