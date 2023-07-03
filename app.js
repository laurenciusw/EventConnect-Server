require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
// module.exports = app
