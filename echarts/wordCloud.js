let wordCloud = echarts.init(document.getElementById('wordCloud'))

wordCloud.setOption({
  tooltip: {},
  series: [
    {
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      //  rotationRange: [0, 90],
      shape: 'star',
      //width: 600,
      //height: 400,
      textStyle: {
        normal: {
          color: function() {
            return (
              'rgb(' +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') +
              ')'
            )
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [
        { name: '体会', value: 100 },
        { name: '生活', value: 38.762565482185575 },
        { name: '无法', value: 0.8515621162520666 },
        { name: '看到', value: 0.7524036270793364 },
        { name: '低头', value: 0.7428825390985941 },
        { name: '大海', value: 0.7024159237719356 },
        { name: '找到', value: 0.6967834374741464 },
        { name: '时光', value: 0.6916687434452948 },
        { name: '想起', value: 0.6313060797016474 },
        { name: '梦想', value: 0.5724884688210219 }
      ]
    }
  ]
})
