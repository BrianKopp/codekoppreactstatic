---
slug: serverless-contact-form
title: Contact Form on Lambda
date: 2018-08-04T14:50
blurb: Don't you dare put this in PHP when you could do it serverless in python!
categories: Python;AWS
tags: Python;Serverless;AWS;API Gateway
image_name: phone-499991_1920.jpg
---

# Hello, Anyone There?

So you want to have a contact form on your website, but you want a static website, what do?

Enter, AWS Lambda. It's serverless, which means you don't need bluehost, or hostgater, or whatever you're using. You just write your function which handles the submit, and boom, you're done.

Steps (working backwards):

1. Write a Lambda function to receive the "Contact" request. Function will send an email to you.
2. Setup an API Gateway HTTP endpoint which triggers the Lambda function.
3. User hits "Submit" button, and javascript on your page sends an HTTP POST request to your API Gateway.

Easy peasy, right? Let's dig in!

Big thanks to Marko Fancekovic's tutorial [over on Medium](https://medium.com/calyx/serverless-contact-forms-with-aws-lambda-79959cd1a6cd). This is a python rendition of his steps.

## Make the Lambda Function

It'll be in python, obviously. Go to AWS Lambda, and click Create Function.

![AWS create Lambda function](/img/blog/postimages/AWSCreateLambdaFunction.jpg)

On the next page, click "Author from scratch", pick a name, select Python 3.6 runtime, select "Create new role from template(s)", and then input a name for that new role.

![Lambda initial settings](/img/blog/postimages/ContactFormLambdaCreateSettings.jpg)

Finally, select "Create function" at the bottom. You'll move to a screen like this:

![Lambda created](/img/blog/postimages/ContactFormLambdaCreatedInitial.jpg)

### Update the Lambda Code

For now, replace the code in the Lambda function window with the following:

```python
import logging
import json


def lambda_handler(event, context):
    logging.debug('Received event {}'.format(event))
    response = {
        'isBase64Encoded': False,
        'headers': {
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps({'result': 'success'})
    }
    return response
```

We'll do more in the Lambda function, but for now, this will do. Now let's make sure the actual function works! Go to the top and Save the function. We're going to make a quick test.

### Create Your First Test

Testing is important. It ensures your function behaves as expected. Right now, our function doesn't do anything except return a dictionary. Let's make our first test though and make sure we don't have any errors yet.

Click the dropdown next to the Test button and select "Configure test events".

![Configure test events](/img/blog/postimages/ContactFormLambdaCreateFirstTest.jpg)

Then, input a name for your test. I used "ContactTest". Delete all the keys from the dictionary so it just says {}.

![Configure test](/img/blog/postimages/ContactFormLambdaConfigureFirstTest.jpg)

Save the configuration by clicking "Save" in the bottom right. Next, ensure the dropdown next to Test says "ContactTest" - or whatever you named it - and click Test. You should get a green shaded area appear below the botton showing that the function succeeded.

![First test succeeded](/img/blog/postimages/ContactFormLambdaFirstTestSuccess.jpg)

### Fine Tune Permissions

There isn't a great way to make the new Role as part of the Lambda function creation process. It interrupts the workflow, and it's just as easy to do it now. So let's do it! From the Services dropdown, go to IAM. Select Roles.

Select the policy and then click edit. At the bototm of the Visual Editor, select "Add additional permissions". Click "Choose a service", type SES to filter the list, then select the only remaining SES option. In the Actions section, start typing "SendEmail", and select the only remaining action. To finish, select Review policy and then Save Changes.

### Finish the Lambda Code

The Lambda function isn't really exciting right now. It'll just reply with an HTTP 200 code, but it doesn't do anything. Let's change that.

Back in the Lambda function, replace the code with what is below, and save the Lambda.

