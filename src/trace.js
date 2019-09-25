const puppeteer = require('puppeteer-cn')
/**
 * 网页性能分析
 * API：page.tracing.start
 * API：page.tracing.stop
 */
;(async () => {
  console.time('time')
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  await page.tracing.start({
    path: '../data/trace/trace.json'
  })
  await page.goto('https://zjiawei.cn/')
  await page.tracing.stop()
  await browser.close()
  console.timeEnd('time')
})()
