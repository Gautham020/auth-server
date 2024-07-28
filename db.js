// const { MongoClient, ServerApiVersion } = require("mongodb");
// const env = require("dotenv");
// env.config();
// const uri = process.env.MONGO_URI;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const connectToMongo = async () => {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//   }
// };

module.exports = connectToMongo;
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to mongo is a success");
  } catch (err) {
    console.log("Connection to mongo is Unsuccessful", err);
  }
};

// module.exports = ConnectToMongo;