```python
import logging
import json
import boto3

email_client = boto3.client('ses', region_name='us-east-1')
SENDER = "YOUR NAME <YOUREMAIL@something.com>"
RECIPIENT = "DESTINATION@somewhere.com"

def success_response() -> dict:
    return {
        'isBase64Encoded': False,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'statusCode': 200,
        'body': json.dumps({'result': 'success'})
    }

def error_response(message: str, code: int = 400) -> dict:
    return {
        'isBase64Encoded': False,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'statusCode': 400,
        'body': json.dumps({'error': message})
    }

def lambda_handler(event, context):
    logging.log('Received event {}'.format(event))
    missing_keys = []
    if not 'body' in event:
        return error_response('body not present in request', 400)
    if isinstance(event['body'], str):
        try:
            event['body'] = json.loads(event['body'])
        except Exception as e:
            return error_response('error extracting body info', 500)
    # extract the message content
    try:
        contacter_name = event['body']['name']
    except KeyError as e:
        missing_keys.append('name')
    try:
        contacter_email = event['body']['email']
    except KeyError as e:
        missing_keys.append('email')
    try:
        contacter_message = event['body']['message']
    except KeyError as e:
        missing_keys.append('message')
    
    if len(missing_keys) > 0:
        error_message = 'Request did not have expected keys. {}'.format(
            'Missing keys: {}'.format(','.join(missing_keys)) if len(missing_keys) > 0 else ''
        )
        logging.error(error_message)
        # bad request, return 400
        return error_response(error_message, 400)
    email_text_message = 'Received email\nFrom: {}\nEmail: {}\nMessage:\n{}'.format(
        contacter_name,
        contacter_email,
        contacter_message
    )
    email_html_message = """
    <html>
      <head></head>
      <body>
        <h1>Received New Message</h1>
        <p>From: {}</p>
        <p>Subject: {}</p>
        <p>Message:<br/>{}</p>
      </body>
    </html>
    """.format(contacter_name, contacter_email, contacter_message)
    try:
        ses_response = email_client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT
                ]
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': email_text_message
                    },
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': email_html_message
                    }
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': 'New Email from CodeKopp Website'
                }
            },
            Source=SENDER
        )
    except Exception as e:
        logging.error('Unable to send email. Exception type: {}. Exception: {}'.format(type(e), e))
        return error_response('Error sending email', 500)  # 500 is error message
    logging.debug('Successfully sent email message. Email response: {}'.format(ses_response))
    return success_response()
```

There's a decent amount of stuff going on here. Let's dig in.

* the boto client is AWS python library. You must specify your region when getting the AWS Simple Email Service (SES) client
* Specify your recipient and sender values. They can be the same email. We'll have to confirm these with AWS SES later.
* I've moved the response creation into error_response() and success_response() just to make things easier in the main function.

In the main function, lambda_handler(), I've added some things. First, we check for all the expected fields in the email. If there are any missing, we send a 400 (bad request) reply to the caller. Next, we use the boto client to send the email ([Reference](https://boto3.readthedocs.io/en/latest/reference/services/ses.html#SES.Client.send_email)). We have to construct the message in both *plain text* as well as *html*.

#### Test It, Test It

Let's not omit our testing. If we try testing your Lambda function, we'll get an error response, specifically, a 400 error, which means it's a bad request.

![event variable missing](/img/blog/postimages/ContactFormLambdaSecondTestErrorResponse.jpg)

We haven't updated our event variable. Now, our function is expecting a dictionary to be in the 'body' key, with a handful of other keys inside that. Let's update our test configuration to have the json:

```json
{
    "body": {
        "name": "Jane Doe",
        "email": "jane@doe.com",
        "message": "Hi, I like your site!"
    }
}
```

Rerun the test. We still get an error message, but it's different now. Now it says:

![event variable missing](/img/blog/postimages/ContactFormLambdaThirdTestErrorResponse.jpg)

If we scroll down, you'll see the detailed log output.

![event variable missing](/img/blog/postimages/ContactFormLambdaThirdTestLogOutput.jpg)

The message says "An error occured (MessageRejected) when calling the SendEmail operation: Email address is not verified.

We have to validate our email address in SES. AWS doesn't let you send emails to just anyone. You have to specifically opt-in. Let's do that.

#### Amazon SES

We're going to verify our email for AWS SES ([AWS docs](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html)).

1. Navigate to the SES dashboard
2. Select "Email Addresses" from the navigator
3. Click "Verify a new Email Address"
4. Input your email address (case sensitive)
5. Go get a cup of coffee
6. Check your email and click the verification code.

Back to testing! From the Lambda function page, retest your function. SUCCESS!!!!! Make sure you check your email's spam folder to ensure you received it.

![test success](/img/blog/postimages/ContactFormLambdaTestSuccess.jpg)

## API Gateway

Our Lambda function is cool and everything, but it doesn't do us much good if it only fires when we manually hit the "Test" button. We want to be able to send an HTTP request and have our Lambda execute. Enter, API Gateway. API Gateway exposes a URL. It can be a little hard to get up and running, so we'll dig into the weeds in this post.

### Step 1: Create an API

