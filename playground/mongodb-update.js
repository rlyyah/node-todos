const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client)=>{
	if(err)return console.log('Unable to connect to DB:', err);

	console.log('Successfully connected to the DB');
	var db = client.db('ToDoApp');

	db.collection('Szymon').findOneAndUpdate({
		_id: new ObjectID('5b3a586e5e9bdc5508868ab0')
	}, { $set: {
		name: 'Roman'
	}}, {returnNewDocument: false}).then((result)=>{
		console.log(result);
	});

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5b3a586e5e9bdc5508868ab0')
	}, { $inc: {
		age: 5
	}}, {returnNewDocument: false}).then((result)=>{
		console.log(result);
	});


});