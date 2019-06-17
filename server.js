const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// Relative imports
const scraper = require("./scraper");
const db = require("./db");
const helper = require("./helper");

const PORT = 5000;
const log = console.log;

// log(db);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("server up and running");
});

app.post("/scrape", async (req, res) => {
    const { title, chapter } = req.body;
    log("scraping");
    // call scrape function
    const [scrapedURLS] = await Promise.all([scraper.scrapeFunc(chapter)]);
    db.set(`${title}.chapter`, chapter)
        .write();
    db.set(`${title}.urls`, scrapedURLS)
        .write();
    res.json({scrapedURLS});
    log("finished");
});

app.get("/save", (req, res) => {
    const { scrapedURLS: [chapter35, chapter20]} = db.getState();
    log("saving...");
    helper.saveImagesToFile(chapter20);
    res.send("Your files have been generated")
    log("Your files have been saved!")
});

app.get("/createpdf", (req, res) => {
    log("generating pdf file...");
    helper.createPDF("chapter35");
    log("Your pdf is ready.");
    res.send("pdf generated!")
})

app.post("/test", (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    log(`listening for scrapes on port ${PORT}`);
});