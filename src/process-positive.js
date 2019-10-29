const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
var Sentiment = require('sentiment')
const dataSourceDirPath = '../data/sentiment/positive.txt'

var filePath = path.join(__dirname, dataSourceDirPath)
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const positiveArray = data.split(/\n+/g)
    let resObj = {}
    positiveArray.forEach(item => {
      resObj[item] = 1
    })
    console.log(resObj)
    fs.writeFile(
      path.join(__dirname, '../data/sentiment/positive-processed.json'),
      JSON.stringify(resObj, null, '\t'),
      err => {
        if (err) {
          console.log(err)
        }
      }
    )
  }
})
