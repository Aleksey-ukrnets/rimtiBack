const { Client, LogLevel } = require('@notionhq/client');
const fetch = require('node-fetch') 

const { NOTION_API_TOKEN, NOTION_DATABASE_ID } = process.env;

async function addEmail(email) {
    // initialize notion client
    const notion = new Client({
        auth: NOTION_API_TOKEN,
        logLevel: LogLevel.DEBUG,
    });

    await notion.pages.create({
        parent: {
            database_id: NOTION_DATABASE_ID,
        },
        properties: {
            Email: {
                title: [
                    {
                        text: {
                            content: email,
                        },
                    },
                ],
            },
        },
    });
}

async function senWaitlistThanksEmail(email) {

    await fetch(
        `${process.env.URL}/.netlify/functions/emails/waitlist_thanks`,
        {
            headers: {
                "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
            },
            method: "POST",
            body: JSON.stringify({
                from: "ritmi@ritmi.app",
                to: email,
                subject: "Thank you for joining Ritmi waitlist",
                parameters: {
                    "MessageStream": "ritmi-waitlist-thanks"
                },
            }),
        }
    );

}

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}


module.exports.handler = async function (event, context) {
    // check the request method
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not Allowed' };
    }

    // get the body
    try {
        var body = JSON.parse(event.body);
    } catch (err) {
        return {
            statusCode: 400,
            body: err.toString(),
        };
    }

    // validate the email
    const { email } = body;
    if (!validateEmail(email)) {
        return { statusCode: 400, body: email };
    }
    // store email in notion
    await addEmail(email);
    await senWaitlistThanksEmail(email);
    return { statusCode: 200, body: 'ok' };
};