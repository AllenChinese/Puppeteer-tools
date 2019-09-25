const puppeteer = require('puppeteer-cn')
/**
 * 生成网页 pdf
 */
;(async () => {
  console.time('time')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com', { waitUntil: 'networkidle2' })
  await page.pdf({ path: '../pdf/baidu.pdf', format: 'A4' })
  await browser.close()
  console.timeEnd('time')
})()
