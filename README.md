# Social Network API

## Table of Contents

* [Description](#description)

* [Technologies](#technologies)

* [Visuals](#visuals)

## Description

This social network API is a fully functional REST API built from scratch using Express.js for routing, a MongoDB database, and the Mogoose ODM. The API is meant to handle most of the functionality that todays modern social networks employ. A full video walkthrough is provided in the [visuals](#visuals) section, however the API has the following functionality:

* Can create a new user
* Can get a list of all users or a user by its ID
* Can update a user by its ID or delete a user by its ID
* Can add a one-directional friend and add that person to a friends list
* Can create a thought
* Can get all thoughts or a single thought by its ID
* Can update a thought by its ID or delete a thought by its ID
* Can post reactions to thoughts 
* Can delete a reaction to a thought by the thought ID and the reaction ID

Side note: There is a file for seeds but the app does not currently have the functionality to seed.

## Technologies 

* JavaScript
* Node.js
* Express.js
* MonogDB
* Mongoose

## Visuals

To see a full walkthrough of how to initialize and operate the application, please follow this [link](https://drive.google.com/file/d/1pp1G6T3B3UDAieZWQ4R_VhJ1ixykCVhE/view?usp=sharing). Please note that since the entire functionality is that of a REST API, all routes are tested in Insomnia after the server has been started by invoking nodemon in the video.