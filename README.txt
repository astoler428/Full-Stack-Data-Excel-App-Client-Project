Client folder is on GitHub: Frontend-Excel-App-React-Netlify (deployed to Netlify from GitHub)
Live site: https://aligned-solutions.netlify.app/
Must run backend server on http://localhost:3000


Backend uses json files to mimic database as my client wants access to the backend files.


How I deployed to Netlify: 

1) On Netflify add environment variable CI = false (I believe)

2) Add netlify.toml file to the root directory of your project and paste the following code in it:

[[redirects]]
  from = "/*"
  to = "/"
  status = 200