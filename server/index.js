const express=require("express");
bodyParser = require('body-parser');
const app=express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient
var db;

app.post('/log-in',(req,res)=>{
	const userName=req.body.userName;
	const password=req.body.password;
	// const userName="123n1";
	// const password="123n1";
	db.collection('Users').find({
		userName:userName
	}).toArray((err,result)=>{
		if(err)
			res.send(err);
		else if(result.length>0){
			if(result[0].password==password){
				res.send({resp:1,userName:userName});
			}else{
				res.send({resp:-1});
			}
		}else{
			res.send({resp:-1});
		}
			
	});
	// res.send("fail");
});

app.post('/register',(req,res)=>{
	// const userName=req.body.userName;
	// const password=req.body.password;
	// console.log(req.body);
	// const data={
	// 			firstName:"Test5",
	// 			lastName:"Test",
	// 			userName:"ron5",
	// 			password:"133132",
	// 			gender:1,
	// 			address:"B-2, Abc, Xyz"
	// 		};
	data=req.body;
	db.collection('Users').insertOne(data,(err,result)=>{
		if(err)
			res.json({resp:-1,error:err});
		else
			res.json({resp:1});
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

