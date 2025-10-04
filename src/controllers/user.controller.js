import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
// import { upload } from "../utils/multer.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { upload } from "../middlewares/multer.middleware.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from req.body
  // validate user details(not empty)
  // check if user already exists with email or username
  // if user exists, throw error
  // upload avatar and cover image to cloudinary
  // create user in db
  // return success response with user details (excluding password and refresh token)
  // check for user creation errors
  // return error response if any step fails
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = User.find({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(400, "User with this email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "Avatar and cover image are required");
  }
  const avatar = await uploadonCloudinary(avatarLocalPath, "Avatar");
  const coverImage = await uploadonCloudinary(coverImageLocalPath, "CoverImage");

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }
  res.status(201).json(
    new ApiResponse(201, "User registered successfully", createdUser)
  );
});

export { registerUser };
