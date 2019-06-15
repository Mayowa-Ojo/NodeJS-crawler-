const fs = require("fs");
const https = require("https");
const PDFDocument = require("pdfkit");

// ====================================================================
// function to save the image URLs from scrape function to separate files

// const url = "https://img.freepik.com/free-photo/white-crumpled-paper-texture-background_64749-706.jpg?size=626&ext=jpg"
// saveImageToFile(url, "./sample.jpg")

exports.saveImageToFile = function(url, localPath) {
    let file = fs.createWriteStream(localPath);
    let request = https.get(url, (res) => res.pipe(file));
};

// ====================================================================
// function to save all images to single pdf file

// Create a new document
const doc = new PDFDocument();

const options = {
    fit: [800, 600],
    align: "center",
    valign: "center"
}

let path = `sample`

// Recurrsion variables
let count = 1;

// Pipe its output somewhere
doc.pipe(fs.createWriteStream("test.pdf"));

// Add an image
doc.image(`./${path}1.jpg`, options);

function addPages() {        
    count = count + 1;
    path = `./sample${count}.png`;

    doc.addPage()
        .image(path, options);

    if(count >= 3) {
        return;
    } else {
        return addPages()
    }
};

addPages();

doc.end();


module.exports = exports;