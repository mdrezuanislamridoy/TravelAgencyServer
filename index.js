const app = require("./App");
require("dotenv").config();

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("App is listening to port : ", port);
});
