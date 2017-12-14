const express = require('express'),
    readline = require('readline'),
    comments = require('./getComments'),
    app = express(),
    colors = require('colors'),
    port = 8081

    app.listen(port)
    console.log(`The Magic Happens at ${port}`.rainbow)
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('What Reddit URL would you like to scrape for recent comments today? ', (answer) => {
 
      comments.getThemComments(answer)
   
    
      rl.close();
    });


