const capitaliseFirstLetter = (input) => {
    if (typeof input !== "string" || input.length === 0) {
        return; // I should handle this case better. Should it throw an error?
    }
    return input.replace(input[0], input[0].toLocaleUpperCase());
};

module.exports = capitaliseFirstLetter;
