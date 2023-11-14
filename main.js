const { JSDOM } = require('jsdom');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');
const { argv } = require('node:process');
const { start } = require('node:repl');

async function main() {
    if (argv.length !== 3) {
        console.log("Error: accepts only one command line argument.");
        return;
    }
    const baseUrl = argv[2];

    const startMessage = `Starting crawl of: ${baseUrl}...`;
    console.log('-'.repeat(startMessage.length));
    console.log(startMessage);
    console.log('-'.repeat(startMessage.length));

    pages = await crawlPage(baseUrl, baseUrl, {});

    printReport(pages);
}

main();