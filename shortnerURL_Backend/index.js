// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000; // You can change this port as needed

const corsOptions = {
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
// Middleware to parse JSON requests
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shortnerURL");

const shortnerSchema = mongoose.Schema({
    longURL: {
        type: String,
        required: true,
    },
    shortURL_id: {
        type: String,
        required: true,
    },
});

// Use the correct collection name in mongoose.model
const ShortnerURLModel = mongoose.model("shortnerURL", shortnerSchema);

const idGenerator = (length) => {
    const s =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let id = "";

    for (let i = 0; i < length; i++) {
        const x = Math.floor(Math.random() * s.length);
        id += s.charAt(x);
    }
    return id;
};

// Define a simple route
app.post("/create", async (req, res) => {
    const id = idGenerator(7);

    if (!req.body.longURL) {
        res.json({ error: "longURL required" });
        return;
    }
    const object = await ShortnerURLModel.create({
        longURL: req.body.longURL,
        shortURL_id: id,
    });
    res.json({ object });
});

app.post("/getLongURL", async (req, res) => {
    const shortUrlId = req.body.shortUrlId;

    if (!shortUrlId) {
        res.json({ error: "shortUrlId required" });
        return;
    }
    const foundObject = await ShortnerURLModel.findOne({
        shortURL_id: shortUrlId,
    });

    if (foundObject) {
        res.json({ redirectUrl: foundObject.longURL });
    } else {
        res.json({ notFound: true });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
