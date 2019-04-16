'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
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
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

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
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

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

        // Eliminar propiedades innecesarios

        // Buscar y actualizar documento
        
        // Devolver respuesta

        return res.status(200).send({
            message: "Metodo de actualizacion de datos de usuario"
        });
    }


};

module.exports = controller;