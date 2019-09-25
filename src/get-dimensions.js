const puppeteer = require('puppeteer-cn')
/**
 * 获取页面属性
 */
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://baidu.com')

  const dismensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })

  console.log('Dismensions: ', dismensions)
  await browser.close()
})()
