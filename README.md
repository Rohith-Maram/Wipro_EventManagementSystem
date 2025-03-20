# Wipro_EventManagementSystem

This same information is also present at the end of the Document File for better Readability.

Installing this Project in your System:

For React: 

The required React File is provided with the name:

Frontend_EventManagementSytem.zip

1st step: cd - to the project directory and npm install. (Should install the node modules)

2nd step: npm start.

For ASP .Net Core Api:

The required React File is provided with the name:

Backend_EventManagementSytem.zip

1st step: In appsettings.json – Change the server name to current system database server name.

2nd step: go to Debug -> Start Debugging (or) F5 

For Database:

The required SQL File is provided with the name Database_Schema_EventManagementSystem.sql

Notes: 

•If the port number is running different other than in https://localhost:7013 for the backend files i.e. ASP .NET Core Web API(MVC). Please change the port number accordingly in React Files i.e.

1.	EventDetails.js
2.	Login.js
3.	Register.js
4.	UserEventDetails.js
5.	Redux -> actions -> EventAction.js
The Port number need to changed in all these files.

•The migration files are already present in the Migrations folder. So we can start the application directly by clicking f5. 

If in any case the backend is not connected to database, Please use these commands in Package Manager Console to add the migration files: 

->add-migration FinalMigration
->update-database

This Should add the necessary migration files and automatically create the Database and tables in MS SQL. Try this step only if the sql file does not create the database and its tables. 
•	After starting the application:
1.	First Register using valid email and password as Admin or User
2.	Then Login using the credentials used for Register.
3.	Admin can perform CRUD operations while the user cannot.
4.	In the Search section please provide the name of the event and Double Click on search button.
5.	To again view all the events Clear the search and Click on Search button again.
6.	The Date functionality in Search may not work so please avoid this functionality.
