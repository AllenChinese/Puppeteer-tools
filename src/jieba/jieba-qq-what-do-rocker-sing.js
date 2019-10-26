const nodejieba = require('nodejieba')
const path = require('path')
const fs = require('fs')
const { deleteFile } = require('../../utils/tools')
const dataSourceDirPath = '../../data/qq-rock-music/top50-player-high-frequency-word/'
const dataProcessedPath = '../../data/processedData/'

// 乐队信息文件总数
var filesTotalCount = 0
// index
var i = 0
// 国家数组
var nationalArray = []

// 分词处理
function jiebaCutFunc(sentence) {
  i++
  cutResult = nodejieba.cut(sentence)
  let currentNational =
    cutResult.indexOf('国籍') !== -1 ? cutResult[Number(cutResult.indexOf('国籍')) + 2] : '中国'
  nationalArray.push(currentNational)
  if (i === filesTotalCount) {
    let processedData = processingNationalDistribution(nationalArray)
    writeFileToJsonData(processedData)
  }
}

/**
 * 处理分词后的数据，用于生成国家分布情况数组
 * @param {Array} nationalArray - 空数组用于存放国家分布情况
 */
function processingNationalDistribution(nationalArray) {
  // 国家分布情况数组（用于 Echarts）
  let nationalDistribution = []
  // 统计每个国家摇滚乐队占的数量
  let _nationalCountObj = nationalArray.reduce((prev, next) => {
    prev[next] = prev[next] + 1 || 1
    return prev
  }, {})
  // 生成符合 Echarts 饼图的数组
  Object.keys(_nationalCountObj).forEach(item => {
    nationalDistribution.push({
      name: item,
      value: _nationalCountObj[item]
    })
  })
  return nationalDistribution
}

/**
 * 国家分布情况数组写入文件
 * @param {Array} processedData - 国家分布情况数组
 */
function writeFileToJsonData(processedData) {
  deleteFile(path.join(__dirname, dataProcessedPath), 'playersNationalDistribution')
  console.log('新写入国家分布情况数据：\n', processedData)
  fs.writeFile(
    path.join(__dirname, dataProcessedPath, 'playersNationalDistribution.json'),
    JSON.stringify(processedData, null, '\t'),
    err => {
      if (err) {
        console.log(err)
      }
    }
  )
}

function readFileCallback(err, data) {
  if (err) {
    console.log(err)
  } else {
    jiebaCutFunc(data.replace(/\s+/g, ''))
  }
}

fs.readdir(path.join(__dirname, dataSourceDirPath), (err, files) => {
  if (err) {
    console.log(err)
  } else {
    filesTotalCount = files.length
    files.forEach(file => {
      filePath = path.join(__dirname, dataSourceDirPath, file)
      fs.readFile(filePath, 'utf-8', readFileCallback)
    })
  }
})
