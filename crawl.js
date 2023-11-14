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

async function crawlPage(baseUrl, url, pages) {
    let htmlBody;
    try {
        const response = await fetch(baseUrl);
        if (response.status >= 400) {
            console.log(`Got an error status code: ${response.status}`);
            return
        }
        else if (!response.headers.get('content-type').includes('text/html')) {
            console.log(`Unsupported content type: ${response.headers.get('content-type')}`);
            return
        }
        htmlBody = await response.text();
    } catch (err) {
        console.log(`Failed to fetch url: ${err.message}`);
    }
    console.log(htmlBody);
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}