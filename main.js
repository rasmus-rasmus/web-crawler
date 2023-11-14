const { JSDOM } = require('jsdom');
const { crawlPage } = require('./crawl.js');
const { argv } = require('node:process');

// print process.argv
function main() {
    if (argv.length !== 3) {
        console.log("Error: accepts only one command line argument.");
        return;
    }
    const baseUrl = argv[2];
    crawlPage(baseUrl, '', {});
}

main();