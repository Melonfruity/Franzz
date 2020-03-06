const server = require('./app');
const { PORT } = require('./utils/config');
const { info } = require('./utils/logger');

server.listen(PORT, () => {
  info(`Server started on PORT: ${PORT}`);
});
