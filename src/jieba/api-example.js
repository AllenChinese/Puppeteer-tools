const nodejieba = require('nodejieba')
// nodejieba.cut(string, cut_all, HMM)
// cut 函数接收三个参数，分别是：
// string: 需要分词的字符串
// cut_all: 控制是否采用全模式，默认为 false（精确模式）
// HMM: 控制是否使用 HMM（隐形马尔科夫）模型
// const result = nodejieba.cut('我是一名北京清华大学的研究生', true, true)
// console.log(result)

var sentence = '我是扶拖拉机专业的。不用多久，我就会当上CEO，走上人生巅峰。'
var result

/**
 * 没有主动调用 nodejieba.load 载入词典的时候
 * 会在第一次调用 cut 或者其他需要词典的函数时，自动载入默认词典。
 * 词典只会被加载一次。
 **/
result = nodejieba.cut(sentence)
console.log('cut 默认：')
console.log('===================')
console.log(result)
console.log('===================')

result = nodejieba.cut(sentence, true)
console.log('cut 全模式：')
console.log('===================')
console.log(result)
console.log('===================')

result = nodejieba.cutHMM(sentence)
console.log('cutHMM 使用隐形马尔科夫模型：')
console.log('===================')
console.log(result)
console.log('===================')

result = nodejieba.cutAll(sentence)
console.log('cutAll 全模式：')
console.log('===================')
console.log(result)
console.log('===================')

// 适合用于搜索引擎构建倒排索引的分词，粒度比较细
result = nodejieba.cutForSearch(sentence)
console.log('cutForSearch：')
console.log('===================')
console.log(result)
console.log('===================')

// 关键字提取
result = nodejieba.tag(sentence)
console.log('关键字提取：')
console.log('===================')
console.log(result)
console.log(nodejieba.extractWithWords(nodejieba.tagWordsToStr(result), 5))
console.log(nodejieba.extract(sentence, 5))
console.log(nodejieba.textRankExtractWithWords(nodejieba.tagWordsToStr(result), 5))
console.log(nodejieba.textRankExtract(sentence, 5))
var topN = 5
result = nodejieba.extract(sentence, topN)
console.log(result)
console.log('===================')

// 默认字典添加自定义单词
result = nodejieba.cut('男默女泪')
console.log('默认字典添加自定义单词：')
console.log('===================')
console.log(result)
nodejieba.insertWord('男默女泪')
result = nodejieba.cut('男默女泪')
console.log(result)
console.log('===================')

// 分词最小字符长度
result = nodejieba.cutSmall('南京市长江大桥', 3)
console.log('分词最小字符长度：')
console.log('===================')
console.log(result)
console.log('===================')
