const TodoModel = require('../db/schema/todo');
const { inAppNotification, emailNotification } = require('../notification/novu');

var CronJob = require('cron').CronJob;

function needsToRemind(dueDate, hour){
    var remindDate = new Date(dueDate)
    remindDate.setHours(remindDate.getHours() - hour);

    var now = new Date()

    return now > remindDate;
}

if(process.env.ENABLE_REMINDER_SCHEDULER == "true"){
    new CronJob(process.env.REMINDER_SCHEDULER_CRON_EXP, function(){
        try {
            console.log("running reminder scheduler...")
            TodoModel.find({"reminder.enabled": true}).then(todos => {
                todos.forEach(todo => {
                    console.log("reminder enabled for ", todo)
                    if(needsToRemind(todo.dueDate, todo.reminder.beforeHour)){
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
}