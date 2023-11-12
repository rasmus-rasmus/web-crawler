const { normalizeURL } = require('./crawl.js');


function compareNormalizedToExpected(inputUrl, expectedUrl) {
    expect(normalizeURL(inputUrl)).toBe(expectedUrl);
}


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