export function requiredParameter(name) {
  throw new Error(`${name} is required`);
}
