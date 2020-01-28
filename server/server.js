const app = require('./app');
const { PORT } = require('./utils/config');

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});