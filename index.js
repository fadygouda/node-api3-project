// code away!
const server = require('./server.js');
require('dotenv').config();
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
// i am having problems :/
