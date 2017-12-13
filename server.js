const express = require('express'),
fs  = require('fs'),
request = require('request'),
cherrio = require('cheerio'),
app = express(),
colors = require('colors')
port = 8081




app.get('scrape', function (req, res){

})

app.listen(port)
console.log(`The Magic Happens at ${port}`.rainbow)