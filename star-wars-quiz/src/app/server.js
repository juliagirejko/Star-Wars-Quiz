const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:4200',
  clientID: '7zBG6M3ea458ip8uD3MHPbeHVgoQnLsK',
  issuerBaseURL: 'https://dev-0j5lmt1bydaua14i.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

app.use(auth(config));

// Serve your Angular app
app.use(express.static('./dist/your-app-name')); // Adjust the path accordingly

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
