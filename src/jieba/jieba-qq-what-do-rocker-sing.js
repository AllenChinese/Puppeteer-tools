const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
const { deleteFile } = require('../../utils/tools')
const dataSourceDirPath = '../../data/qq-rock-music/top50-player-lyrics/'
const dataProcessedPath = '../../data/processedData/top50-player-high-frequency-word/'

/** 分词处理 */
function jiebaCutFunc(file, sentence) {
  // 形容词 情感
  // cutResult = nodejieba.textRankExtract(sentence, 10, 'a')
  // 全部
  cutResult = nodejieba.textRankExtract(sentence, 10)
  writeFileToJsonData(file, cutResult)
}

/**
 * @param {String} file - 文件名
 * @param {Array} processedData - 高频词
 */
function writeFileToJsonData(file, processedData) {
  deleteFile(path.join(__dirname, dataProcessedPath), file)
  console.log(file, processedData)
  fs.writeFile(
    path.join(__dirname, dataProcessedPath, file),
    JSON.stringify(processedData, null, '\t'),
    err => {
      if (err) {
        console.log(err)
      }
    }
  )
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
          jiebaCutFunc(file.split('.txt')[0] + '.json', data.replace(/\s+/g, ''))
        }
      })
    })
  }
})
