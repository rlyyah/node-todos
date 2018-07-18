const expect = require('expect')
const request = require('supertest');

const {app} = require('./../server')
const {Todo} = require('./../models/Todo')


const toDos = [{
	text: "First test seed"
}, {
	text: "Second test seed"
}];


beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(toDos);
	}).then(()=>done());
})

describe('POST /todos route', ()=>{
	it('create a new todo', (done) => {
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