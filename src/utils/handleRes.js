const handleRes = {
  handleSucessResponse: (res, data) => {
    res.status(200).json({ message: "Success", data });
  },
  handleCreatedResponse: (res, data) => {
    res.status(201).json({ message: "Created", data });
  },
  handleInvalidRequestError: (res) => {
    res.status(400).json({ message: "Invalid request" });
  },
  handleNotFoundError: (res) => {
    res.status(404).json({ message: "Not found" });
  },
  handleServerError: (res, error) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  },
  handleError: (res, error) => {
    res.status(500).json({ errors: error });
  },
  handleUserAlreadyExists: (res) => {
    res
      .status(409)
      .json({ message: "User with email or username already exists" });
  },
};

export default handleRes;
