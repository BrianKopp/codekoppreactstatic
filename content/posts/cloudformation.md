---
slug: cloud-formation-intro
title: Cloud Formation Introduction
date: 2018-06-06T11:30
blurb: Ever forget how you made something? Never again!
categories: AWS
tags: AWS;CloudFormation;
image_name: sky-690293_1920.jpg
---

# Program your Infrastructure

Ever go through a bunch of steps in a tutorial, get something up and running, then forget what you did or what needs to change? Cloud Formation is for you.

Cloud Formation is an AWS technology that allows you to describe exactly what you need in a JSON or YAML text file, send it to AWS calling it a "stack", and have AWS create the resources in a predictable, deterministic way. Then, when you're done with the project or tutorial, you can delete the entire stack. Cloud Formation is free, you only pay for using what you create. The big benefit here is being able to put your AWS resources into version control and create multiple copies of your AWS resources for testing and production.

Here is an example of a Cloud Formation template that creates an S3 bucket.

```yaml
Resources:
  S3Bucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: 'example-bucket'
```

It's really not hard to create an S3 bucket using the AWS web console, but what if you have want to provision

* 10 S3 buckets whose names need to change depending on different factors
* Several DynamoDB tables
* Lambda functions to perform actions on the S3 buckets and DynamoDB tables
* IAM roles and policies to enable all those actions securely

If you are physically capable of repeatably performing all these actions via the AWS web console or AWS command-line-interface without error, you are some kind of super-human. Having these commands in a Cloud Formation template allows you to create complicated resource stacks in a determined and predictable fashion.

I am using Cloud Formation to create my garage door web application. Everything used for the entire application, except for the Raspberry Pi Zero hardware, is created using Cloud Formation.