Go to the API Gateway section of the AWS web console. Click Get Started.

![API Gateway Welcome](/img/blog/postimages/ContactFormAPIGatewayWelcome.jpg)

Select "New API" and give your API a name & description.

![create API gateway](/img/blog/postimages/ContactFormAPIGatewayCreate.jpg)

### Step 2: Create a Method

Click "Actions" and then "Create Method". A dropdown will appear, select "POST", then the checkbox.

![create method](/img/blog/postimages/ContactFormAPIGatewayCreateMethod.jpg)

Make sure the "Integration Type" says "Lambda Function" and proxy is selected yes. Then, type in the name of your Lambda function and click Save. You'll get a popup asking if it's ok for this API Gateway to invoke your Lambda. Say yes.

![method created](/img/blog/postimages/ContactFormAPIGatewayCreateMethodFinish.jpg)

We need to enable CORS since we'll be calling this API from not amazonaws.com. I won't go into CORS, but basically, you need to enable it. Select your POST method, click the "Actions" dropdown, then select "Enable CORS".

![method created](/img/blog/postimages/ContactFormAPIGatewayEnableCORS.jpg)

### Step 3: Deploy the API

Next, we need to *deploy* our API. You can't use the API unless you deploy it. From the "Actions" dropdown, select the "Deploy API" action. You'll get a popup asking you to create a *Stage*. I'm going to break some rules and make a stage named "prod" and deploy straight to my "production" stage.

![deployment screen](/img/blog/postimages/ContactFormAPIGatewayDeploy.jpg)

![deploy to production austin powers](/img/blog/postimages/DeployToProductionAustinPowers.jpg)

### Step 4: Test the API

Now that we're, *cough cough*, in "production", let's make sure it works! Open up [Postman](https://getpostman.com) and make a new post request. We have to find the URL of the stage from the API Gateway screen.
![deployment screen](/img/blog/postimages/ContactFormAPIGatewayStage.jpg)

Fill out your Postman body arguments and send the HTTP request.

![deployment screen](/img/blog/postimages/ContactFormAPIGatewayPostman.jpg)

It worked!!!

![it worked](/img/blog/postimages/Oh-sweet-mother-of-god-meme-506.jpg)

Ok, so now our **entire** back-end is set up to handle our contact form. Woo-hoo! We can finally move on to our contact form on our website.

## The Actual Contact Form

Well, we've spent some time getting to this point, but we're finally here. Let's get our HTML contact form wired up with Javascript to send our request. Since my website is written in React, this example will be react. You can use Angular or jQuery or whatever you'd like.

Let's make our react component

```javascript
import React, {Component} from 'react'
import { hot } from "react-hot-loader";

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.email = React.createRef();
        this.message = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log('Submit button pressed');
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <input id="name" type="text" name="name" placeholder="Name" defaultValue="" ref={this.name}/>
              <input id="email" type="text" name="email" placeholder="Email" defaultValue="" ref={this.email}/>
              <input id="message" type="text" name="message" placeholder="Message" defaultValue="" ref={this.message}/>
              <button type="submit" name="button">Send Message </button>
            </form>
        )
    }
}
export default hot(module)(ContactForm)
```

This sets up the basic structure of a react form. You create references in the constructor that get attached to the inputs on the form. Then when you submit, you have specified in the form tag the onSubmit handler. It is important for the handleSubmit method to call event.preventDefault().

Let's spice things up by calling the form. You'll need to have the npm package 'axios' installed. Add the following line to the import:

```javascript
import axios from 'axios';
```

Then, call the HTTP endpoint you used in Postman previously. Replace handleSubmit with the following:

```javascript
    handleSubmit(event) {
        event.preventDefault();
        console.log('Submit button pressed');
        axios.post('https://YOUR_API_GATEWAY_URL', {
            name: this.name.current.value,
            email: this.email.current.value,
            message: this.message.current.value
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error.response);
        });
    }
```

Now we are submitting a post request with three data properties, name, email, and message. If you press submit on this form, it should work!

# Conclusion

Thanks for sticking with this tutorial! It was a bit involved at points, but it's a great exercise to get exposed to how AWS Lambda and API Gateway can be a powerful tool to have in your toolbox. Just to recap, in this post we covered:

* Creating a Lambda function to send an email to ourselves using AWS SES
* Setting up API Gateway to use Lambda to handle a response
* Developed a form to send a message to our API Gateway endpoint.

Let me know if you have any questions or want to see more!
