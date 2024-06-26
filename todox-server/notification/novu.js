const { Novu } = require('@novu/node')

const novu = new Novu(process.env.NOVU_API_KEY);

const subscriberId = process.env.NOVU_SUBSCRIBER_ID

exports.emailNotification = async (title,description,email,Id) => {

    await novu.subscribers.identify(subscriberId, {
        email: email
    });

    await novu.trigger('onboarding-workflow', {
        to: {
          subscriberId: email,
          email: email
        },
        payload: {
            todoTitle: title,
            description: description
        }
    });
}

exports.inAppNotification = async (title,description,email,Id) => {

    await novu.subscribers.identify(email, {
        email: email
    });

    await novu.trigger('in-app-notification', {
        to: {
            subscriberId: email
        },
        payload: {
            todoTitle: title,
            description: description
        }
    });
}