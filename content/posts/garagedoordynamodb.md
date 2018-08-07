---
slug: garage-door-setup-dynamodb
title: Setting up DynamoDB for Smart Garage Door
date: 2018-06-22T05:00
blurb: DynamoDB for your Garage Door!
categories: Garage Door;AWS
tags: IoT;CloudFormation;AWS;Samples;Garage Door
image_name: server-1235959_1920.jpg
---

# Intro

In this post, I outline exactly how I set up and configured DynamoDB using CloudFormation for my Smart Garage Door site. Let's get started!

## Design

In my serverless design architecture, I outlined 2 tables: GarageDoorHistory and GarageDoorChangeRequests. The first table is used to store the open/close states of the garage door over time, while the second table stores the open/close change requests made by the app. Let's start with the GarageDoorHistory table first.

### GarageDoorHistory Table

In this table, we will be storing data for a device over time. I use a *composite primary key*, made with the device id and the UNIX time. The CloudFormation resource is fairly straightforward.

```yml
Resources:
  dbDoorHistory:
    Type: 'AWS::DynamoDB::Table'
    Properties:
      TableName: 'doorHistory'
      AttributeDefinitions:
      -
        AttributeName: 'DeviceId'
        AttributeType: 'S'
      -
        AttributeName: 'UnixDate'
        AttributeType: 'N'
      KeySchema:
      -
        AttributeName: 'DeviceId'
        KeyType: 'HASH'
      -
        AttributeName: 'UnixDate'
        KeyType: 'RANGE'
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
```

The first property "TableName" is self explanatory.
AttributeDefinitions specifies a list of attributes and their types to be used in the key schema. DeviceId is a string (because AWS IoT device ids are strings), and so it gets an AttributeType of 'S'. Unix dates are integers, so that AttributeType is 'N'.

The KeySchema property specifies how the attributes are going to be used as keys in the table. In composite primary keys, a partition key and a sort key are specified. Partition keys are of type "HASH". DynamoDB hashes the DeviceId, using the result to figure out where to store/get the data. An item can only have 1 HASH key. Within that partition of the database, there can be multiple items with the same DeviceId, as long as they have separate UnixDate values. The UnixDate key of type "RANGE" is used to sort the data in the database. For our application, there cannot be more than 1 event for a given garage door at an exact UNIX time. Time makes a natural sort key for us.

The ProvisionedThroughput property just reflects what the default values would be if you made the table using the web interface.

Objects stored in this table will be of the format:

```json
{
    "DeviceId": "SomeDevicesId",
    "UnixDate": 123456789,
    "position": "open",
    "closing": false,
    "opening": false
}
```

### GarageDoorChangeRequests

The second table is identical in structure to the first. In the second table I store change requests for a particular garage door. In theory, there could be multiple requests for a garage door to change position at a single UNIX time. However, it's not very likely, so this table structure is just fine for now.

```yml
Resources:
  dbDoorChangeRequests:
    Type: 'AWS::DynamoDB::Table'
    Properties:
      TableName: 'doorChangeRequests'
      AttributeDefinitions:
      -
        AttributeName: 'DeviceId'
        AttributeType: 'S'
      -
        AttributeName: 'UnixDate'
        AttributeType: 'N'
      KeySchema:
      -
        AttributeName: 'DeviceId'
        KeyType: 'HASH'
      -
        AttributeName: 'UnixDate'
        KeyType: 'RANGE'
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
```

Objects stored in this table will be in the format:

```json
{
    "DeviceId": "SomeDevicesId",
    "UnixDate": 123456789,
    "DesiredState": "open"
}
```

### Wrapping Up

Voila! That's it! By putting your DynamoDB in a CloudFormation script, you can ensure that you can reproduce your stack for testing, and any changes you make can be tracked in a version control system.

Subsequent posts will detail how you might get data in or out of one of these tables.