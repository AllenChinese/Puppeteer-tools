const fs = require('fs')

class Tools {
  static timeout(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1)
        } catch (e) {
          reject(0)
        }
      }, delay)
    })
  }

  /**
   * [TimeTools description]
   * @param {[type]} timestamp
   * @param {[type]} formatStr Y年M月D日
   *
   * M: month 1~12
   * Y: year 2017
   * D: date 0 ~ 31
   */
  static moment(formatStr, timestamp) {
    let date = new Date(timestamp || new Date().getTime())
    let M = date.getMonth() + 1
    let Y = date.getFullYear()
    let D = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    return formatStr
      .replace('M', M)
      .replace('Y', Y)
      .replace('D', D)
      .replace('h', h)
      .replace('m', m)
      .replace('s', s)
  }

  static delDir(path) {
    let files = []
    // 判断是否存在该路径文件夹
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach((file, index) => {
        let currentPath = path + '/' + file
        // 当前文件夹是否有子文件
        if (fs.statSync(currentPath).isDirectory()) {
          delDir(currentPath) // 递归删除文件夹
        } else {
          fs.unlinkSync(currentPath) // 删除文件夹
        }
      })
    }
  }
}

module.exports = Tools
