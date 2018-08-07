---
slug: garage-door-get-history-lambda
title: Getting Garage History (Lambda, CloudFormation)
date: 2018-06-22T05:00
blurb: When did I close my garage door?
categories: Garage Door;AWS
tags: IoT;CloudFormation;Lambda;AWS;Samples;Garage Door
image_name: gridgeometry.jpg
---

# Introduction

In this post, I show exactly how I implemented a Lambda function which accesses data from a DynamoDB created in a different post. All this is done using CloudFormation so it is repeatable and predictable.

## Lambda - In Python, Obviously

Let's start with the most basic code:

```python
import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
door_history_table = dynamodb.Table('doorHistory')
def request_handler(event, content):
    device_id = event['deviceId']
    db_response = door_history_table.query(
        KeyConditionExpression=Key('DeviceId').eq(device_id)
    )
    history = db_response['Items']
    return json.dumps({'data': history})
```

Even at the most basic, this code still has a lot going on. Let's take it one-by-one.

'import json' pulls in the standard json library which is used to serialize the result (last line). 'import boto3' pulls in the python library for communicating with DynamoDB. The last import statement pulls in items used to write the DynamoDB query.

The next two lines make variables we can use to query the table. 'dynamodb' loads up the boto3 DynamoDB libraries (boto3 has loads of other libraries too). 'door_history_table' sets us up so we can hit the table we made in the previous post.

The request_handler function is the function that will get executed with the lambda function and does all the heavy lifting. The function performs the following tasks:

* Extracts a 'deviceId' item from the event dictionary.
* Queries the doorHistory table.
* * It uses the query() function with the KeyConditionExpression parameter. The function queries for everything whose 'DeviceId' key is equal to the device_id obtained from the event dictionary.
* Extracts the list of query results, which are stored under the key 'Items'.
* Creates a dictionary with one key, 'data', whose value is the list of query results.
* Dumps the dictionary into a JSON string and returns.

## CloudFormation

Did you know you can write your python or Node.js Lambda functions directly in your CloudFormation script? This probably isn't the most scalable solution, but it certainly helps keep everything in one place and under source control! Check out the CloudFormation resource below:

```yml
lambdaGetDoorHistory:
  Type: 'AWS::Lambda::Function'
  Properties:
    FunctionName: 'GetDoorHistory'
    Description: 'Gets door history from DynamoDB'
    Role: !GetAtt lambdaGetDoorHistoryRole.Arn
    Runtime: 'python3.6'
    Handler: 'index.request_handler'
    Code:
      ZipFile: |
        import json
        import boto3
        from boto3.dynamodb.conditions import Key, Attr
        dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
        door_history_table = dynamodb.Table('doorHistory')
        def request_handler(event, content):
            device_id = event['deviceId']
            db_response = door_history_table.query(
                KeyConditionExpression=Key('DeviceId').eq(device_id)
            )
            history = db_response['Items']
            return json.dumps({'data': history})
```

WHAT?????? Yes, you can write your python directly into the CloudFormation script. There are several things going on in this CloudFormation snippet. Let's dig into them.

The FunctionName and Description fields are self-explanatory - pick a name, describe stuff. Role is a require property that I'll discuss below. 'lambdaGetDoorHistoryRole' is a CloudFormation resource, and we want to get it's Arn, so we say '!GetAtt name.Arn'.

Runtime is a property that tells AWS which execution runtime you want to use. Python 3.6 is the obvious choice. The Handler property tells AWS which function to run when it starts up your Lambda function. 'index.request_handler' indicates that the 'request_handler' function in the file named 'index' is what should be started. 'index' is the name of the file that AWS will put your code into in the Lambda function.

Finally, the Code property. There are a number of ways to provide a Lambda function's code when using CloudFormation, but most are more complicated than a beginner wants to deal with. Using the ZipFile property as shown above is a concise way to submit your CloudFormation script while keeping things simple.

You need the | symbol after the ZipFile property. I'm not sure why. Just do it.

Ok, moving on...

## Permissions, Permissions

The AWS web console does a good job reminding users about permissions and assigning a role to the Lambda function, but in CloudFormation, there are no such hints. You must explicitly define all your roles and policies. Don't worry, it's not too hard (ok, maybe it's kinda hard if you're new to this)! Here is the CloudFormation resource for the Lambda function created above.

