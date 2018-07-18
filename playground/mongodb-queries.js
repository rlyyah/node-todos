const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/User');
const {ObjectID} =require('mongodb');



var id = '5b4627b2a58dd74164b6d8a0';

if(!ObjectID.isValid(id)){
	console.log('invalid user id')
}else{

User.findById(id).then((todo)=>{
	if(!todo){
		return console.log('User not found');
	}
	console.log('Todo:', todo);
}).catch((e)=>console.log(e));

}

