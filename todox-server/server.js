const express = require('express');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const TodoRoutes = require('./routes/todoRoutes')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

require('./db/connection');

app.use('/todo',TodoRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});