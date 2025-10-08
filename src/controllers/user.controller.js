import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
const generateAccessandRefreshToken = async(userId) => {
  try{
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return {accessToken,refreshToken};

  } catch(error){
    throw new ApiError(500,"Token generation failed")
  }

}
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

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(400, "User with this email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath, "Avatar");
  const coverImage = await uploadOnCloudinary(
    coverImageLocalPath,
    "CoverImage"
  );
  if (!avatar) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }
  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email,username, password } = req.body;
  if(!email||!username||!password){
    throw new ApiError(400,"Both fields are necesarry")
  }

  const user = await User.findOne({
    $or : [{username},{email}]
  })
  if(!user){
    throw new ApiError(404,"User not found")
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401,"Invalid password")
  }
  const {accessToken,refreshToken} = await generateAccessandRefreshToken(user._id);
  if(!accessToken||!refreshToken){
    throw new ApiError(500,"Token generation failed")
  }
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User logged in successfully", loggedInUser))

  const logoutUser



});
export { loginUser };

export { registerUser };
