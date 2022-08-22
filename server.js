const { app } = require('./application')
const server = require("http").Server(app);

const PORT = process.env.PORT || 1234;

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

