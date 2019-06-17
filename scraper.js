const request = require("request")
const rp = require("request-promise")
const $ = require("cheerio")
const puppeteer = require("puppeteer")

const log = console.log;
const BASE_URL = "http://kissmanga.xyz/boruto-naruto-next-generations/chapter-";

exports.scrapeFunc = async (chapter) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });;
    console.log(await browser.version());
    const pagesArr = []
    const pages = 6;
    let current_page = 1;
    const scraper = async (BASE_URL) => {
        const page = await browser.newPage();
        let url = `${BASE_URL}${chapter}#${current_page}`
        await page.goto(url);
        log(`Scraping: ${url} with current page at ${current_page} and pagesArr is ${pagesArr.length} items long`)
        const scrape = await page.evaluate(() => {
            const data = $(".comic_wraCon img").attr("src")
            return data;
        })
        await pagesArr.push(scrape);
        current_page = await current_page + 1;
        await page.close();
        if(current_page >= pages) {
            return;
        } else return await scraper(BASE_URL);
    }
    //===================================
    await scraper(BASE_URL);
    await browser.close();
    return pagesArr;
};

// log("connected")

module.exports = exports;