const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
const Sentiment = require('sentiment')
const cnLabels = require('../../data/sentiment/labels.json')
const dataSourceDirPath = '../../data/qq-rock-music/top50-player-lyrics/'

var sentiment = new Sentiment()
var cnLanguage = {
  labels: cnLabels
}

sentiment.registerLanguage('cn', cnLanguage)

/** 分词处理 */
function sentimentAnalysisFunc(file, sentence) {
  let countScore = 0
  console.log('=============')
  console.log(file)
  let cutResult = nodejieba.cutAll(sentence)
  cutResult.forEach(item => {
    var analyzeResult = sentiment.analyze(item, { language: 'cn' })
    // console.log(analyzeResult.score, analyzeResult.words)
    countScore += analyzeResult.score
  })
  console.log(countScore)
  console.log('=============')
}

fs.readdir(path.join(__dirname, dataSourceDirPath), (err, files) => {
  if (err) {
    console.log(err)
  } else {
    filesTotalCount = files.length
    files.forEach(file => {
      filePath = path.join(__dirname, dataSourceDirPath, file)
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
        } else {
          sentimentAnalysisFunc(file.split('.txt')[0] + '.json', data.replace(/\s+/g, ''))
        }
      })
    })
  }
})
