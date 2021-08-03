let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let db = [];

//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

let viewsPath = __dirname + "/views/";
app.get('/', function (req, res) {
    // res.render('home.html', {
    // });
    let fileName = viewsPath + "home.html";
    res.sendFile(fileName);
});

app.get('/listEmployee', function (req, res) {
    res.render('listEmployee.html', {empDb:db,id:Math.round(Math.random()*1000)}); //need this for empty db
});

app.get('/newEmployee', function (req, res) {
    // res.render('newEmployee.html', {
    // });
    let fileName = viewsPath + "newEmployee.html";
    res.sendFile(fileName);
});

app.get('/*',function(req,res) { //* allows any characters at that position
    // res.render('404.html', {
    // });
    let fileName = viewsPath + "404.html";
    res.sendFile(fileName);
});

// parse application/json
app.use(bodyParser.json())

app.post('/listEmployee', function(req,res) {

    let givenName = req.body.name;
    let givendob = req.body.dob;
    let givenDep = req.body.department;

    //calculating age
    dob1 = new Date(givendob); //convert to date object
    let year = dob1.getFullYear(); //extract the year
    let age = calcAge(year);

    if(givenDep.length < 3 || givenName.length < 3 || age < 16) {
        res.render('invalidData.html');
    }
    else {
        let newID = Math.round(Math.random()*1000)
    db.push({
        id: newID,
        name: givenName,
        dob: givendob,
        department: req.body.department
        });
        res.render('listEmployee.html', {empDb: db});
    }

    console.log(req.body.name);
    console.log(req.body.dob);
    console.log(req.body.department);

});

function calcAge(input) {
  let d2 = new Date();
  let year2 = d2.getFullYear();
  let age = year2-input;
  console.log('age = ' + age);
  return age;
}

app.listen(8080);
console.log('http://127.0.0.1:8080/');