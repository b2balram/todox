const TodoModel = require('../db/schema/todo');
var CronJob = require('cron').CronJob;

new CronJob('*/5 * * * *', function(){
    try {
        console.log("running recurrance scheduler...")
        const todos = TodoModel.find({cancelled: false, recur: {enabled: true}});
        console.log("todos fetched successfully")
        todos.array.forEach(todo => {
            if(todo.reminder.enabled){
                console.log("reminder enabled for ", todo._id)
                if(todo.reminder.inApp){
                    console.log("reminding inApp for ", todo._id)
                    inAppNotification(todo.title, todo.description, todo.user, todo._id)
                }
                if(todo.reminder.email){
                    console.log("reminding email for ", todo._id)
                    emailNotification(todo.title, todo.description, todo.user, todo._id)
                }
            } 
        });
    } catch(error) {
        console.log("Something went wrong while running scheduler...", error)
    }
}, null, true, "Asia/Kolkata");