const mongoose = require("mongoose");

async function connDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((conn) => {
      console.log(`Connected to ${conn.connections[0].name} Database`);
      return conn;
    })
    .catch((e) => console.log(e));
}

module.exports = connDB;
