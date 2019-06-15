const express = require("express");
const app = express();
const scraper = require("./scraper");
const db = require("./db");

const PORT = 8080;
const log = console.log;

app.get("/", (req, res) => {
    res.send("server up and running");
    log(db);
})

app.get("/scrape", async (req, res) => {
    log("scraping");
    // call scrape function
    const [scrapedURLS] = await Promise.all([scraper.scrapeFunc()]);
    db.get("scrapedURLS")
        .push({chapter: 35, urls: scrapedURLS})
        .write();
    res.json({scrapedURLS});
    log("finished");
})

app.listen(PORT, () => {
    log(`listening for scrapes on ${PORT}`)
})