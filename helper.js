const fs = require("fs");
const https = require("https");
const PDFDocument = require("pdfkit");

// =========================================================================
// function to save the image URLs from scrape function to separate files
exports.saveImagesToFile = function({ urls, chapter }) {
    let page = 1;
    function saveImage(url, localPath) {
        let file = fs.createWriteStream(localPath);
        let request = https.get(url, (res) => res.pipe(file));
    };

    urls.forEach(url => {
        saveImage(url, `./manga_scrape/database/chapter${chapter}_${page}.jpeg`);
        page = page + 1;
    });
}

// ====================================================================
// function to save all images to single pdf file
exports.createPDF = function(chapter) {
    // Create a new document
    const doc = new PDFDocument();
    
    const options = {
        // fit: [600, 450],
        align: "center",
        valign: "center"
    }

    let path = chapter;

    // Recurrsion variables
    let count = 1;

    // Pipe its output somewhere
    doc.pipe(fs.createWriteStream("./manga_scrape/database/chapter_35.pdf"));

    // Add an image
    doc.image(`./manga_scrape/database/${path}_1.jpeg`, options);

    function addPages() {        
        count = count + 1;
        path = `./manga_scrape/database/${chapter}_${count}.jpeg`;

        doc.addPage().image(path, options);

        if(count >= 5) {
            return;
        } else {
            return addPages()
        }
    };
    addPages();
    doc.end();
}


module.exports = exports;