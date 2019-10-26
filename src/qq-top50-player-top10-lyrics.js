const puppeteer = require('puppeteer-cn')
const path = require('path')
const fs = require('fs')
const { deleteFile } = require('../utils/tools')
const playerName = process.argv.splice(2)
const dataSourceDirPath = `../data/qq-rock-music/top50-player-top10-music/${playerName}`

;(async () => {
  deleteFile(dataSourceDirPath)
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()

  async function getSinglePlayerTop10Lyrics(file, data) {
    let _data = JSON.parse(data)
    let resLyrics = ''
    for (let i = 0; i < _data.length; i++) {
      await page.goto(_data[i].href)
      await page.waitFor(2000)
      resLyrics += await page.evaluate(() => {
        return document.getElementById('copy_content')
          ? document.getElementById('copy_content').textContent.replace(/\s+/g, '')
          : ''
      })
    }
    writeFileWithLyrics(file, resLyrics)
  }

  function writeFileWithLyrics(file, resLyrics) {
    // 文件流形式写入文件
    let writeStream
    try {
      writeStream = fs.createWriteStream(
        path.join(__dirname, `../data/qq-rock-music/top50-player-lyrics/${file}`)
      )
      writeStream.write(resLyrics, 'UTF8')
      writeStream.end()
      page.close()
      browser.close()
    } catch (e) {
      console.log(e)
    }
  }

  let filePath = path.join(__dirname, dataSourceDirPath)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      getSinglePlayerTop10Lyrics(playerName, data)
    }
  })
})()
