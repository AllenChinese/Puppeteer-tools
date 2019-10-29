var myChart = echarts.init(document.getElementById('cityMap'))
var colors = [
  [
    '#1DE9B6',
    '#F46E36',
    '#04B9FF',
    '#5DBD32',
    '#FFC809',
    '#FB95D5',
    '#BDA29A',
    '#6E7074',
    '#546570',
    '#C4CCD3'
  ],
  [
    '#37A2DA',
    '#67E0E3',
    '#32C5E9',
    '#9FE6B8',
    '#FFDB5C',
    '#FF9F7F',
    '#FB7293',
    '#E062AE',
    '#E690D1',
    '#E7BCF3',
    '#9D96F5',
    '#8378EA',
    '#8378EA'
  ],
  [
    '#DD6B66',
    '#759AA0',
    '#E69D87',
    '#8DC1A9',
    '#EA7E53',
    '#EEDD78',
    '#73A373',
    '#73B9BC',
    '#7289AB',
    '#91CA8C',
    '#F49F42'
  ]
]
var colorIndex = 0
$(function() {
  var geoCoordMap = {
    杭州: [120.19, 30.26],
    沈阳: [123.38, 41.8],
    台北: [121.31, 25.03],
    常德: [111.69, 29.05],
    拉萨: [91.11, 29.97],
    北京: [116.46, 39.92]
  }

  var cityCount = { 沈阳: 1, 北京: 43, 常德: 5, 台北: 4, 拉萨: 6 }

  var year = ['4月']
  var mapData = [[], [], []]

  /*柱子Y名称*/
  var categoryData = []
  var barData = []
  for (var key in geoCoordMap) {
    categoryData.push(key)
    mapData[0].push({
      year: 4,
      name: key,
      value: cityCount[key]
    })
  }
  for (var i = 0; i < mapData.length; i++) {
    barData.push([])
    for (var j = 0; j < mapData[i].length; j++) {
      barData[i].push(mapData[i][j].value)
    }
  }
  $.ajax({
    url: '../data-1517645039291-B1vgpymUz.json',
    async: false,
    success: function(geoJson) {
      echarts.registerMap('china', geoJson)
      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }

      optionXyMap01 = {
        timeline: {
          show: false,
          data: year,
          axisType: 'category',
          autoPlay: true,
          playInterval: 3000,
          left: '10%',
          right: '10%',
          bottom: '3%',
          width: '80%',
          label: {
            normal: {
              textStyle: {
                color: '#ddd'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          symbol: 'none',
          lineStyle: {
            color: '#555'
          },
          checkpointStyle: {
            borderColor: '#777',
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            normal: {
              color: '#666',
              borderColor: '#666'
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa'
            }
          }
        },
        baseOption: {
          animation: true,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          grid: {
            right: '5%',
            top: '20%',
            bottom: '10%',
            width: '30%'
          },
          tooltip: {
            trigger: 'axis', // hover触发器
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: 'rgba(150,150,150,0.1)' //hover颜色
              }
            }
          },
          geo: {
            show: true,
            map: 'china',
            roam: true,
            zoom: 1,
            center: [116.46, 39.92],
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#323c48'
              }
            }
          }
        },
        options: []
      }
      for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
          backgroundColor: '#142037',
          title: [
            {
              id: 'statistic',
              text: '摇滚歌手最爱城市',
              left: '64%',
              top: '11%',
              textStyle: {
                color: '#fff',
                fontSize: 30
              }
            }
          ],
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            min: 0,
            max: 50,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            }
          },
          yAxis: {
            type: 'category',
            //  name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#ddd'
              }
            },
            data: categoryData
          },
          series: [
            {
              //文字和标志
              name: 'light',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(mapData[n]),
              symbolSize: function(val) {
                return val[2] / 10
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              }
            },
            {
              type: 'map',
              map: 'china',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#FFFFFF'
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: mapData
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(
                mapData[n]
                  .sort(function(a, b) {
                    return b.value - a.value
                  })
                  .slice(0, 20)
              ),
              symbolSize: function(val) {
                return val[2] * 5 > 50 ? 50 : val[2] * 5
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  shadowBlur: 10,
                  shadowColor: colors[colorIndex][n]
                }
              },
              zlevel: 1
            },
            {
              zlevel: 2,
              type: 'bar',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              },
              data: barData[n]
            }
          ]
        })
      }
      myChart.setOption(optionXyMap01)
    }
  })
})
