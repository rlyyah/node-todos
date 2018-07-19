const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _= require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
var port = process.env.PORT || 3000;


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


app.get('/todos/:id', (req, res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findById(id).then((todo)=>{
		if(!todo){
			res.status(404).send('Todo not found');
		}
		res.send({todo});
	}).catch((e)=>{res.status(400).send()})
});

app.delete('/todos/:id', (req,res)=>{
	var id = req.params.id;
	
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo)=>{
		if(!todo){
			return res.status(404).send()
		}
		return res.send({todo})
		

	}).catch((e)=>{res.status(400).send()})
});

app.patch('/todos/:id', (req, res)=>{
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed'])

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
		if(!todo){
			res.status(404).send()
		}
		res.send({todo})

	}).catch((e)=>{res.status(400)})

	})


app.listen(port, ()=>{
	console.log(`Server has started at port ${port}`);
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

