export const handleSucessResponse = (res, data) => {
  res.status(200).json({ message: "Success", data });
};

export const handleCreatedResponse = (res, data) => {
  res.status(201).json({ message: "Created", data });
};

export const handleInvalidRequestError = (res) => {
  res.status(400).json({ message: "Invalid request" });
};

export const handleNotFoundError = (res) => {
  res.status(404).json({ message: "Not found" });
};

export const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
};

export const handleError = (res, error) => {
  res.status(500).json({ errors: error });
};
