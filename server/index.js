require("dotenv").config();
const express = require("express");
const morgan = require('morgan')
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./routes/routes");
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 8080;
const app = express();

const sync = async () => await sequelize.sync({alter:true})
sync()
app.use(morgan('tiny'))
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT,() => {
  console.log(`Server running on http://localhost:8080`);
})
