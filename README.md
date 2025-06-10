# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. The goal is to gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The newest addition to this project is to implement identification, authentication, and authorization to our WTWR application. We did this by:

- expanding the user schema with an email and password
- creating routes and controllers for signing up and signing in
- creating routes and controllers for modifying the current user data
- protecting existing routes.

## Functionality

The WTWR application uses current weather information to filter clothing items. It will display the clothing options that are appropriate for the current weather. The filters are for "hot", "warm", or "cold" weather.

## Technologies and Techniques Used

This back-end project utilized MongoDB Atlas, Compass, and Postman. These applications were used to create the database, manage the database, and test the connection between our code and the database. A suite was made on Postman to assist with testing error handling and validation. This project utilizes modules, express, eslint, routes, controllers, and schemas.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
