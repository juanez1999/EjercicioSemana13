const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;

function createRoutes (app, db) {

    app.get('/', (request, response) => {
        console.log('alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/main.html');
    });
    


    app.get('/api/dinosaurs', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/tallerThan14', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ height: {$gt:14}})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/shorterThan5', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ height: {$lt:5}})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/heavier', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ weight: {$gt:2.5}})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/tallerAndHeavier', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ height: {$gt:26}, weight: {$gt:2.9}})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/tallest', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find().sort({height:-1}).limit(1)
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/widest', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find().sort({width:-1}).limit(1)
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/heaviest', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find().sort({weight:-1}).limit(1)
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/colombia', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ countries: {$eq: "Colombia"}})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/noFranceNoItaly', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ countries: {$ne: "France", $ne:"Italy"}, diet: {$eq:"carnivorous"}})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    app.get('/api/russia', (request, response) => {
        const products = db.collection('tiposDinosaurios');
        
        //buscamos todos los productos
        products.find({ countries: {$eq: "Russia"}, diet: {$ne:"carnivorous"}}).sort({weight:-1})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });
    
}

module.exports = createRoutes;
