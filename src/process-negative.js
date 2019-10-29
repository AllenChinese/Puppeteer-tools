const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
var Sentiment = require('sentiment')
const dataSourceDirPath = '../data/sentiment/negative.txt'

var filePath = path.join(__dirname, dataSourceDirPath)
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const negativeArray = data.split(/\n+/g)
    let resObj = {}
    negativeArray.forEach(item => {
      resObj[item] = -1
    })
    console.log(resObj)
    fs.writeFile(
      path.join(__dirname, '../data/sentiment/negative-processed.json'),
      JSON.stringify(resObj, null, '\t'),
      err => {
        if (err) {
          console.log(err)
        }
      }
    )
  }
})
