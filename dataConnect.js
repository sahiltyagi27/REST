'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/RESTdatabase');

var db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {

    console.log('Connection to database successful');
    
    let schema = mongoose.Schema;
    
    let animalSchema = new schema({
        name: String,
        size: String,
        color: String,
        mass: Number,
        type: String
    });
    
    let animal = mongoose.model("animal", animalSchema);
    
    let elephant = new animal({
        name: 'Jumbo',
        size: 'big',
        color: 'grey',
        mass: 6000,
        type: 'elephant'
    });
    
    elephant.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Save complete');
        }
        db.close(() => {
            console.log('Db connection close');
        });

    });

});