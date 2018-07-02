//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client)=>{
	if(err){
		return console.log('Unable to connect to the db');
	}
	console.log('Connected to the DB');
	const db = client.db('ToDoApp')

	/*db.collection('Todos').insertOne({
		text: 'sth to do',
		completed: false
	}, (err, result)=>{
		if(err) return console.log('error:', err)

		console.log(JSON.stringify(result.ops, undefined, 2));	
	})*/

	/*db.collection('Users').insertOne({
		name: 'Tomasz',
		age: 22,
		location: 'Jaworzno'
	},(err, result)=>{
		if(err)return console.log(err);

		console.log(JSON.stringify(result.ops, undefined, 2));
	})
*/
	client.close();
})