```yml
lambdaGetDoorHistoryRole:
  Type: 'AWS::IAM::Role'
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
      - Effect: Allow
        Principal:
          Service:
          - lambda.amazonaws.com
        Action:
        - sts:AssumeRole
    Policies:
    - PolicyName: lambdaGetDoorHistoryDynamoDbPolicy
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Action:
          - 'dynamodb:DescribeStream'
          - 'dynamodb:GetRecords'
          - 'dynamodb:GetSharedIterator'
          - 'dynamodb:ListStreams'
          - 'dynamodb:Query'
          Resource: !GetAtt dbDoorHistory.Arn
```

There's still a bit more to this, but let's dig in, and we'll add later.

This declares an IAM Role resource. Remember how the Lambda function above said '!GetAtt lambdaGetDoorHistoryRole.Arn'? Yeah, that's what this is. There are 2 properties in this resource, and neither is super straightforward to the beginner.

The AssumeRolePolicyDocument basically just ... ah, never mind, basically just copy this and do it. You can dig into IAM roles more on your own time.

The PolicyDocument is something you really need to understand, and is kind of straightforward. Use the 'Version' I have - don't ask questions. Effect is almost always Allow. Action tells AWS which exact permissions you want to provide. I could have said 'dynamodb:\*', which would grant all dynamodb permissions to the Lambda function. This would include things like creating databases, tables, deleting data, etc. While I trust this Lambda function since I wrote it, it's bad practice to grant \* unless you really need it. Be explicit and you might avoid some mistakes. The actions I specified are those required to perform the query in this Lambda function. AWS has a big huge list of all the IAM actions you can specify. Read at your own risk.

Finally, the Resource specifies the object against which the actions are valid. 'dynamodb:Query' grants access to query against ... what? !GetAtt dbDoorHistory.Arn. Here, this is referencing the DynamoDB resource created in a separate post. Feel free to copy the ARN of an existing DynamoDB you have on AWS already, or simply copy over the dbDoorHistory resource from my other post.

### Oh, but There's More!

The IAM CloudFormation snippet above was hefty enough for initial explanation, but you also need another policy in the role. Add the following to the script above:

```yml
    - PolicyName: lambdaGetDoorHistoryLogsPolicy
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Action:
          - 'logs:CreateLogGroup'
          - 'logs:CreateLogStream'
          - 'logs:PutLogEvents'
          Resource: arn:aws:logs:*:*:*
```

This next policy gives the Lambda function permission to write logs to CloudWatch. Trust me you want this. The Resource property in this policy is a hard-coded value of 'arn:aws:logs:\*:\*:\*'. Basically this means the Lambda can write logs to anywhere. You could certainly be more specific, and you probably ought to in a production environment, but for learning, you don't need to care about this.

## Oh, there's Even More!

If you know your way around python, you probably smelled a rat in the script above. There's NO ERROR HANDLING. Now, you might be totally fine with your Lambda function just aborting on an unhandled exception, but chances are you want to be more graceful in your response. Eventually, I end up using this Lambda function to respond to HTTP requests through API Gateway. I definitely need my Lambda to fail gracefully. Let's add some grace.

```python
import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
door_history_table = dynamodb.Table('doorHistory')

def request_handler(event, content):
    try:
        device_id = event['deviceId']
    except KeyError:
        return json.dumps({'message': "'deviceId' not found in function arguments"})
    try:
        db_response = door_history_table.query(
            KeyConditionExpression=Key('DeviceId').eq(device_id)
        )
    except:
        return json.dumps({'message': 'there was an error querying the database'})
    try:
        history = db_response['Items']
    except KeyError:
        return json.dumps({'message': 'there was an error extracting the results from the query'})
    try:
        ret_string = json.dumps({'data': history})
    except:
        return json.dumps({'message': 'there was an error serializing the results'})

```

In a production environment, you want to handle the possible exceptions that might get thrown. If you wire this up as an API Gateway, you really don't want 500 errors getting thrown around, or at least if you return a 500, you should make the message nice. In addition, in the 'except' blocks, you could log out more detailed information about the variables. What was in the event parameter? What did the database return? This is all information that will help you debug errors, but that you don't want your users to see.
