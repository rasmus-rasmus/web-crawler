const { JSDOM } = require('jsdom');

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

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const aTagElements = dom.window.document.querySelectorAll('a');
    const urlsOut = [];
    for (aTag of aTagElements) {
        const url = aTag.href;
        if (aTag.href[0] === '/') {
            // relative url
            try {
                urlsOut.push(new URL(aTag.href, baseURL).href);
            } catch (err) {
                console.log(`${err.message}: ${aTag.href}`);
            }
        }
        else {
            // absolute url
            try {
                urlsOut.push(new URL(aTag.href).href);
            } catch (err) {
                console.log(`${err.message}: ${aTag.href}`);
            }
        }
    }
    return urlsOut;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}