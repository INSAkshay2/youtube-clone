class ApiResponse {
  constructor(statusCode, data, message = "Success", res = null) {
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = statusCode < 400;
  }

  success(data, message = "Success") {
    return this.res.status(200).json({
      status: "success",
      message,
      data,
    });
  }

  error(message = "An error occurred", statusCode = 500) {
    return this.res.status(statusCode).json({
      status: "error",
      message,
    });
  }
}
