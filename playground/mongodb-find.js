const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
	if(err)return console.log('Unable to connect to db', err);

	var db = client.db('ToDoApp');
	console.log('Connected to the DB');

	db.collection('Todos').find().toArray().then((docs)=>{
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err)=>{
		if(err)return console.log(err);
	})
	
	var returned = db.collection('Users').find().toArray().then((docs)=>{
		var filtered = docs.filter((ob)=>{
			return ob.age >= 18;
		}).then((kek)=>{
			console.log(kek);
		})
	})
	
	/*var filtered = returned.filter((obj)=>{
		return obj.age >=18;
	});
	
	filtered.forEach((person)=> {
		console.log(person);
	})
	*/
})

