const express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express(),
    colors = require('colors'),
    port = 8081

var url = 'https://www.reddit.com/r/warriors/'

request(url, (error, response, html) => {
    if (!error) {
        var count = 0
        var currentdate = new Date()
        var timeDiff
        var $ = cheerio.load(html)

        var title, submittedDate, submittedTimed
        var json = []
        var comment = {}
        var countIndex = ''

        $('.thing').filter(function () {
            var data = $(this)

            title = data.find('.entry').find('.title').find('.may-blank').text()

            submittedTimed = data.find('.entry').find('.top-matter').find('.tagline').find('time').attr('datetime')
            submittedDated = data.find('.entry').find('.top-matter').find('.tagline').find('time').text()
            timeDiff = (currentdate - new Date(submittedTimed)) / 3600000
            if (timeDiff < 24) {

                count++
                countIndex = 'Comment' +count
                comment = {
                    [countIndex]: {
                        title: data.find('.entry').find('.title').find('.may-blank').text(),
                        link: data.find('.entry').find('.top-matter').find('.title').children().first().attr('href'),
                        submittedTime: submittedTimed,
                        submittedDate: submittedDated
                    }
                }
                json.push(comment)


            }

        })
        fs.writeFile(`Comments ${currentdate.toLocaleDateString()}.json`, JSON.stringify(json, null, 4), function (err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        })

    }
})

app.listen(port)
console.log(`The Magic Happens at ${port}`.rainbow)