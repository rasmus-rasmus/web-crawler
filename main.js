const { JSDOM } = require('jsdom');
const { getURLsFromHTML } = require('./crawl.js');




const dom = new JSDOM('<a href=https://google.com>this is an anchor tag</a>');

for (ulr of getURLsFromHTML('<a href=https://google.com>this is an anchor tag</a>', 'https://google.com')) {
    console.log(ulr);
}