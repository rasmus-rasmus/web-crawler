function printReport(pages) {
    const initiationMessage = 'Crawl report: ';
    console.log('-'.repeat(initiationMessage.length));
    console.log(initiationMessage);
    console.log('-'.repeat(initiationMessage.length));

    const sortedPages = Object.entries(pages);
    
    sortedPages.sort((a,b) => (a[1] <= b[1]) ? 1 : -1);
    
    for (urlCount of sortedPages) {
        console.log(`Found ${urlCount[1]} internal links to ${urlCount[0]}`);
    }
}

module.exports = {
    printReport
}