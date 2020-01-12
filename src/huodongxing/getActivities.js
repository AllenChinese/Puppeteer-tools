const puppeteer = require('puppeteer-cn')
const { deleteFile } = require('../../utils/tools')
const fs = require('fs')
const path = require('path')

;(async () => {
  console.time('time')
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto('https://www.huodongxing.com/events')

  await page.waitFor(2000)
  let huodongs = await page.evaluate(() => {
    let allhuodongs = [
      ...document.querySelectorAll(
        '.type-activit-wrap .search-tab-content-list-check .search-tab-content-item-mesh a'
      ),
    ]

    return allhuodongs.map((item) => {
      return {
        href: item.href,
        image: item.querySelector('.item-logo').src,
        title: item.querySelector('.item-logo').alt,
        date: item.querySelector('.item-mesh-conter .date-pp').textContent,
      }
    })
  })

  let emptyArr = []
  for (let i = 0; i < huodongs.length; i++) {
    emptyArr.push(huodongs[i])
  }

  // 文件流形式写入文件
  let writeStream
  try {
    writeStream = fs.createWriteStream(path.join(__dirname, `../../data/huodongxing/huodong.json`))
    writeStream.write(JSON.stringify(emptyArr), 'UTF8')
    writeStream.end()
  } catch (e) {
    console.log(e)
  }

  await page.close()
  await browser.close()
  console.timeEnd('time')
})()
