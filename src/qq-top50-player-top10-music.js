const puppeteer = require('puppeteer-cn')
const { delDir } = require('../utils/tools')
const fs = require('fs')
const path = require('path')

;(async () => {
  console.time('time')
  delDir(path.join(__dirname, '../data/qq-rock-music/top50-player-top10-music/'))
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('https://y.qq.com/portal/singer_list.html#page=1&genre=2&')

  await page.waitFor(2000)
  let rockPlayers = await page.evaluate(() => {
    let allRockPlayers
    let part_with_avatar = [
      ...document.querySelectorAll('.js_avtar_list .singer_list__item .singer_list__title a')
    ]
    let part_only_txt = [...document.querySelectorAll('.singer_list_txt .singer_list_txt__item a')]
    allRockPlayers = part_with_avatar.concat(part_only_txt).splice(0, 50)

    return allRockPlayers.map(rockPlayer => {
      return {
        title: rockPlayer.title.trim().replace(/\//g, ''),
        href: rockPlayer.href
      }
    })
  })

  for (let i = 0; i < rockPlayers.length; i++) {
    await page.goto(rockPlayers[i].href)

    await page.waitFor(2000)
    let musicLists = await page.evaluate(() => {
      let musicArr = [
        ...document.querySelectorAll('.mod_part .songlist__list li .songlist__songname_txt a')
      ]
      return musicArr.map(music => {
        return {
          title: music.title.replace(/\//g, ''),
          href: music.href
        }
      })
    })
    // 文件流形式写入文件
    let writeStream
    try {
      writeStream = fs.createWriteStream(
        path.join(
          __dirname,
          `../data/qq-rock-music/top50-player-top10-music/${rockPlayers[i].title}.txt`
        )
      )
      writeStream.write(JSON.stringify(musicLists), 'UTF8')
      writeStream.end()
    } catch (e) {
      console.log(e)
    }
  }

  await page.close()
  await browser.close()
  console.timeEnd('time')
})()
