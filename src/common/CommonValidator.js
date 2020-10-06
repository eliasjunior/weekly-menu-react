class CommonValidator extends Error {
  constructor(message) {
    super(message);
    this.name = "CommonValidator";
  }
}

export default CommonValidator;
