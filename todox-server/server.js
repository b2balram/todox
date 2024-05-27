const express = require('express');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const TodoRoutes = require('./routes/todoRoutes');
const { authMiddleware } = require('./middleware/descope');
const app = express();
const port = process.env.PORT || 5000;

require('./db/connection');
require("./scheduler/reminderScheduler")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(authMiddleware)

app.use('/todo',TodoRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});