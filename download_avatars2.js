var request = require("request");
var pw = require("./secrets2");
var fs = require("fs");
var input = process.argv.slice(2);

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url:
            "https://api.github.com/repos/" +
            repoOwner +
            "/" +
            repoName +
            "/contributors",
        headers: {
            "User-Agent": "Cain310",
            Authorization: pw.GITHUB_TOKEN
        }
    };
    request(options, function (err, res, body) {
        var data = JSON.parse(body);
        cb(err, data);
    });
}

getRepoContributors(input[0], input[1], function (err, result) {
    for (var i = 0; i < result.length; i++) {
        downloadImageByURL(
            result[i].avatar_url,
            "./listOfAvatars/" + result[i].login + ".jpg"
        );
    }
    err && console.log("Errors:", err);
    if (!input[0] || !input[1]) {
        console.log("Errors: invalid or missing arguments");
    }
});
function downloadImageByURL(url, filePath) {
    request(url).pipe(fs.createWriteStream(filePath));
}

