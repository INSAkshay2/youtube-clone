const asynchHandler = (requestHandler) => {
  (re, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      console.error("Error in async handler:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
  };
};

export { asyncHandler };
