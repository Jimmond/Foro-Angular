'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave-secreta-para-generar-el-token-9999";

exports.authenticated = function(req, res, next) {

    // comprobra si llega autorizacion
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'La peticion no tiene la cabecera de authorizacion'
        });
    }

    // limpiar el tokn y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '');
    
    try {
        // Decodificar token
        var payload = jwt.decode(token, secret);
        // Comprobar si el token ha expirado
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({
                message: 'El token ha expirado'
            });
        }

    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es valido'
        });
        
    }
    
    // Adjuntar usuario identificado a request
    req.user = payload;
    // Pasar a la accion
    next();

};