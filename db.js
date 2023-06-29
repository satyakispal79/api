const mongoose = require("mongoose");

mongoose
  .connect(process.env.db_local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Data Base");
  })
  .catch((error) => {
    console.log("Unable to Connect to Database", error);
  });
