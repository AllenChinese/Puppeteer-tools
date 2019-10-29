let demo2 = echarts.init(document.getElementById('demo2'))
// 绘制图表
demo2.setOption({
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: 'nodeA', // First tree
          value: 10,
          children: [
            {
              name: 'nodeAa', // First leaf of first tree
              value: 4
            },
            {
              name: 'nodeAb', // Second leaf of first tree
              value: 6
            }
          ]
        },
        {
          name: 'nodeB', // Second tree
          value: 20,
          children: [
            {
              name: 'nodeBa', // Son of first tree
              value: 20,
              children: [
                {
                  name: 'nodeBa1', // Granson of first tree
                  value: 20
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
