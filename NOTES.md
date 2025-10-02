// Important Notes BACKEND 
**Setup of the file**
cd src 
touch app.js constant.js index.js
package.json - "type" :"module"
"scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
  },
  this reloads the dotenv file without needing to use require synatx also updates the json file acc to ecma
mkdir controllers db middlewares models routes utils 

**Database Connection**
Database is always in another continent(use await and async)
import mongoose from "mongoose";
import { DB_Name } from "./constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );
    console.log("Connected to MongoDB successfully");
    return connectionInstance;
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })

  .catch((error) => {
    console.log("MongoDB Connection Failed", error);
  });