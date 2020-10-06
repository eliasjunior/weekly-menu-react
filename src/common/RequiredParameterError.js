class RequiredParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequiredParameterError";
  }
}

export default RequiredParameterError;
