const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var databaseUrl = global.config.db;
var db = mongojs(databaseUrl, ['users','games-info']);


router.post('/getFilteredObject', function(req, res, next){

    var filter = req.body;
    
    if(!filter.collection || !(filter.query + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db[filter.collection].find(filter.query, function(err, result){
            if(err){
                res.send(err);
            }
            res.json(result);
        });
    }
});


module.exports = router;