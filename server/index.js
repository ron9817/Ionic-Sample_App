const express=require("express");
bodyParser = require('body-parser');
const app=express();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient
var db;
const accessTokenSecret = '321#%6789wer1234tkrt$';


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, data) => {
            if (err) {
		return res.json({resp:-1,error:403});
			}
			req.data = data;
            next();
        });
    } else {
        res.json({resp:-1,error:401});
    }
};

app.post('/log-in', (req,res)=>{
	const userName=req.body.userName;
	const password=req.body.password;
	db.collection('Users').find({
		userName:userName
	}).toArray((err,result)=>{
		if(err)
			res.send(err);
		else if(result.length>0){

			bcrypt.compare(password, result[0].password, (errr, results)=>{
				if(errr){
					res.send({resp:-1,error:errr});
				}
				if (results == true) {
					const accessToken = jwt.sign({ id: result[0]._id, userName: result[0].userName }, accessTokenSecret);
					res.send({resp:1,accessToken:accessToken});
				} else {
					res.send({resp:-1,error:"wrong password"});
				}
			});
		}else{
			res.send({resp:-1});
		}
			
	});
});

app.post('/validate', (req,res)=>{
	const userName=req.body.userName;
	db.collection('Users').find({
		userName:userName
	}).toArray((err,result)=>{
		if(err)
			res.json({resp:-1,error:err});
		else if(result.length>0){
			res.json({resp:2,msg:"Username already exists"});
		}else if(result.length==0){
			res.json({resp:1});
		}else{
			res.json({resp:-1});
		}
			
	});
});


app.post('/register',(req,res)=>{
	data=req.body;
	bcrypt.hash(data.password, saltRounds, (err,   hash)=> {
		if(err)
			res.json({resp:-1,error:err});
		data.password=hash;
		db.collection('Users').insertOne(data,(err,result)=>{
			if(err)
				res.json({resp:-1,error:err});
			else
				res.json({resp:1,result:result});
		});
	});
});

app.get('/home',authenticateJWT,(req,res)=>{
	db.collection('Users').find({
			_id:ObjectID(req.data.id)
		}).toArray((err,result)=>{
			// console.log(result);
			if(err)
				res.json({
					resp:-1,
					error:err
				});
			else{
				res.json({
					resp:1,
					data:{
						userName:result[0].userName,
						firstName:result[0].firstName,
						lastName:result[0].lastName,
						gender:result[0].gender,
						address:result[0].address
					}
				});
			}
		});
});


// app.get('/',(req,res)=>{
// 	// res.send("Success");
// 	const data={
// 		firstName:"Test4",
// 		lastName:"Test",
// 		userName:"ron",
// 		password:"133132",
// 		gender:1,
// 		address:"B-2, Abc, Xyz"
// 	};
// 	db.collection('Users').insertOne(data, (err, result) => {
// 		if (err) return console.log(err)

// 		console.log('saved to database')
// 		data2={
// 			userName:"ron"
// 		}
// 		var password=db.collection('Users').find({
// 			userName:"ron1"
// 		});
// 		password.toArray(function(err, results) {
// 			console.log(results)
// 			// send HTML file populated with quotes here
// 		  });
// 		  res.send("D");
// 		// , (err, result) => {
// 		// 	if (err) return console.log(err)
	
// 		// 	console.log('saved to database');
// 		// 	console.log(result);
// 		// 	res.send("result");
// 		// }
// 	});
// });

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
	if (err) return console.log(err)
	db = database.db('login-project') // whatever your database name is
	app.listen(9090, () => {
	  console.log('listening on 3000')
	})
})

