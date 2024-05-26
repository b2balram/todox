const TodoModel = require('../db/schema/todo');
const { parseJwt } = require('../utils');

// Create and Save a new user
exports.create = async (req, res) => {
    const authInfo = req.authInfo;
    const userJwt = parseJwt(authInfo.jwt)

    if (!req.body.title && !req.body.description && !req.body.dueDate && !req.body.priority) {
        res.status(400).send({ message: "Content can not be empty!" });
        return
    }
    
    const todo = new TodoModel({
        user: userJwt.email,
        title: req.body.title,
        description: req.body.description,
        dueDate: new Date(req.body.dueDate),
        priority: req.body.priority
    });

    console.log("Todo Create Request...", todo);
    
    await todo.save().then(data => {
        res.send({
            message:"Todo created successfully!!",
            todo:data
        });
    }).catch(err => {
        console.log("Error while todo create...", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating todo"
        });
    });
};

// Retrieve all todos from the database.
exports.findAll = async (req, res) => {
    const authInfo = req.authInfo;
    const userJwt = parseJwt(authInfo.jwt)
    
    try {
        const todo = await TodoModel.find({user: userJwt.email}) ;
        res.status(200).json(todo);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// // Find a single User with an id
// exports.findOne = async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.params.id);
//         res.status(200).json(user);
//     } catch(error) {
//         res.status(404).json({ message: error.message});
//     }
// };


// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await TodoModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Todo not found.`
            });
        }else{
            res.send({ message: "Todo updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Cancel a todo by the id in the request
exports.cancel = async (req, res) => {
    
    const id = req.params.id;
    
    await TodoModel.findByIdAndUpdate({_id: id}, {cancelled: true}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Todo not found.`
            });
        }else{
            res.send({ message: "Todo cancelled successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// // Delete a user with the specified id in the request
// exports.destroy = async (req, res) => {
//     await UserModel.findByIdAndRemove(req.params.id).then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `User not found.`
//           });
//         } else {
//           res.send({
//             message: "User deleted successfully!"
//           });
//         }
//     }).catch(err => {
//         res.status(500).send({
//           message: err.message
//         });
//     });
// };