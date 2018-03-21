var data = require('./data.json')
var fs = require('fs')

data.map((result) => {
  if (result.results[0]) {
    console.log(result.results[0].geometry.location)
  } else {
    console.log(result)
  }
})