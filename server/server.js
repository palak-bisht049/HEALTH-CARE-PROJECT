//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const doctorRoutes = require("./routes/doctorRoutes");
const multer = require('multer');
const dotenv = require("dotenv");
dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Routes
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
    res.send("working");
});

app.get("/home", (req, res) => {
    res.render("home", {
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    });
});

app.get("/allusers", (req, res) => {
    res.render("users", {
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    });
});

// Profile upload route
app.post('/profile', upload.single('avatar'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
