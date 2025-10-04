// Important Notes BACKEND 
**Setup of the file**
npm i express mongoose cookie-parser cors mongoose-aggregate-paginate-v2 bcrypt jsonwebtoken
cloudinary multer
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

**Errors**  
informational Response=(100-199)
Successful Response(200-299)
Client Error Message(400-499)
Server Error Message(500-599)

**Middlewares in Mongoose**
Prehook- just when data is about to be saved the system performs a certain block of code just bbefore saving

UserSchema.pre("save", async function(next){
  if(!this.isModified) return next();
  this.password =bcrypt.has(this.passowrd,10)
  next()
})
**Cloudinary**
fs = filesystem used in sytemic arrangemenets of a file for eg link unlink upload synchronously asynchronously 
**HTTP**
URL-Uniform Resource Locater
URI- Uniform Resource Identifier 
URN - " " Name

What are HTTP Headers 
metadata - Key value Pair
caching authentication manage state

Request Headers - From Client
Response Headers - From server
Representation headers - encoding/ compression
payload Headers - data

Methods
GET: retrieve a resource
HEAD: No message body(response Headers only)
OPTIONS: what operators are availabLe
DELETE : remove a resource
PUT : replace a resource
POST : interact with resource
PATCH : change part of a resource
**User Controller**
Register
  // get user details from req.body
  // validate user details(not empty)
  // check if user already exists with email or username
  // if user exists, throw error
  // upload avatar and cover image to cloudinary
  // create user in db
  // return success response with user details (excluding password and refresh token)
  // check for user creation errors
  // return error response if any step fails