const express = require('express');
const app = express();
//middleware
app.use(express.json());
app.listen(3000);

let users={};

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/users',userRouter);
app.use('/auth', authRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

function getUser(req,res){
    res.send(users);
};

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message:"Posted Successfully!",
        user:req.body
    });
};

function updateUser(req,res){
    console.log('req.body->data',req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message:"Updated Successfully!"
    })
}

function deleteUser(req,res){
    users={};
    res.json({
        message:"Delete successful!"
    })
}

function getUserById(req,res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }

    res.json({
        message:"req received",
        data:obj
    });
}

function getSignUp(req,res){
    res.sendFile('/public/index.html',{root:__dirname});
}

function postSignUp(req,res){
    let obj = req.body;
    console.log('backend',obj);
    res.json({
        message:"user signed up",
        data:obj
    });
}