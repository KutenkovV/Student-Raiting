require("dotenv").config();
const express = require('express');
const morgan = require('morgan')
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const cors = require("cors");
const sequelize = require("./db");
const basicAuth = require('express-basic-auth')
const router = require("./routes/routes");
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 8080;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const app = express();


const sync = async () => await sequelize.sync({alter:true})
sync()
//app.use(express.basicAuth(username,password));

// app.use(basicAuth({
//   users: { [username]: password }
// }))

app.use(morgan('tiny'))
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT,() => {
  console.log(`Server running on http://localhost:8080`);
})
