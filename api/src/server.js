const port = require('./config/port');
const app = require('./app');

app.listen(port, console.log(`Listening to port ${port}`))