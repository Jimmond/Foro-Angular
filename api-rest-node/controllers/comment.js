'use strict'

var controller ={
    add: function(req, res){
        return res.status(200).send({
            message: "Metodo de anadir comentario"
        });
    },
    update: function(req, res){
        return res.status(200).send({
            message: "Metodo de editar comentario"
        });
    },
    delete: function(req, res){
        return res.status(200).send({
            message: "Metodo de eliminar comentario"
        });
    }
}