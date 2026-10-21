const capitaliseFirstLetter = (input) => {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }
  if (input.length === 0) {
    throw new Error("Input cannot be empty");
  }
  return input[0].toUpperCase() + input.slice(1);
};

module.exports = capitaliseFirstLetter;
