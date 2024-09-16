const toSlug = (str) => {
    return str
        .toLowerCase() // Corrected to toLowerCase
        .replace(/[\s_]+/g, '-') // Corrected to replace
        .replace(/[^\w-]+/g, ''); // Corrected to replace
}

module.exports = toSlug;
