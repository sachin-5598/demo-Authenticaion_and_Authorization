const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server is listening at port: ${port}`);
});
