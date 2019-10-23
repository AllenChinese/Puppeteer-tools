const fs = require('fs')
const puppeteer = require('puppeteer-cn')
const { timeout, delDir } = require('../utils/tools')

;(async () => {
  console.time('time')
  delDir('../data/song-list')
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto(
    'https://music.163.com/#/discover/playlist/?order=hot&cat=%E6%91%87%E6%BB%9A&limit=35&offset=35'
  )

  await page.waitFor(2000)
  // 获取的内容来自 iframe name = contentFrame
  let iframe = await page.frames().find(f => f.name() === 'contentFrame')
  console.log('iframe', iframe)

  let songLists = await iframe.evaluate(() => {
    let allSong = [...document.querySelectorAll('#m-pl-container li a.msk')]
    return allSong.map(song => {
      return {
        // 保证 title 不带'/'
        title: song.title.trim().replace(/\//g, ''),
        href: song.href
      }
    })
  })

  console.log(songLists)
  for (let i = 0; i < songLists.length; i++) {
    // 写入文件
    let writerStream
    try {
      writerStream = fs.createWriteStream(`../data/song-list/${songLists[i].title}.txt`)
      setInterval(() => {
        writerStream.write(songLists[i].href, 'UTF8')
        writerStream.end()
      }, 1000)
    } catch (e) {
      console.log(e)
    }
  }

  await page.close()
  await browser.close()
  console.timeEnd('time')
})()
