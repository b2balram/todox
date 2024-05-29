const { default: mongoose } = require('mongoose');
const TodoModel = require('../db/schema/todo');
var CronJob = require('cron').CronJob;

function needsToCreateTodo(createdAt, mode) {
    console.log("creationDate", createdAt);
    console.log("mode", mode);
    const now = new Date();
    return increaseDateByMode(createdAt, mode) < now;
}

function increaseDateByMode(date, mode){
    const newDate = new Date(date);

    switch (mode) {
        case 1:
            return newDate.setDate(newDate.getDate() + 1);;

        case 2:
            return newDate.setDate(newDate.getDate() + 7);

        case 3:
            return newDate.setMonth(newDate.getMonth() + 1);

        default:
            throw new Error('Invalid mode');
    }
}

if(process.env.ENABLE_RECURRANCE_SCHEDULER == "true"){
    new CronJob(process.env.RECURRANCE_SCHEDULER_CRON_EXP, function(){
        try {
            console.log("running recurrance scheduler...")
            TodoModel.find({status: 0, "recur.enabled": true, "recur.recurred": false}).then(todos => {
                todos.forEach(todo => {
                    console.log("checking recurrance for todo ", todo._id);
                    if(needsToCreateTodo(todo.createdAt, todo.recur.mode)){
                        const newTodo = new TodoModel({
                            user: todo.user,
                            title: todo.title,
                            description: todo.description,
                            dueDate: increaseDateByMode(todo.dueDate, todo.recur.mode),
                            priority: todo.priority,
                            recur: {
                                enabled: todo.recur.enabled,
                                mode: todo.recur.mode
                            },
                            reminder: {
                                enabled: todo.reminder.enabled,
                                channels: todo.reminder.channels,
                                beforeHour: todo.reminder.beforeHour
                            },
                            createdAt: new Date()
                        });
                    
                        console.log("Todo Create Request...", newTodo);
                        
                        newTodo.save().then(data => {
                            console.log("Todo created successfully!! ", todo._id)
                            todo.recur.enabled = false;
                            todo.save()
                        }).catch(err => {
                            console.log("Error while todo create...", err)
                        });
                    } 
                });
            }).catch(err => {
                console.log("error while fetching data from db", err);
            })
        } catch(error) {
            console.log("Something went wrong while running scheduler...", error)
        }
    }, null, true, "Asia/Kolkata");
}