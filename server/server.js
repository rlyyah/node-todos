var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
	var newtodo = new Todo({
		text: req.body.text
	});

	newtodo.save().then((doc)=>{
		res.send(doc);
	}, (e)=>{
		res.status(400).send(e);
	});
	
});

app.get('/todos', (req,res)=>{
	Todo.find().then((todo)=>{
		res.send({todo});
	}, (e)=> {
		res.status(400).send(e);
	});
});

app.listen(3000, ()=>{
	console.log('server has started!');
});

module.exports = {app};





/*var firstUser = new User({
	email: ''
});

firstUser.save().then((saved)=>{
	console.log('Saved user to the Db:', JSON.stringify(saved, undefined, 2));
}, (err)=>{
	console.log('Unable to save the user:', err)
});*/

/*var newTodo = new Todo({
	text: 'cook dinner',
	completed: false
});*/

/*newTodo.save().then((saved)=>{
	console.log('Saved todo:', saved);
}, (e)=>{
	console.log('Unable to save the data');
});*/

