function normalizeURL(url) {
    let fullPath;
    try {
        const urlObj = new URL(url);
        const host = urlObj.host;
        const path = urlObj.pathname;
        fullPath = host + path;
    } catch (err) {
        return null;
    }
    if (fullPath.length > 0 && fullPath[fullPath.length-1] === '/') {
        fullPath = fullPath.slice(0, fullPath.length - 1);
    }
    return fullPath;
}

module.exports = {
    normalizeURL
}