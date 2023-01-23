const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(app.get('port'), () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

// Path: server/app.js
