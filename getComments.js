const request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio')

module.exports = {
    getThemComments: _getThemComments
}

// let url = 'https://www.reddit.com/r/warriors/'
function _getThemComments(url) {
    request(url, (error, response, html) => {
        if (!error) {

            let count = 0
            let currentdate = new Date()
            let timeDiff
            let title, submittedDate, submittedTime
            let json = []
            let comment = {}
            let countIndex = ''


            //grab whole html page from given url 
            let $ = cheerio.load(html)
            // set parent comments element as data object 
            $('.thing').filter(function () {
                let data = $(this)
                //assign wanted comment elements to variable 
                title = data.find('.entry').find('.title').find('.may-blank').text()
                submittedTime = data.find('.entry').find('.top-matter').find('.tagline').find('time').attr('datetime')
                submittedDate = data.find('.entry').find('.top-matter').find('.tagline').find('time').text()
                //set current time for time elapsed calulation(only get comments less than 24hrs old)
                timeDiff = (currentdate - new Date(submittedTime)) / 3600000

                if (timeDiff < 24) {
                    //set index count and object key name
                    count++
                    countIndex = 'Comment' + count
                    //build object for every comment found and push to array
                    comment = {
                        [countIndex]: {
                            title: data.find('.entry').find('.title').find('.may-blank').text(),
                            link: data.find('.entry').find('.top-matter').find('.title').children().first().attr('href'),
                            submittedTime: submittedTime,
                            submittedDate: submittedDate
                        }
                    }
                    json.push(comment)


                }

            })
            //strigify json array, write it to new file, and let the user know
            fs.writeFile(`Comments ${currentdate.toLocaleDateString()}.json`, JSON.stringify(json, null, 4), function (err) {

                console.log('File successfully written! - Check your project directory for the output.json file');

            })

        }
    })
}