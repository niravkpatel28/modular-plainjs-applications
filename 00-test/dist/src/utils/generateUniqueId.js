var generateUniqueId = function (config) {
    if (config === void 0) { config = { prefix: "" }; }
    var prefix = config.prefix;
    if (prefix) {
        return prefix + "-" + Math.random().toString(36).substring(2);
    }
    return Math.random().toString(36).substring(2);
};
export { generateUniqueId };
