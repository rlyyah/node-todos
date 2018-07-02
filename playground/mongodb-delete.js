const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client)=>{
	if(err)return console.log('Unable to connect to DB:', err);

	console.log('Successfully connected to the DB');
	var db = client.db('ToDoApp');

	/*db.collection('Users').deleteMany({location:"somewhere"}).then((result)=>{
		console.log(result);
	})*/
	/*db.collection('Users').findOneAndDelete({_id: new ObjectID("5b3a4b171a1b253268889ed0")}).then((result)=>{
		console.log(result)
	})*/
})