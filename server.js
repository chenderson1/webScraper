const express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express(),
    colors = require('colors'),
    port = 8081




    var url = 'https://www.reddit.com/r/warriors/'

    request(url, (error, response, html)=>{
        if(!error){
            var currentdate = new Date()
            var timeDiff
            var $ = cheerio.load(html)

            var title, submittedDate
            var json = {title: '', submittedDate:''}

            $('.thing').filter(function(){
                var data = $(this)

                json.title = data.find('.entry').find('.title').find('.may-blank').text()
                json.submittedDate = data.find('.entry').find('.top-matter').find('.tagline').find('time').attr('datetime')
                
                timeDiff= (currentdate - new Date(json.submittedDate)) /3600000
                if(timeDiff < 24){
                console.log(json.title)
                console.log(json.submittedDate)
                }
            })
            
        }
    })

app.listen(port)
console.log(`The Magic Happens at ${port}`.rainbow)