var playerNationalDistribution = null
$.ajax({
  url: '../data/processedData/playersNationalDistribution.json',
  async: false,
  success: function(data) {
    if (data) playerNationalDistribution = data
  }
})

var myChart = echarts.init(document.getElementById('playerNationalDistribution'))

myChart.setOption({
  title: {
    text: '乐队国家或者地区分布情况',
    subtext: '数据来自QQ音乐',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: playerNationalDistribution,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
