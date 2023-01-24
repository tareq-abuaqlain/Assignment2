const app = require('./app');

const port = process.env.PORT || 8002;

app.listen(port, () => {
  console.log(`Server is up on port http://localhost:${port}`);
});