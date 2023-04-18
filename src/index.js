const express = require('express');
const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(routers);

const port = 3000

app.listen(port, () => {
    console.log(`Running Server at ${port}`)
});