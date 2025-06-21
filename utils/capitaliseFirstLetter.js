const capitaliseFirstLetter = (input) => {
    if (typeof input !== "string" || input.length === 0) {
        return;
    }
    return input.replace(input[0], input[0].toLocaleUpperCase());
};

module.exports = capitaliseFirstLetter;
