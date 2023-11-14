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
        if (aTag.href.length === 0) {
            continue;
        }
        if (aTag.href[0] === '/') {
            // relative url
            try {
                urlsOut.push(new URL(aTag.href, baseURL).href);
            } catch (err) {
                console.log(`Relative url ${aTag.href} failed with message: ${err.message}`);
            }
        }
        else {
            // absolute url
            try {
                urlsOut.push(new URL(aTag.href).href);
            } catch (err) {
                console.log(`Absolute url ${aTag.href} failed with message: ${err.message}`);
            }
        }
    }
    return urlsOut;
}

async function crawlPage(baseUrl, currentUrl, pages) {
    try {
        const currentUrlObj = new URL(currentUrl);
        const baseUrlObj = new URL(baseUrl);
        if (currentUrlObj.host != baseUrlObj.host) {
            return pages;
        }
    } catch (err) {
        console.log(`Error when parsing ${currentUrl}: ${err.message}`);
        return pages;
    }
    
    const normalizedUrl = normalizeURL(currentUrl);
    if (pages.hasOwnProperty(`${normalizedUrl}`)) {
        pages[`${normalizedUrl}`] += 1;
        return pages;
    } else {
        pages[`${normalizedUrl}`] = baseUrl === currentUrl ? 0 : 1;
    }
    
    try {
        console.log(`Crawling ${normalizedUrl}...`);
        const response = await fetch(currentUrl);
        if (response.status >= 400) {
            console.log(`Got an error status code: ${response.status}`);
            return pages
        }
        else if (!response.headers.get('content-type').includes('text/html')) {
            console.log(`Unsupported content type: ${response.headers.get('content-type')}`);
            return pages
        }
        const htmlBody = await response.text();
        const urlsInResponse = getURLsFromHTML(htmlBody, currentUrl);
        for (newUrl of urlsInResponse) {
            pages = await crawlPage(baseUrl, newUrl, pages);
        }
        return pages;
    } catch (err) {
        console.log(`Failed to fetch url: ${err.message}`);
        return pages
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}