const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
const city = require('../../utils/city').city
const dataSourceDirPath = '../../data/qq-rock-music/top50-player-lyrics/'
let cityOnTheList = {}
/** 分词处理 */
function jiebaCutFunc(file, sentence) {
  cutResult = nodejieba.cut(sentence, true)
  cutResult.forEach(item => {
    if (city.indexOf(item) !== -1) {
      cityOnTheList[item] = cityOnTheList[item] ? cityOnTheList[item] + 1 : 1
    }
  })
  console.log(cityOnTheList)
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
