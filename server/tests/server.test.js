const expect = require('expect')
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server')
const {Todo} = require('./../models/Todo')


const toDos = [{
	_id: new ObjectID(),
	text: "First test seed"
}, {
	_id: new ObjectID(),
	text: "Second test seed",
	completed: true,
	completedAt: 333
}];


beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(toDos);
	}).then(()=>done());
})

describe('POST /todos route', ()=>{
	it('should create a new todo', (done) => {
		var text = 'this is  a test text';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect(res =>{
			expect(res.body.text).toBe(text);
		})
		.end((err, res)=>{
			if(err){
				return done(err);
			}

			Todo.find({text}).then((todos)=>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e)=>done(e));
		})
	});
	it('should not create todo with invalid data', (done)=>{
		var text = '';
		request(app)
		.post('/todos')
		.send({text})
		.expect(400)
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.find().then((found)=>{
				expect(found.length).toBe(toDos.length);

				done();
			}).catch(e=>done(e));

		})
	})	
});

describe('GET /todos route', ()=>{
	it('should return all todos', (done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.length).toBe(2);
		})
		.end(done);
	})
})

describe(' GET /todos/:id', () => {
	it('should return valid todo doc', (done) => {
		request(app)
			.get(`/todos/${toDos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toBe(toDos[0].text);
			})
			.end(done);
	});
	it('should return 404 if todo not found', (done)=>{
		var testID = new ObjectID();
		request(app)
			.get(`/todos/${testID.toHexString()}`)
			.expect(404)
			.end(done);
	});


	it('should return 404 for non-object id', (done) =>{
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done)
	});	
})

describe('DELETE /todos/:id', ()=>{
	it('should remove a todo', (done)=>{
		var testID = toDos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${testID}`)
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toBe(toDos[1].text);
			}).end((err, res)=>{
				if(err){
					return done(err);
				}
				Todo.findById(testID).then((todo)=>{
					expect(todo).toNotExist();
					done();
				}).catch((e)=>{done(e)})
			});
	});
	it('should return 404 if todo not found', (done)=>{
		var testID = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${testID}`)
			.expect(404)
			.end(done);

	})
	it('should return 404 if object id is invalid', (done)=>{
		request(app)
			.delete('/todos/123abc')
			.expect(404)
			.end(done);
	})	


});

describe('PATCH /todos/:id', ()=>{
	it('should update the todo', (done)=>{
		var testText = 'im a test case for patch method!';
		var testID = toDos[0]._id.toHexString();

		request(app)
			.patch(`/todos/${testID}`)
			.send({
				text: testText,
				completed: true
			})
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toBe(testText);
				expect(res.body.todo.completedAt).toBeA('number');
				expect(res.body.todo.completed).toBe(true);
			}).end(done);
	});

	it('should clear completedAt when todo is not completed', (done)=>{
		var testID = toDos[1]._id.toHexString();

		request(app)
			.patch(`/todos/${testID}`)
			.send({
				completed: false
			})
			.expect((res)=>{
				expect(res.body.todo.completedAt).toBe(null);
			}).end(done);

	})
})