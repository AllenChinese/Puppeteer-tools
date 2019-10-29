const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
const dataSourceDirPath = '../../data/qq-rock-music/top50-player-lyrics/'

let springCount = 0
let summerCount = 0
let fallCount = 0
let winterCount = 0
/** 分词处理 */
function jiebaCutFunc(file, sentence) {
  cutResult = nodejieba.cut(sentence, true)

  cutResult.forEach(item => {
    switch (item) {
      case '春天':
        springCount++
        break
      case '夏天':
        summerCount++
        break
      case '秋天':
        fallCount++
        break
      case '冬天':
        winterCount++
        break
    }
  })

  console.log('=====================')
  console.log('春天', springCount)
  console.log('夏天', summerCount)
  console.log('秋天', fallCount)
  console.log('冬天', winterCount)
  console.log('=====================')
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
