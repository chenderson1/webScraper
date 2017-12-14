const
  readline = require('readline'),
  comments = require('./getComments'),
  colors = require('colors'),
  port = 8081


//prompt the user for url and pass url to get comments function 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What Reddit URL would you like to scrape for recent comments today? ', (answer) => {

  comments.getThemComments(answer)


  rl.close();
});


