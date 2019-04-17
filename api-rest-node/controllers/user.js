'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var jwt = require('../services/jwt');

var controller={
    probando: function(req, res){
        return res.status(200).send({
            message: "Soy el metodo PROBANDO"
        });
    },
    testeando: function(req, res){
        return res.status(200).send({
            message: "Soy el metodo TESTEANDO"
        });
    },

    //Save funcion
    save: function(req, res){
        // Recoger los parametros de la peticion 
        var params = req.body;
        // Validar los datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos"
                 });
        }
        if(validate_name && validate_surname && validate_email && validate_password){
            // Crea objeto de usuario
            var user = new User();

            // Asignar Valores al usuarios
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';
            user.image = null;
            // Comprobar si el usuario existe
            User.findOne({email: user.email}, (err, issetUser)=>{
                if(err){
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario",
                    });
                }if(!issetUser){
                    // si no existe, 

                    // Cifrar contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        // y guardar usuarios
                        user.save((err, userStored) =>{
                            if(err){
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });
                            }
                            if(!userStored){
                                return res.status(400).send({
                                    message: "El usaurio no se ha guardado"
                                });
                            }
                             // Devolver respuesta
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });

                        }); // Close save
                    }); // Close bcrypt

                }else{
                        return res.status(200).send({
                            message: "El usuario ya esta registrado"
                        });
                }
            });
           
        }else{
            return res.status(200).send({
                message: "Validacion de usuarios incorrecta, intente nuevamente",
            });
        }
    },

    //Login funcion open

    login: function(req, res){
        // Recoger los parametros de la peticion
        var params = req.body;
        // Validar los datos
        try {
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos"
                 });
        }
        if(!validate_email || !validate_password){
                return res.status(200).send({
                    message: "Datos erroneos, intenta de nuevo"
                });

            }
            // Buscar usuarios que coincidan con el email
            User.findOne({email: params.email.toLowerCase()}, (err, user)=>{

                if(err){
                    return res.status(500).send({
                        message: "Error al identificarse"
                    });
                }if(!user){
                    return res.status(404).send({
                        message: "El usuario no existe"
                    });

                }
                // Si lo encuentra,
                // Comprobar la contraseña (coincidencia de email y password / bycrypt)
                bcrypt.compare(params.password, user.password, (err, check)=>{
                    // Si es correcto,
                    if(check){
                        // Generar token de jwt y devolverlo (mas tarde)
                        if(params.gettoken){
                             // Devolver los datos
                            return res.status(200).send({
                               token: jwt.createToken(user)
                            });
                        }else{
                            // Limpiar el objeto
                            user.password = undefined;

                            // Devolver los datos
                            return res.status(200).send({
                                status: "Success", 
                                user
                            });
                        }        
                    }else{
                        return res.status(200).send({
                            message: "Las credencial no son correctas"
                        });
                    }
                }); 
            });
    },//Login funcion close


    //update funcion open
    update: function(req, res){

        // Recoger datos del usuario 
        var params = req.body;
        // Validar datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos"
                 });
        }

        // Eliminar propiedades innecesarios
        delete params.password;
        var userId = req.user.sub;
        // Comprobar si el emal es unico
        if(req.user.email != params.email){
            User.findOne({email: params.email.toLowerCase()}, (err, user)=>{

                if(err){
                    return res.status(500).send({
                        message: "Error al identificarse"
                    });
                }if(user && user.email == params.email){
                    return res.status(200).send({
                        message: "El email no puede ser modificado"
                    });

                }
            });
        }else{
                
        // Buscar y actualizar documento
        User.findOneAndUpdate({_id:userId}, params, {new:true}, (err, userUpdated)=>{
            
                if(err){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar'
                    });
                }
                if(!userUpdated){
                    return res.status(200).send({
                        status: 'Error',
                        message: 'No se a actializado el usuario'
                    });
                }

                // Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated
                });
            });
        }
    },
    uploadAvatar: function(req, res){

        // Configurar el modulo multiparty (md) routes/user.js

        // Recoger el fichero de la peticion
        var file_name = 'Avatar no subido...';


        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir el nombre y la extension del archivo

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // nombre del archivo
        var file_name = file_split[2];
        // Extension del archivo
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];


        // Comprobar extension (solo imagenes), si no es valida borrar fichero subido
        if (file_ext !='png' && file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            fs.unlink(file_path, (err)=>{

                return res.status(200).send({
                    status: 'Error',
                    message: 'La extencion del archivo no es valida',
                });
            });   
        }else{
            // Sacar el id del usuario identificado
            var userId = req.user.sub;
            // Buscar y actualizar documento bd
            User.findOneAndUpdate({_id: userId},{image: file_name}, {new:true}, (err, userUpdated)=>{
                if (err || !userUpdated) {
                    // Devolver respuesta
                    return res.status(500).send({
                            status: 'error',
                            message: 'Error al guardar el usuario',
                    });
                }
                // Devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        message: 'Upload Avatar',
                });
            });
        } 
    }
};
module.exports = controller;