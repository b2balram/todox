const TodoModel = require('../db/schema/todo');
const { inAppNotification, emailNotification } = require('../notification/novu');

var CronJob = require('cron').CronJob;

new CronJob('*/10 * * * * *', function(){
    try {
        console.log("running reminder scheduler...")
        TodoModel.find().then(todos => {
            todos.forEach(todo => {
                if(todo.reminder.enabled){
                    console.log("reminder enabled for ", todo)
                    if(todo.reminder.channels.inApp){
                        console.log("reminding inApp for ", todo._id)
                        inAppNotification(todo.title, todo.description, todo.user, todo._id).then(res => {
                            console.log("InApp notification triggered for ", todo._id)
                        }).catch(err => {
                            console.log("InApp notification trigger failed for ", todo._id)
                        })
                    }
                    if(todo.reminder.channels.email){
                        console.log("reminding email for ", todo._id)
                        emailNotification(todo.title, todo.description, todo.user, todo._id).then(res => {
                            console.log("Email notification triggered for ", todo._id)
                        }).catch(err => {
                            console.log("Email notification trigger failed for ", todo._id)
                        })
                    }
                } 
            });
        }).catch(err => {
                console.log("error while fetching data from db");
            })
    } catch(error) {
        console.log("Something went wrong while running scheduler...", error)
    }
}, null, true, "Asia/Kolkata");