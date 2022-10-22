const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, });
const db = mongoose.connection;

db.on("error", (err) => console.error("Mongoose error", err));

db.once("open", async () => {x
    const routes = require('./routes')
    app.use(routes())
    app.listen(process.env.PORT, () => {
        console.log(`server started at ${process.env.PORT}`)
    }).error((err) => {
        console.log(err);
    })
});