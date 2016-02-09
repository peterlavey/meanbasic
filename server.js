var express = require('express'),
  app = new express(),
  path = require('path');
//mongodb://juanito:perez@ds059155.mongolab.com:59155/mean
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.route('/login')
  .get(function(req, res){
    res.send('Esto es un GET');
  })
  .post(function(req, res){
    res.send('Esto es un POST');
  });

var adminRoutes = express.Router(),
  basicRoutes = express.Router(),
  apiRoutes = express.Router();

adminRoutes.get('/', function(req, res){
  res.send('Soy la raiz');
});

adminRoutes.get('/post', function(req, res){
  res.send('Soy los post');
});

adminRoutes.get('/user/:name', function(req, res){
  res.send('Usuario ' + req.params.name);
});

app.use('/', basicRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

//Middleware
adminRoutes.use(function(req, res, next){
  console.log(req.method + req.url);
  next();
});

adminRoutes.param('name', function(req, res, next, name){
  console.log('validaciones con el nombre '+name);
  req.name=name;
  next();
})

app.listen(3000);
