'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;



//Modelo de COMENT
var CommentSchema = Schema({
    content: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
});

var comment = mongoose.model('Comment', CommentSchema);


//Modelo de TOPIC
var TopicSchema = Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    comments: [CommentSchema]

});

// Cargar paginacion
TopicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Topic', TopicSchema);