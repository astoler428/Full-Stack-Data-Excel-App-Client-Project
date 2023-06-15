Backend uses json files to mimic database as my client wants access to the backend files.

Live site: https://aligned-solutions.netlify.app/ (if run locally, change cors URL accordingly)
Must run backend server on http://localhost:3000

Backend uses JSON files to mimic a database as my client wants access to the backend files. There is another version with a MongoDB backend database.
________________________________________________________________________________________

Client Folder README:

Front end of an application built for a client. Features requested by the client include:

-An 'Add Page' with a form to submit data including a source, date and four textboxes of information
  -Data gets sent to the backend and populated into 3 different excel spread sheets as well as stored in a database
-A 'Tag page' to retrieve a random datapoint from the database based on optional filters with the ability to then add new tags to the datapoint

Used in this project:

-React Router with nested routes
-API calls to backend
-Controlled form components
________________________________________________________________________________________
Server Folder README:

Back end of an application built for a client. Create, Read and Update.

-creates three excel files
-Upon receiving data from front end, populate each excel file with certain pieces of the data and also store in database
-allows user to request random data points based on filters of tags
-allow user to update data with new tags

Used in this project:

-Node/express
-Custom middleware for routes
-MVC file structure
-This version simulates a database using JSON files, but there is also a version that uses MongoDB and Mongoose
