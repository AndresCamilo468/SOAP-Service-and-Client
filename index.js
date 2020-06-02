//Definicion del Servicio
var myService = {
  feedTag: {
      funtions: {
          tags: function(args) {
              console.log(args.name);
              let a = "hola";
              return a;
          }
      }
  }
};




//Sever Soap
var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');
var app = require(`express`)();

app.use(require(`body-parser`).raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8001, function(){
  require(`soap`).listen(app, '/feedTag', myService, xml, function(){
    console.log('server initialized');
  });
});






//Cliente Soap
function requestClient(res){
  
  var url = 'http://localhost:8001/feedTag?wsdl';
  var args = {name: 'value'};

  require('soap').createClient(url, function(err, client) {
    if(err) {
      res.send(err);
    }
    else{
      client.tags(args, function(err, result) {
          res.send(result);
      });
    }
  });

}



//Server rest
var rest = require(`express`)();

rest.get('/', function (req, res) {
  requestClient(res);
});

rest.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});