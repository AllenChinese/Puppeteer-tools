const puppeteer = require('puppeteer-cn')
const { timeout, delDir } = require('../utils/tools')

;(async () => {
  delDir('../data/es6-pdf')
  console.time('time')
  const browser = await puppeteer.launch()
  let page = await browser.newPage()

  await page.goto('http://es6.ruanyifeng.com/#README')
  await timeout(3000)

  let catalogTags = await page.evaluate(() => {
    let allCatalog = [...document.querySelectorAll('#sidebar ol li a')]
    return allCatalog.map(catalog => {
      return {
        href: catalog.href.trim(),
        name: catalog.text
      }
    })
  })

  for (let i = 0; i < catalogTags.length; i++) {
    page = await browser.newPage()
    console.log('name: ', catalogTags[i])
    await page.goto(catalogTags[i].href)
    await timeout(3000)
    await page.pdf({
      path: `../data/es6-pdf/${catalogTags[i].name}.pdf`
    })
    await page.close()
  }

  console.timeEnd('time')
  browser.close()
})()
