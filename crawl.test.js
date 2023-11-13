const { normalizeURL, getURLsFromHTML } = require('./crawl.js');


/////////////
// HELPERS //
/////////////

function compareNormalizedToExpected(inputUrl, expectedUrl) {
    expect(normalizeURL(inputUrl)).toBe(expectedUrl);
}


/////////////////////////
// NORMALIZE URL TESTS //
/////////////////////////

test('http', () => {
    const inputUrl = 'http://my.test';
    const expectedUrl = 'my.test';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('https', () => {
    const inputUrl = 'https://my.test';
    const expectedUrl = 'my.test';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('case insensitive', () => {
    const inputUrl = 'https://MY.test';
    const expectedUrl = 'my.test';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('trailing slash', () => {
    const inputUrl = 'https://my.test/';
    const expectedUrl = 'my.test';
    compareNormalizedToExpected(inputUrl, expectedUrl)
})


test('path with trailing slash', () => {
    const inputUrl = 'https://my.test/path/to/resource/';
    const expectedUrl = 'my.test/path/to/resource';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('path without trailing slash', () => {
    const inputUrl = 'https://my.test/path/to/resource';
    const expectedUrl = 'my.test/path/to/resource';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('subdomain', () => {
    const inputUrl = 'https://subdomain.my.test/';
    const expectedUrl = 'subdomain.my.test';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})

test('query string', () => {
    const inputUrl = 'https://my.test/p/a/t/h?query=string';
    const expectedUrl = 'my.test/p/a/t/h';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('query string with trailing slash on path', () => {
    const inputUrl = 'https://my.test/p/a/t/h/?query=string';
    const expectedUrl = 'my.test/p/a/t/h';
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


test('invalid url', () => {
    const inputUrl = '/thisisnot/avalidurl';
    const expectedUrl = null;
    compareNormalizedToExpected(inputUrl, expectedUrl);
})


//////////////////////////////
// GET URLS FROM HTML TESTS //
//////////////////////////////

test('absolute url', () => {
    const htmlBody = '<a href=https://web.site>This is a web site</a>';
    const baseURL = 'https://other.web.site';
    const expected = ['https://web.site/'];
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expected);
})

test('relative url', () => {
    const htmlBody = '<a href=/relative/url>Relative</a>'
    const baseURL = 'https://the.base';
    const expected = ['https://the.base/relative/url'];
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expected);
})

test('all urls', () => {
    const htmlBody = `<a href=https://absolute.url>Absolute</a> 
                      <a href=/relative/url>Relative</a>`;
    const baseURL = 'https://the.base';
    const expected = ['https://absolute.url/', baseURL+'/relative/url'];
    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expected);
})