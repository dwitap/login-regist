const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");
const cors = require("cors");
const fs = require("fs");

dotenv.config();

const PORT = 2000;

const app = express();

app.use(cors());
app.use(express.json());

const emailer = require("./lib/emailer");
const handlebars = require("handlebars");

app.post("/email", async (req, res) => {
  const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8");
  const compiledHTML = handlebars.compile(rawHTML);
  const result = compiledHTML({
    username: "nara",
  });

  await emailer({
    to: "natayaditama@gmail.com",
    html: result,
    subject: "Test Email",
    text: "Hallo sirius",
  });

  res.send("Email send");
});

const homeRoute = require("./routes/homeRoute.js");
const authRoute = require("./routes/authRoute.js");
const bookRoute = require("./routes/bookRoute.js");
const passRoute = require("./routes/passwordRoute.js");
const profileRoute = require("./routes/profileRoute.js");

app.use("/", homeRoute);
app.use("/api/auth", authRoute);
app.use("/api/book", bookRoute);
app.use("/api/password", passRoute);
app.use("/api/profile", profileRoute);

app.listen(PORT, () => {
  db.sequelize.sync({ alter: true });

  console.log("Listening in port", PORT);
});
