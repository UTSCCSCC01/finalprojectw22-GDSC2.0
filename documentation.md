# **Documentation**

## Frontend

The main file in our frontend is App.js which contains all the components of the website. Based on the chosen endpoint this file routes to the appropriate component in our program.

### Components
About:
This page gives some information about GDSC and the goal of the community 

Admin:
An admin page that allows admins to see all the students and mentors part of GDSC along with information about resources, events, and past projects

Application:
This page allows students and mentors to submit applications in order to join GDSC projects. The forms for students and mentors are separate forms

Homepage:
The GDSC logo appears at the top of the navbar and clicking it will take the user back to the homepage

NavbarMenu:
An interactive navigation bar that allows users to easily transition to different parts of the website

Login:
A login in screen that prompts users for their username, email, and password

Register:
A register page for new users that do not have an account and want to create one


## Backend

The main file in the backend is server.js which receives API requests and forwards those requests to the appropriate file

### Routes
Login:
This route handles a login action by checking the user credentials with the database

Register:
This route handles a register action by storing the necessary information in the database

Answers:
This route deals with the answers given by potential candidates through the application form. This information is also stored in the database

### Models
Users:
This file outlines the required information needed to create a user in the database. This includes a username, email, and password

Teams:
This file outlines how teams with students and mentors will be stored in the database

Answer:
This file outlines the format of the answers provided from the application form and how they will look in the database.

Resource:
This model outlines the needed attributes a user could have for the resources page


### Database

Mongo DB is the database framework chosen to store information that the website gathers and needs to function
