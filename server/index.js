var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')

console.log("--- Starting Express server");

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.listen(3000);

var defaultDbConfig = {
  port: 27017,
  host: 'localhost'
};

var mongoOpts = {
  authSource: 'admin'
};

var dbConfig = {
  port: defaultDbConfig.port,
  host: defaultDbConfig.host,
  username: defaultDbConfig.username,
  password: defaultDbConfig.password,
};


var getMongoUri = function(config) {
  var baseUri = 'mongodb://';

  if(config.username && config.password) {
    baseUri += config.username + ':' + config.password + '@';
  }
  baseUri += config.host;
  baseUri += ':';
  baseUri += config.port;
  baseUri += '/';
  return baseUri;
}


app.get('/databases', function(req, res) {
  MongoClient.connect(getMongoUri(dbConfig), mongoOpts, function(err, db) {
    console.log('connect: ', dbConfig);
    console.log(db);
    db.admin().listDatabases(function(err, names) {
      console.log('listDatabases');
      console.log(err);
      console.log(names);
      var databases = [];
      names.databases.forEach(function(database) {
        console.log(database);
        if(database.name != 'admin' && database.name != 'local' && database.name != 'config') {
          databases.push(database);
        }
      });
      db.close();
      res.json(databases);
    });
  })
});

app.get('/collections/:database', function(req, res) {
  var database = req.params.database;
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    db.listCollections().toArray(function(err, collections) {
      console.log(collections);
      db.close();
      res.json(collections);
    });
  })
});

app.get('/count/:database/:collection', function(req, res) {
  var database = req.params.database;
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    var collection = db.collection(req.params.collection);
    collection.count(function(err, count){
        db.close();
        res.json(count);
    });
  })
});

app.get('/find/:database/:collection/:skip/:limit', function(req, res) {
  console.log("find/database");
  var database = req.params.database;
  var skip = parseInt(req.params.skip);
  var limit = parseInt(req.params.limit);
  var options = {};
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    var collection = db.collection(req.params.collection);
    collection.find().skip(skip).limit(limit).toArray(function (err, docs) {
      if(err) {
        console.log("ERROR ============================");
        console.log(err);
      } else {
        console.log("DOCS ============================");
        console.log(docs);
        db.close();
        res.json(docs);
      }
    });
  });
});

app.get('/find/:database/:collection/:skip/:limit/:query', function(req, res) {
  console.log("find/database");
  var database = req.params.database;
  var skip = parseInt(req.params.skip);
  var limit = parseInt(req.params.limit);
  var query = eval('(' + req.params.query + ')');   // not safe
  console.log(query);
  var options = {};
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    var collection = db.collection(req.params.collection);
    collection.find(query).skip(skip).limit(limit).toArray(function (err, docs) {
      if(err) {
        console.log("ERROR ============================");
        console.log(err);
      } else {
        console.log("DOCS ============================");
        console.log(docs);
        db.close();
        res.json(docs);
      }
    });
  });
});

app.get('/export/find/:database/:collection/:query', function(req, res) {
  console.log("find/export");
  var database = req.params.database;
  var query = eval('(' + req.params.query + ')');   // not safe
  console.log("export: " , query);
  var options = {};
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    var collection = db.collection(req.params.collection);
    collection.find(query).toArray(function (err, docs) {
      if(err) {
        console.log("ERROR ============================");
        console.log(err);
      } else {
        console.log("DOCS ============================");
        console.log(docs);
        db.close();
        res.jsonp(docs);
      }
    });
  });
});

app.get('/aggregate/:database/:collection/:skip/:limit/:query', function(req, res) {
  console.log("aggregate/database");
  var database = req.params.database;
  var skip = parseInt(req.params.skip);
  var limit = parseInt(req.params.limit);
  var query = eval(req.params.query);  // not safe
  console.log("query: ", query);
  var options = {"allowDiskUse": true};
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    var collection = db.collection(req.params.collection);
    collection.aggregate(query, options).skip(skip).limit(limit).toArray(function(err, docs) {
      if(err) {
        console.log("ERROR ============================");
        console.log(err);
      } else {
        console.log("DOCS ============================");
        console.log(docs);
        db.close();
        res.json(docs);
      }
    });
  });
});

app.get('/export/aggregate/:database/:collection/:query', function(req, res) {
  console.log("aggregate/export");
  var database = req.params.database;
  var query = eval(req.params.query);  // not safe
  console.log("query: ", query);
  var options = {"allowDiskUse": true};
  MongoClient.connect(getMongoUri(dbConfig) + database, mongoOpts, function(err, db) {
    var collection = db.collection(req.params.collection);
    collection.aggregate(query, options).toArray(function(err, docs) {
      if(err) {
        console.log("ERROR ============================");
        console.log(err);
      } else {
        console.log("DOCS ============================");
        console.log(docs);
        db.close();
        res.json(docs);
      }
    });
  });
});

app.post('/server', function(req, res) {
  dbConfig.host = req.body.host;
  dbConfig.port = req.body.port;
  dbConfig.username = req.body.username;
  dbConfig.password = req.body.password;
  dbConfig.authSource = defaultDbConfig.authSource;
  console.log(dbConfig);
  res.json("OK");
});


app.post('/server/default', function(req, res) {
  console.log("defaultDbConfig");
  console.log(defaultDbConfig);
  dbConfig.host = defaultDbConfig.host;
  dbConfig.port = defaultDbConfig.port;
  dbConfig.username = defaultDbConfig.username;
  dbConfig.password = defaultDbConfig.password;
  dbConfig.authSource = defaultDbConfig.authSource;
  res.json("OK");
});

