const puppeteer = require('puppeteer-cn')
/**
 * 网页截图
 */
;(async () => {
  console.time('time')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://www.baidu.com')
  await page.screenshot({ path: '../screenshot/baidu.png' })
  await browser.close()
  console.timeEnd('time')
})()
