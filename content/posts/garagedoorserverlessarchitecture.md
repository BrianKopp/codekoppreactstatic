---
slug: garage-door-serverless-architecture-intro
title: Garage Door Serverless Application
date: 2018-06-06T11:00
blurb: A real-world serverless application
categories: Garage Door;AWS
tags: IoT;CloudFormation;Lambda;AWS;Samples;Garage Door
image_name: binary-code-475664_1920.jpg
---

# Serverless Application

One of the big perks of moving to Amazon is that now you don't have to manage the hardware for your server. Amazon provides a system and a framework on which to build your app. They manage all the hardware, you just tell them what you need.

It used to be that if you wanted to make your own web application, you would set up a standard PHP application like WordPress running on a LAMP (Linux, Apache, MySQL, PHP) stack. You had to know how to configure the database and  Apache servers, manage your IP and DNS, and maintain the server, or pay for shared server storage probably on the order of $5/mo. You could do it, and it wouldn't be too bad, but if your app needed more bandwidth, you have to start thinking about how to scale up. Now you need dedicated servers, or many servers. Now this starts to become a more unwieldy situation.

Enter: AWS. With a few changes in how you think about things, you can configure your web app to run on AWS. Scale issues go out the window. You pay only for what you need.

## Pillar #1: Static Site Hosting with S3

Static HTML pages were a thing of the past 5 years ago - a design pattern used by puny pre-2000's humans who didn't know how to use PHP. Dynamic web pages became the pattern, which works pretty well. With advances in the use of client-side javascript, static pages have once again erupted onto the scene. Today's static HTML pages are a far-cry from the static pages of the 1990's. They are sleek, fast, and dynamic. But how is that possible?

Static web sites today use HTML files that don't change. Instead to make the content dynamic, developers use sophisticated (and sometimes too complex) javascript libraries to get data to populate the HTML template. Angular and React are among the most popular javascript libraries.

Static HTML pages give you huge benefits. Your pages can be cached locally, cached on networks, etc. Visitors to your page think "Wow, that page loads fast!" Instead of waiting for a round-trip to a linux server running on a shared host where you are fighting for resources, your HTML pages are read directly and immediately from AWS. AWS will even cache your HTML files in sites close to your users so that latency is even reduced.

## Pillar 2: User Authentication with AWS Cognito

If parts of your website require login, you can use AWS Cognito to manage user authentication and logged-in status. I haven't dug into this technology yet, but I will update this section later.

## Pillar 3: REST Endpoints with Api Gateway

Api Gateway allows you to set up HTTP URLs which connect to resources and allow users to perform dynamic actions on your site. In my smart garage door web app, users will need to know whether their garage door is open or closed, or request that the door be open or closed. These sorts of requests go through Api Gateways.

## Pillar 4: Lambda - Code without the Server

Lambda functions are pieces of code which run when different things happen, e.g. Api Gateway request, S3 bucket change, etc. AWS handles all of the hardware needed to run your Lambda functions. If you have 1 request per second or 10,000 requests per second. AWS spins up and spins down containers (little boxes that do things for you) to execute those functions. In my smart garage door web app, lambda functions retrieve and store data back and forth with DynamoDB and the IoT device.

## Pillar 5: DynamoDB - Application Database

Goodbye mysql. Goodbye SQL Server. DynamoDB can do most of what you need in a serverless application. If you need joins across 15 tables to run your application, then serverless probably isn't for you. If you can store your data using just a key or two, which is most things, DynamoDB is just fine. If you need a relational database, check out Amazon RDB.

Moving forward, I will use all these technologies to create a Smart Garage Door website, never touching or maintaining a server. I will leverage other technologies besides those listed here, but these are the fundamental building blocks used to make a static web app.